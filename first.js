// The following is a function that returns a list of books based on the book's title
var bookList = [];
var topTenList = [];
// Event handler for user clicking the button
$("#select-book").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city and genre
    var inputCity = $("#input-city").val().trim();
    var inputGenre = $("#genres").val().trim();
    //run searchBooks function that updates bookList of book objects
    //it also finds and sorts by number of reviews, updates topTenList with ten books to return
    searchBooks(inputCity, inputGenre);

    //pseudocode:
    //append topTenList here? maybe have to wrap in previous function as well
});


function searchBooks(place, genre) {
    bookList = [];
    //ajax query using setting and genre
    var queryURL = "https://openlibrary.org/search.json?place=" + place + "&subject=fiction&subject=" + genre;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //returns book objects
        let len = response.docs.length;
        for (var i = 0; i < len; i++) {
            //create book object
            let bookObj = {
                    bookTitle: response.docs[i].title,
                    bookAuthor: response.docs[i].author_name,
                    bookLocation: response.docs[i].place,
                }
                //add new book object to array of books
            bookList.push(bookObj);
        }
    });
    //wait 2 seconds for book list ajax promises to return, then run getNumScores
    setTimeout(function() {
            console.log("1", bookList);
            getNumScores();
        }, 2500)
        // wait 2 seconds number of scores ajax promises to return, then run sortByNumScores
    setTimeout(function() {
        console.log("sorted array", sortByNumScores());
        topTenList = sortByNumScores();
    }, 5000)
}

<<<<<<< HEAD
// Event handler for user clicking the select-artist button

$("#select-book").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the book name
    var inputBook = $("#input-city").val().trim();
    var inputGenre = $("#genres").val().trim();

    // Clearing the bookobj list before every search
    // clearArray();
    bookList = [];
    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBooks(inputBook,inputGenre);
    // Run getTopTen to get 10 most reviewed books from bookList, store as new variable 
    var topTenBookList = getTopTen(bookList);

    // console.log(topTenBookList);
});

localStorage.setItem("bookList", JSON.stringify(bookList)); 

 

function getTopTen(booksArray) {
    //loop for each entry in book list
    for (let i = 0; i < booksArray.length; i++) {
        //get current title
        let title = booksArray[i].title;

        //search google book api for current title
        let queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + title;
=======
function getNumScores() {
    //adds number of scores as attribute to each book object in global variable bookList
    len2 = bookList.length;
    for (let i = 0; i < len2; i++) {
        //get current title + author
        let title = bookList[i].bookTitle;
        let author = bookList[i].bookAuthor;
        //search google book api for current title + author
        var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + title + author;
>>>>>>> 552f785b0ab4ee945e8f9a9eaeb8f9ed17750f07

        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            //store number of ratings
            let numRatings = response.items[0].volumeInfo.ratingsCount;
            //assign value of 0 if undefined
            if (numRatings > 0) {
                bookList[i].numscores = numRatings;
            } else {
                bookList[i].numscores = 0;
            }
        })
    }
}


function sortByNumScores() {
    //sort books by number of scores (ascending)
    let sortedBooks = _.sortBy(bookList, function(book) {
        return book.numscores;
    });
    //     take 10 highest rated books
    sortedBooks.reverse();
    let topTen = sortedBooks;
    return topTen.slice(0, 10);
}



//        Constructing HTML containing the book's information

//        var bookTitle = $("<h1>").text(response.docs[i].title);
//        var bookAuthor = $("<h2>").text(response.docs[i].author_name);
//        var bookCover = $("<img>").attr("src", "https://covers.openlibrary.org/b/id/" + response.docs[i].cover_i + "-L.jpg");
//        var bookLocation = $("<h2>").text(response.docs[i].place);

//        $("#book-div").empty();
//        $("#book-div").append(bookTitle,bookAuthor,bookCover,bookLocation);