let doneBooksCount,
  pagesRead,
  totalBooks = 0;
let libraryArr = returnLibraryFromLS();
let book = "";
let main = document.querySelector("main");

function Book(title, author, cover, pagesRead, totalPages, index) {
  this.title = title;
  this.author = author;
  this.cover = cover;
  this.pagesRead = pagesRead;
  this.totalPages = totalPages;
  this.index = index;
}

function createBook(card) {
  let title = card[0].value;
  let author = card[1].value;
  let cover = card[2].value;
  let pagesRead = card[3].value;
  let totalPages = card[4].value;
  return new Book(title, author, cover, pagesRead, totalPages, newHighestIndex());
}

// returns true or false, and prevents submission + displays error
function invalidPagesRead(book, form) {
  let errorDiv = form.querySelector("#error");

  if (Number(book.pagesRead) > Number(book.totalPages)) {
    errorDiv.classList.remove("hidden");
    return true;
  } else {
    errorDiv.classList.add("hidden");
    return false;
  }
}

function newHighestIndex() {
  if (typeof localStorage.index === "string") {
    highestIndex = Number(JSON.parse(localStorage.index));
    strHighestIndex = JSON.stringify(++highestIndex);
    localStorage.setItem("index", strHighestIndex);
  } else {
    localStorage.setItem("index", "0");
    return Number(localStorage.index);
  }

  return Number(highestIndex);
}

function returnLibraryFromLS() {
  if (typeof localStorage.books === "string") {
    return JSON.parse(localStorage.books);
  } else {
    return [];
  }
}

function updateLibraryLS(libraryArr, book = null) {
  if (book !== null) {
    libraryArr.push(book);
  }

  let libraryStr = JSON.stringify(libraryArr);
  localStorage.setItem("books", libraryStr);
}

// can append a single book (e.g when clicking done) or whole array (e.g when DOM is cleared on refresh)
function displayBooks(libraryArr) {
  libraryArr.forEach(function (book) {
    let bookCard = document.querySelector("main").children[1].cloneNode(true);
    bookCard.id = book.index;
    bookCard.classList.remove("hidden");
    populateBookCard(book, bookCard);
    main.appendChild(bookCard);
  });
}

function toggleCardLock(card) {
  [...card.elements].forEach(function (field) {
    if (field.classList.contains("im-disabled")) {
      field.toggleAttribute("disabled");
    }
    if (field.classList.contains("toggle-hidden")) {
      field.classList.toggle("hidden");
    }
  });
}

function populateBookCard(book, card) {
  card[0].value = book.title;
  card[1].value = book.author;
  card[2].value = book.cover;
  card[3].value = book.pagesRead;
  card[4].value = book.totalPages;
  card.style.backgroundImage = `url(${book.cover})`;
}

document.addEventListener("submit", function (e) {
  switch (e.submitter.id) {
    case "done":
      e.preventDefault();
      book = createBook(e.target);
      if (invalidPagesRead(book, e.target)) return; // restarts eventlisten loop if invalidpagesread
      updateLibraryLS(libraryArr, book);
      e.target.reset();
      displayBooks([book]);
      calculateBookStats();
      displayLsBookStats();
      break;
    case "edit":
      e.preventDefault();
      toggleCardLock(e.target);
      break;
    case "delete":
      removeBookFromLibArr(e);
      updateLibraryLS(libraryArr);
      main.removeChild(e.target);
      calculateBookStats();
      displayLsBookStats();
      break;
    case "commit-edit":
      e.preventDefault();
      let updatedBook = createBook(e.target);
      if (invalidPagesRead(updatedBook, e.target)) return;
      removeBookFromLibArr(e);
      toggleCardLock(e.target);
      updateLibraryLS(libraryArr, updatedBook);
      main.removeChild(e.target);
      displayBooks([updatedBook]);
      calculateBookStats();
      displayLsBookStats();
      break;
  }
});

function removeBookFromLibArr(e) {
  for (let i = libraryArr.length - 1; i > -1; i--) {
    if (Number(libraryArr[i].index) === Number(e.target.id)) {
      libraryArr.splice(i, 1);
    }
  }
}

function calculateBookStats() {
  doneBooksCount = 0;
  pagesRead = 0;
  totalBooks = 0;

  libraryArr.forEach(function (e) {
    if (Number(e.pagesRead) === Number(e.totalPages)) {
      doneBooksCount++;
    }
  });

  pagesRead = libraryArr.reduce((sum, book) => sum + Number(book.pagesRead), 0);
  totalBooks = libraryArr.length;
}

function displayLsBookStats() {
  totalBooksDom = document.querySelector("#totalBooks");
  doneBooksDom = document.querySelector("#doneBooks");
  pagesReadDom = document.querySelector("#pagesRead");

  totalBooksDom.innerHTML = totalBooks;
  pagesReadDom.innerHTML = pagesRead;
  doneBooksDom.innerHTML = doneBooksCount;
}

displayBooks(libraryArr);
calculateBookStats();
displayLsBookStats();
