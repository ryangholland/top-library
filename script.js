const addBookBtn = document.querySelector("#add-btn");
const dialog = document.querySelector("dialog");

const myLibrary = [
  {
    title: "Test Title",
    author: "Test Author",
    pages: 100,
    read: false,
  },
  {
    title: "Test Title 2",
    author: "Test Author 2",
    pages: 200,
    read: false,
  },
  {
    title: "Test Title 3",
    author: "Test Author 3",
    pages: 300,
    read: false,
  },
];

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
})

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks(myLibrary) {
  const bookGrid = document.querySelector(".book-grid");

  bookGrid.innerHTML = "";
  myLibrary.forEach((book) => {
    displayBook(book);
  });
}

function displayBook(book) {
  const bookGrid = document.querySelector(".book-grid");

  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  const bookDetails = document.createElement("div");
  bookDetails.classList.add("book-details");
  bookDetails.classList.add("flow");

  const bookTitle = document.createElement("h2");
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = `by ${book.author}`;

  const bookPages = document.createElement("p");
  bookPages.textContent = `${book.pages} pages`;

  const bookButtons = document.createElement("div");
  bookButtons.classList.add("book-btns");
  bookButtons.classList.add("flow");

  const readBtn = document.createElement("button");
  readBtn.classList.add("btn");
  readBtn.classList.add("long-btn");
  readBtn.textContent = "Not Read";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn");
  deleteBtn.classList.add("long-btn");
  deleteBtn.classList.add("del-btn");
  deleteBtn.textContent = "Delete";

  bookDetails.append(bookTitle, bookAuthor, bookPages);
  bookButtons.append(readBtn, deleteBtn);
  bookCard.append(bookDetails, bookButtons);

  bookGrid.appendChild(bookCard);
}

displayBooks(myLibrary);
