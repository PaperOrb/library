// let authorInput = document.querySelector('#author')
// let titleInput = document.querySelector('#title')

function Book(title, author, cover, pagesRead, totalPages) {
  this.title = title;
  this.author = author;
  this.cover = cover;
  this.pagesRead = pagesRead;
  this.totalPages = totalPages;
};

function addBookToLibrary() {
  form.addEventListener("submit", function (event) {
    let form = document.querySelector("#form");
    let title = form[0].value;
    let author = form[1].value;
    let cover = form[2].value;
    let pagesRead = document.querySelector('#pages-read').value;
    let totalPages = document.querySelector("#total-pages").value;
    let errorDiv = document.querySelector('#error');
    let book = new Book(title, author, cover, pagesRead, pagesRead, totalPages);

    if (Number(pagesRead) > Number(totalPages)) {
      errorDiv.classList.remove('hidden');
      event.preventDefault();
    } else {
      errorDiv.classList.add('hidden');
    };

    let booksArray = []
    let strBooksArray = ''

    if (typeof localStorage.books === 'string') {booksArray = JSON.parse(localStorage.books)};

    booksArray.push(book);
    strBooksArray = JSON.stringify(booksArray);
    localStorage.setItem('books', strBooksArray);
  });
};

function setCoverImage() {
  // downloads image
  // adds image to book object
}

function displayBooks() {
  // iterates books arr
  // inserts book object as element
}

addBookToLibrary();