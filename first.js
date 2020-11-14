//declare variables
var bookList = [];
var topTen = [];

//declare functions
//searchBooks takes in setting and genre, returns list of up to 10 most popular books that meet these criteria
function searchBooks(place, genre) {
    //openlibrary API call with setting and genre as search terms
    var queryURL = "https://openlibrary.org/search.json?place=" + place + "&subject=fiction&subject=" + genre;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //clear bookList
        bookList = [];
        //returns 25 books maximum from call
        let len = Math.min(response.docs.length, 25);
        //for each book result, add a book object with title, author, place, cover image properties
        for (var i = 0; i < len; i++) {
            let bookObj = {
                    bookTitle: response.docs[i].title,
                    bookAuthor: response.docs[i].author_name,
                    bookLocation: response.docs[i].place,
                    bookCoverId: response.docs[i].cover_i
                }
                //add book object to book list
            bookList.push(bookObj);
        }
        //if bookList has less then 10 elements, skip rankings and return whole list
        if (len > 10) {
            getScores(bookList);
        } else {
            topTen = bookList;
            appendValues(topTen);
        }

    });
}
//getScores function takes in array of book objects and adds a number of scores property to each object
function getScores(booksArray) {
    //for each object in the array 
    var numArr = booksArray.length
    for (let i = 0; i < numArr; i++) {
        //get current title
        let title = booksArray[i].bookTitle;
        let author = booksArray[i].bookAuthor;

        //search google book api for current title
        var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + title + author;
        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            // store number of ratings
            var numRatings = response.items[0].volumeInfo.ratingsCount;
            // assign numRatings to each object in book list as property, assign value of 0 if undefined
            if (numRatings > 1) {
                booksArray[i].numScores = numRatings;
            } else {
                booksArray[i].numScores = 0;
            }
        })
    }
    //wait for API promises to resolve, then sort object array by numScores property
    setTimeout(function() {
        //sort books by number of scores (ascending)
        let sortedBooks = _.sortBy(booksArray, function(book) {
            return book.numScores;
        });
        //store 10 most reviewed books as topTen
        sortedBooks.reverse();
        topTen = sortedBooks.slice(0, 10);
    }, 2000)
    setTimeout(function() {
        //run appendValues with 10 most reviewed books
        appendValues(topTen);
    }, 2000)

}
//appendValues function adds book information to the DOM
function appendValues() {
    for (var i = 0; i < topTen.length; i++) {
        $(".lead-" + [i]).text(topTen[i].bookTitle);
        $(".author-" + [i]).text(topTen[i].bookAuthor);
        $(".img-" + [i]).attr("src", "https://covers.openlibrary.org/b/id/" + topTen[i].bookCoverId + "-L.jpg")
    }

}


// Event handler for user clicking the Search Her button
$("#select-book").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city and genre
    var inputCity = $("#input-city").val().trim();
    var inputGenre = $("#genres").val().trim();
    //run searchBooks function that generates list of book objects
    searchBooks(inputCity, inputGenre);

});