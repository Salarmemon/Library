

const getElm = (value, method) => {
    let element;
    if (method === "id") {
        element = document.getElementById(value);
    } else if (method === "class") {
        element = document.getElementsByClassName(value);
    } else if (method === "query") {
        element = document.querySelector(value);
    } else {
        console.log("Unsupported method of fetching an element");
        return
    }

    if (!element) {
        console.log("Error fetching the element");
        return
    }

    return element;
}


const addBtn = getElm("add-btn", "id");
const bookForm = getElm("book-form", "id");
const authorInput = getElm("author", "id");
const titleInput = getElm("title", "id");
const numOfPagesInput = getElm("num-of-pages", "id");
const booksGrid = getElm("books-grid", "id");
const readInput = getElm("is-read", "id");

function Book(title, author, numOfPages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;

}


 Book.prototype.info =  function () {
        console.log(`${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.isRead ? "read" : "not read yet"}`)
    }
Book.prototype.toggleRead = function () {
        this.isRead = !this.isRead;

        
    }

const library = [];

function createAndAddBook(title, author, numOfPages, isRead) {
    const book = new Book(title, author, numOfPages, isRead);
   
    library.push(book);
}

addBtn.addEventListener("click", () => {

    bookForm.classList.toggle("hidden");

})

function displayBooks() {
    const booksHTML = library.map(book => {
        return `<div class="book" data-id="${book.id}">
            <p class="book-title">Name: ${book.title}</p>
            <p class="book-author">Author: ${book.author}</p>
            <p class="book-num-of-pages"># Of Pages: ${book.numOfPages}</p>
            <button class="read-indicator ${book.isRead ? "read" : "not-read"}">${book.isRead ? "Read" : "Not Read"}</button>
            <button class="remove">Remove</button>            
        </div>`
        
    })

    booksGrid.innerHTML = booksHTML.join("");

}

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const author = authorInput.value;
    const title = titleInput.value;
    const numOfPages = numOfPagesInput.value;
    const checked = readInput.checked;
    createAndAddBook(title,  author, numOfPages, checked);
    bookForm.classList.add("hidden");
    displayBooks();
    

})

booksGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove") ) {
        const bookId = e.target.closest(".book").dataset.id;
        const index = library.findIndex(book => book.id === bookId);
        library.splice(index, 1);
        displayBooks();
    }

    if (e.target.classList.contains("read-indicator")) {
        const bookId = e.target.closest(".book").dataset.id;
        const book = library.find(b => b.id === bookId);
        book.toggleRead();
        displayBooks();
    }
})
