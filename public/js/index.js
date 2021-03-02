let libraryArr = returnLibraryFromLS();

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

function returnLibraryFromLS() {
  if (typeof localStorage.books === 'string') {
    return JSON.parse(localStorage.books);
  } else {
    return [];
  };
};

function addBookToLibrary(book, libraryArr) {
  libraryArr.push(book);
  let libraryStr = JSON.stringify(libraryArr);
  localStorage.setItem('books', libraryStr);
};

function displayBooks(libraryArr) {
  libraryArr.forEach(function(book) {
    // create bookcard with background image
    let bookCard = document.querySelector("#form").cloneNode(true);
    bookCard.style.backgroundImage = `url(${book.cover})`;

    // populate bookcard fields
    bookCard[0].value = book.title
    bookCard[1].value = book.author
    bookCard[2].value = book.cover
    bookCard[3].value = book.pagesRead
    bookCard[4].value = book.totalPages

    // change bookcard from edit mode to display mode
    bookCard[0].disabled = "disabled";
    bookCard[1].disabled = "disabled";
    bookCard[2].style.display ='none';
    bookCard[3].disabled = "disabled";
    bookCard[4].disabled = "disabled";
    

    // append bookcard to main
    let main = document.querySelector('main');
    main.appendChild(bookCard);
  });

  // inserts book object as element
}

form.addEventListener("submit", function (event) {
  let book = createBook();

  if (invalidPagesRead(book, event)) return;  // restarts eventlisten loop if invalidpagesread

  addBookToLibrary(book, libraryArr);
});

displayBooks(libraryArr);