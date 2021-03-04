let libraryArr = returnLibraryFromLS();
let book = '';
let libraryIndex = 0;
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
  let index = libraryIndex++;
  return new Book(title, author, cover, pagesRead, totalPages, index);
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
  };

  let libraryStr = JSON.stringify(libraryArr);
  localStorage.setItem("books", libraryStr);
}

// can append a single book (e.g when clicking done) or whole array (e.g when DOM is cleared on refresh)
function displayBooks(libraryArr) {
  libraryArr.forEach(function (book) {
   // populate bookcard
    let bookCard = document.querySelector("main").children[1].cloneNode(true);
    bookCard.id = book.index
    bookCard.classList.remove("hidden");
    populateBookCard(book, bookCard);

    // append bookcard to main
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
    book = createBook(e.target);
    if (invalidPagesRead(book, e.target)) return; // restarts eventlisten loop if invalidpagesread
    updateLibraryLS(libraryArr, book);
    e.target.reset();
    displayBooks([book]);
  } else if (e.submitter.id === "edit") {
    e.preventDefault();
    toggleCardLock(e.target)
  } else if (e.submitter.id === "commit-edit") {
    e.preventDefault();

    for(let i = libraryArr.length - 1; i > -1; i--) {
      if(libraryArr[i].index === Number(e.target.id)) { 
        libraryArr.splice(libraryArr[i].index, 1)
      };
    };

    let updatedBook = createBook(e.target);

    if (invalidPagesRead(updatedBook, e.target)) {
      libraryArr = returnLibraryFromLS(); // undoes changes if invalidpages
      return;
    }
    toggleCardLock(e.target)
    updateLibraryLS(libraryArr, updatedBook);
    main.removeChild(e.target)
    displayBooks([updatedBook]);
  }
});

displayBooks(libraryArr);