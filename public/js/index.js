let libraryArr = returnLibraryFromLS();
let firstBookCard = document.querySelector("main").firstElementChild

function Book(title, author, cover, pagesRead, totalPages) {
  this.title = title;
  this.author = author;
  this.cover = cover;
  this.pagesRead = pagesRead;
  this.totalPages = totalPages;
}

function createBook() {
  let title = firstBookCard[0].value;
  let author = firstBookCard[1].value;
  let cover = firstBookCard[2].value;
  let pagesRead = firstBookCard[3].value;
  let totalPages = firstBookCard[4].value;
  return new Book(title, author, cover, pagesRead, totalPages);
}

// returns true or false, and prevents submission + displays error
function invalidPagesRead(book) {
  let errorDiv = document.querySelector("#error");

  if (Number(book.pagesRead) > Number(book.totalPages)) {
    errorDiv.classList.remove("hidden");
    return true;
  } else {
    errorDiv.classList.add("hidden");
    return false;
  }
}

function returnLibraryFromLS() {
  if (typeof localStorage.books === "string") {
    return JSON.parse(localStorage.books);
  } else {
    return [];
  }
}

function addBookToLibrary(book, libraryArr) {
  libraryArr.push(book);
  let libraryStr = JSON.stringify(libraryArr);
  localStorage.setItem("books", libraryStr);
}

function displayBooks(libraryArr) {
  libraryArr.forEach(function (book) {
   // populate bookcard
    let bookCard = document.querySelector("main").children[1].cloneNode(true);
    bookCard.classList.remove("hidden");
    populateBookCard(book, bookCard);

    // append bookcard to main
    let main = document.querySelector("main");
    main.appendChild(bookCard);
  });
}

function toggleCardLock(card) {
  [...card.elements].forEach(function (field) {
    if (field.classList.contains("im-disabled")) {
      field.toggleAttribute("disabled");
    } else if (field.classList.contains("toggle-hidden")) {
      field.classList.toggle("hidden");
    };
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
  if (e.submitter.id === "done") {
    e.preventDefault();
    let book = createBook();
    if (invalidPagesRead(book, e)) return; // restarts eventlisten loop if invalidpagesread
    addBookToLibrary(book, libraryArr);
    e.target.reset();
    displayBooks([book]);
  } else if (e.submitter.id === "edit") {
    e.preventDefault();
    // enabled editing mode
  } else if (e.submitter.id === "commit-edit") {
    alert(`${e.target.id}`);
    if (invalidPagesRead(book, e)) return; // restarts eventlisten loop if invalidpagesread
    // pop book from array into a variable
    // addBookToLibrary()
    // toggleCardLock
  }
});

displayBooks(libraryArr);