function Books(title, author, numOfPages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.author.isRead = isRead;

    function info() {
        console.log(`${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.isRead ? "read" : "not read yet"}`)
    }
}

const library = [];

function createAndAddBook(title, author, numOfPages, isRead) {
    const book = new Books(title, author, numOfPages, isRead);
    library.push(book);
}

