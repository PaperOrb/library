let booksArray = []
let strBooksArray = ''

function Book(title, author, cover, pagesRead, totalPages) {
  this.title = title;
  this.author = author;
  this.cover = cover;
  this.pagesRead = pagesRead;
  this.totalPages = totalPages;
};

function createBook() {
  let form = document.querySelector("#form");
  let title = form[0].value;
  let author = form[1].value;
  let cover = form[2].value;
  let pagesRead = document.querySelector('#pages-read').value;
  let totalPages = document.querySelector("#total-pages").value;
  return new Book(title, author, cover, pagesRead, totalPages);
};

// returns true or false, and prevents submission + displays error
function invalidPagesRead(book, event) {
  let errorDiv = document.querySelector('#error');

  if (Number(book.pagesRead) > Number(book.totalPages)) {
    errorDiv.classList.remove('hidden');
    event.preventDefault();
    return true;
  } else {
    errorDiv.classList.add('hidden');
    return false;
  };
};

form.addEventListener("submit", function (event) {
  let book = createBook();

  if (invalidPagesRead(book, event)) return; // restarts eventlisten loop if invalidpagesread
  if (typeof localStorage.books === 'string') {booksArray = JSON.parse(localStorage.books)}; // loads books from localstorage

  booksArray.push(book);
  strBooksArray = JSON.stringify(booksArray);
  localStorage.setItem('books', strBooksArray);
});


function setCoverImage() {
  // downloads image
  // adds image to book object
}

function displayBooks() {
  // iterates books arr
  // inserts book object as element
}