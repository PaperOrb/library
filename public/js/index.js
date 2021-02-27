let booksArray = [];
let form = document.querySelector("#form");
// let authorInput = document.querySelector('#author')
// let titleInput = document.querySelector('#title')

function Book() {
  // creates book object
}

function addBookToLibrary() {
  // popup message of !pagesReadIsValid
  pagesReadIsValid();
  // calls Book(input fields) when done is clicked
  //
}

function pagesReadIsValid() {
  form.addEventListener("submit", function (e) {
    let pagesRead = document.querySelector('#pages-read');
    let totalPages = document.querySelector("#total-pages");
    let errorDiv = document.querySelector('#error')

    if (pagesRead.value > totalPages.value) {
      errorDiv.classList.remove('hidden')
      e.preventDefault();
    } else {
      errorDiv.classList.add('hidden')
    };
  });
}

function setCoverImage() {
  // downloads image
  // adds image to book object
}

function displayBooks() {
  // iterates books arr
  // inserts book object as element
}

addBookToLibrary();