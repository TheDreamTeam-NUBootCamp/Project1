// The following is a function that returns a list of books based on the book's title

//   function searchBooks(title) {
//     var queryURL = "https://openlibrary.org/search.json?q="+title;
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {
//         for(var i = 0; i < 10; i++){
//       
//        console.log(response);                           //returns whole object
//        console.log(response.docs);                      //returns array of results
//        console.log(response.docs[1].place);             //returns location of book
//        console.log(response.docs[0].title);             //returns title of book
//        console.log(response.docs[0].author_name);       //returns the author of the book
//        console.log(response.docs[0].cover_edition_key); //returns the cover of the book

//        Constructing HTML containing the book's information

//        var bookTitle = $("<h1>").text(response.docs[i].title);
//        var bookAuthor = $("<h2>").text(response.docs[i].author_name);
//        var bookCover = $("<img>").attr("src", "https://covers.openlibrary.org/b/id/" + response.docs[i].cover_i + "-L.jpg");
//        var bookLocation = $("<h2>").text(response.docs[i].place);

//        $("#book-div").empty();
//        $("#book-div").append(bookTitle,bookAuthor,bookCover,bookLocation);

//         }

//     });
//   }


// Function for the first api call that returns an array of objects

let bookList = [];

function searchBooks(place, genre) {

    var queryURL = "https://openlibrary.org/search.json?place=" + place + "&subject=fiction&subject=" + genre;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        //console.log(response.docs);



        for (var i = 0; i < 10; i++) {


            let bookObj = {
                bookTitle: response.docs[i].title,
                bookAuthor: response.docs[i].author_name,
                bookLocation: response.docs[i].place,
            }
            bookList.push(bookObj);
            console.log(bookObj);
            console.log(bookList);
        }
        // The following is to create an array that has all of the first api call's isbns. 
        //
        //var isbnArr = [];
        //
        // for (var i = 0; i < 10; i++) {
        //   var bookTitle = $("<h1>").text(response.docs[i].title);
        //   var bookAuthor = $("<h2>").text(response.docs[i].author_name);
        //   var bookCover = $("<img>").attr("src", "https://covers.openlibrary.org/b/id/" + response.docs[i].cover_i + "-L.jpg");
        //   var bookIsbn = response.docs[i].isbn[0];
        //   var bookLocation = $("<h2>").text(response.docs[i].place);
        //
        //   isbnArr.push(bookIsbn);
        //
        // Empty the contents of the book-div, append the new book content
        //
           $("#book-div").empty();
           $("#book-div").append(bookTitle, bookAuthor, bookCover);
        //
        // }
        //console.log(isbnArr);
    });
}

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

        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            //store number of ratings as score
            let numRatings = response.items[0].volumeInfo.ratingsCount;
            let avgRating = response.items[0].volumeInfo.averageRating;
            //assign scores each object in book list, assign value of 0 if undefined
            if (numRatings > 0) {
                booksArray[i].numscores = numRatings;
                booksArray[i].avgScore = avgRating;
            } else {
                booksArray[i].numscores = 0;
                booksArray[i].avgScore = 0;
            }
        })
    }

    function sortByNumScores(bookArray) {
        //sort books by number of scores (ascending)
        let sortedBooks = _.sortBy(bookArray, function(book) {
            return book.numscores;
        });
        //take 10 highest rated books
        sortedBooks.reverse();
        let topTen = sortedBooks
        return topTen.slice(0, 10);
    }
    setTimeout(function() {
        console.log("sorted array", sortByNumScores(booksArray));
        return sortByNumScores(booksArray);
    }, 1000)
}