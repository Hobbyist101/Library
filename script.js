const newBtn = document.getElementById('newBtn');
const popUp = document.getElementById("popUp");
const closePopUp = document.getElementsByClassName('close')[0];
const addBtn = document.querySelector('#addBtn');

let myLibrary = [];

class Book{
    constructor(title,author,pages,read){
            this.title = form.title.value;
            this.author = form.author.value;
            this.pages = form.pages.value + ' ' + 'pg';
            this.read = form.read.checked;
        }
}

newBtn.addEventListener('click', () => popUp.style.display = "block");
closePopUp.addEventListener('click', () => popUp.style.display = "none");
addBtn.addEventListener('click', addBook);

function addBook() {
    event.preventDefault();
    popUp.style.display = "none";
    let newBook = new Book(title,author,pages,read);
    if(newBook.title == ""){
        form.reset();
    } else {
    myLibrary.push(newBook);
    updateData();
    updateLibrary();    
    form.reset();
    }
}
function updateData(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function updateLibrary() {
    const display = document.getElementById('libraryDisplay');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
    for (let i = 0; i < myLibrary.length; i++){
        createBoook(myLibrary[i]);
    }
}

function createBoook(book) {
    const libraryContent = document.querySelector('#libraryDisplay');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    libraryContent.appendChild(bookDiv);
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pageDiv);
    bookDiv.appendChild(readBtn);
    bookDiv.appendChild(removeBtn);

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(book));
    titleDiv.classList.add('title');
    authorDiv.classList.add('author');
    pageDiv.classList.add('page');
    readBtn.classList.add('readBtn');
    removeBtn.setAttribute('id', 'removeBtn');

    titleDiv.textContent = book.title;
    authorDiv.textContent = book.author;
    if (book.pages != ' pg'){
    pageDiv.textContent =  book.pages;
    }
    if(book.read === false) {
        readBtn.textContent = "Haven\'t Read";
        readBtn.style.backgroundColor = 'yellow';
    } else {
        readBtn.textContent = "Read";
        readBtn.style.backgroundColor = 'green';
    }
    removeBtn.textContent = 'Remove';
    readBtn.addEventListener('click', () => {
        book.read = !book.read;
        updateData();
        updateLibrary();
    })
    removeBtn.addEventListener('click', () => {
        let userInput = prompt('Are You Sure? (y/n)')
        if (userInput == 'y'){
            myLibrary.splice(myLibrary.indexOf(book),1);
            updateData();
            updateLibrary();
        } 
    })
}


function restore() {
    if(!localStorage.myLibrary) {
        updateLibrary();
    }else {
        let objects = localStorage.getItem('myLibrary');
        objects = JSON.parse(objects);
        myLibrary = objects;
        updateLibrary();
    }
}
restore();
