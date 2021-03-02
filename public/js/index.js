let libraryArr = returnLibraryFromLS();

function Book(title, author, cover, pagesRead, totalPages) {
  this.title = title;
  this.author = author;
  this.cover = cover;
  this.pagesRead = pagesRead;
  this.totalPages = totalPages;
}

function createBook() {
  let form = document.querySelector("#form");
  let title = form[0].value;
  let author = form[1].value;
  let cover = form[2].value;
  let pagesRead = document.querySelector("#pages-read").value;
  let totalPages = document.querySelector("#total-pages").value;
  return new Book(title, author, cover, pagesRead, totalPages);
}

// returns true or false, and prevents submission + displays error
function invalidPagesRead(book, event) {
  let errorDiv = document.querySelector("#error");

  if (Number(book.pagesRead) > Number(book.totalPages)) {
    errorDiv.classList.remove("hidden");
    event.preventDefault();
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
  libraryArr.forEach(function (book, index) {
    // create bookcard with background image
    let bookCard = document.querySelector("#form").cloneNode(true);
    populateBookCard(book, bookCard);
    if(index === 0) { unlockBookCard(bookCard); } // keep first card editable every time
    // ^ why you no worky
    // append bookcard to main
    let main = document.querySelector("main");
    main.appendChild(bookCard);
  });
}

function unlockBookCard(card) {
  card.elements.forEach(function (field) {
    if (field.classList.contains("im-disabled")) {
      field.toggleAttribute("disabled");
    }
    if (field.classList.contains("im-hidden")) {
      field.classList.toggle("hidden");
    }
    if (field.classList.contains("edit")) {
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

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("done")) {
    let book = createBook();
    if (invalidPagesRead(book, e)) return; // restarts eventlisten loop if invalidpagesread
    addBookToLibrary(book, libraryArr);
  } else if (e.target.id === "edit") {
    alert(`${e.target.id}`);
    // toggleEditMode(e.target);
    // set id to editing
  } else if (e.target.id === "commit-edit") {
    // pop book from array into a variable
    // addBookToLibrary()
  }
});

displayBooks(libraryArr);