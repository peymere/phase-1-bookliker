document.addEventListener("DOMContentLoaded", function() {

//step 1 
//own words
// fetch books from localhost
//display book titles 
    //create li with title
    //append to ul#list
const bookList = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')
console.log(bookList)

fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(bookArray => bookArray.forEach(renderOneBook))

const renderOneBook = (bookObject) => {
    const listTitles = document.createElement('li')
    listTitles.className = "book-titles"
    listTitles.textContent = bookObject.title
    bookList.append(listTitles)
    listTitles.addEventListener('click', (e) => {
        //console.log(listTitles)
        showPanel.innerHTML = ""
        //book image
        const bookImg = document.createElement('img')
        bookImg.src = bookObject.img_url
        bookImg.alt = bookObject.title
        console.log(bookImg)
        //book title
        const titleElement = document.createElement('h2')
        titleElement.textContent = bookObject.title
        console.log(titleElement)
        //author subtitle
        const authorElement = document.createElement('h3')
        authorElement.textContent = bookObject.author
        console.log(authorElement)
        //book subtitl;e
        const subtitleElement = document.createElement('h3')
        subtitleElement.textContent = bookObject.subtitle
        console.log(subtitleElement)
        //book description
        const descriptionElement = document.createElement('p')
        descriptionElement.textContent = bookObject.description
        console.log(descriptionElement)
        //user list
        const likesElement = document.createElement('ul')
        likesElement.textContent = "Users who liked the book:"
        const userElement = document.createElement('li')
        const likeButton = document.createElement('button')
        likeButton.id = 'like-button'
        likeButton.textContent = 'Like'
        showPanel.append(bookImg, titleElement, authorElement, subtitleElement, descriptionElement, likeButton)
        console.log(showPanel)
        //like button event
        likeButton.addEventListener('click', (e) => {
            const newUser = {
                username: "nymeria"
            }
            const newUserElement = document.createElement('li')
            newUserElement.textContent = newUser.username
            likesElement.appendChild(newUserElement)
            bookObject.users.push(newUser)
            fetch(`http://localhost:3000/books/${bookObject.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({users: bookObject.users})   
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("PATCH successful", data)
            // userElement.textContent = newUser.username
            
            })
        })
        // showPanel.appendChild(likesElement)
        bookObject.users.forEach(user => {
            const userElement = document.createElement('li');
            userElement.textContent = user.username;
            likesElement.appendChild(userElement);
        });
        showPanel.append(likesElement)
    })
}
})

//step 2
// use click event listener on title li
// when clicked display information in div#show-panel elem
//      -bookObj img
//      -bookObj title
//      -bookObj subtitle
//      -bookObj description
//      -bookObj author
//      -bookObj object of users
//         who liked the book

//step 3 
//create a like button on each book show-panel
//add event listener on like button
//send patch request with array of users who like the book
//add a new user to the list