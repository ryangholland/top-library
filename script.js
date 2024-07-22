const addBookBtn = document.querySelector("#add-btn");

const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector(".can-btn");
const submitBtn = document.querySelector(".sub-btn");

const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  render() {
    const bookGrid = document.querySelector(".book-grid");

    this.bookCard = document.createElement("div");
    this.bookCard.classList.add("book-card");

    const bookDetails = document.createElement("div");
    bookDetails.classList.add("book-details");
    bookDetails.classList.add("flow");

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = this.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `by ${this.author}`;

    const bookPages = document.createElement("p");
    bookPages.textContent = `${this.pages} pages`;

    const bookButtons = document.createElement("div");
    bookButtons.classList.add("book-btns");
    bookButtons.classList.add("flow");

    const readBtn = document.createElement("button");
    readBtn.classList.add("btn");
    readBtn.classList.add("long-btn");
    readBtn.textContent = this.read ? "Read" : "Not Read";
    if (this.read) readBtn.classList.add("green-bg");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("long-btn");
    deleteBtn.classList.add("del-btn");
    deleteBtn.textContent = "Delete";

    readBtn.addEventListener("click", () => {
      this.changeReadStatus(readBtn);
    });

    deleteBtn.addEventListener("click", () => {
      this.delete(bookGrid);
    });

    bookDetails.append(bookTitle, bookAuthor, bookPages);
    bookButtons.append(readBtn, deleteBtn);
    this.bookCard.append(bookDetails, bookButtons);

    bookGrid.appendChild(this.bookCard);
  }

  changeReadStatus(readBtn) {
    this.read = !this.read;
    readBtn.textContent = this.read ? "Read" : "Not Read";
    if (this.read) {
      readBtn.classList.add("green-bg");
    } else {
      readBtn.classList.remove("green-bg");
    }
  }

  delete(bookGrid) {
    if (this.bookCard) {
      bookGrid.removeChild(this.bookCard);
      this.bookCard = null;
      const index = myLibrary.indexOf(this);
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }
    }
  }
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
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
  newBook.render();
  dialog.close();
});

myLibrary.forEach((book) => {
  book.render();
});

/* Add samples */

const sampleBook1 = new Book("Sample Book 1", "Sample Author 1", 100, false);
const sampleBook2 = new Book("Sample Book 2", "Sample Author 2", 200, true);
const sampleBook3 = new Book("Sample Book 3", "Sample Author 3", 300, false);

addBookToLibrary(sampleBook1);
addBookToLibrary(sampleBook2);
addBookToLibrary(sampleBook3);

myLibrary.forEach((book) => book.render());
