const addBookBtn = document.querySelector("#add-btn");

const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector(".can-btn");
const submitBtn = document.querySelector(".sub-btn");

let myLibrary = [
  {
    id: "1",
    title: "Test Title",
    author: "Test Author",
    pages: 100,
    read: false,
  },
  {
    id: "2",
    title: "Test Title 2",
    author: "Test Author 2",
    pages: 200,
    read: false,
  },
  {
    id: "3",
    title: "Test Title 3",
    author: "Test Author 3",
    pages: 300,
    read: false,
  },
];

function generateRandomID() {
  const randomPart = Math.random().toString(36).substring(2, 15);
  const timestampPart = Date.now().toString(36);
  return randomPart + timestampPart;
}

function Book(title, author, pages, read) {
  this.id = generateRandomID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function removeBookFromLibrary(id) {
  myLibrary = myLibrary.filter((book) => book.id != id);
  displayBooks(myLibrary);
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
  deleteBtn.dataset.id = book.id;

  deleteBtn.addEventListener("click", (e) => {
    console.log(e.target);
    removeBookFromLibrary(e.target.dataset.id);
  });

  bookDetails.append(bookTitle, bookAuthor, bookPages);
  bookButtons.append(readBtn, deleteBtn);
  bookCard.append(bookDetails, bookButtons);

  bookGrid.appendChild(bookCard);
}

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#pages");
  const readInput = document.querySelector("#read");

  if (!titleInput.value || !authorInput.value || !pagesInput.value) return;

  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked
  );

  addBookToLibrary(newBook);
  displayBooks(myLibrary);
  dialog.close();
});

displayBooks(myLibrary);
