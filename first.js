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

const bookList = [];

function searchBooks(place) {

    var queryURL = "https://openlibrary.org/search.json?place=" + place + "&subject=fiction&subject=mystery";
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
        //   // Empty the contents of the book-div, append the new book content
        //
        //   $("#book-div").empty();
        //   $("#book-div").append(bookTitle, bookAuthor, bookCover);
        //
        // }
        //console.log(isbnArr);
    });
} 




function googleSearch() {
    var isbn = "978-0553212457";
    //  var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + isbn;
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + isbn;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

    });
}



// Event handler for user clicking the select-artist button

$("#select-book").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the book name
    var inputBook = $("#input-city").val().trim();

    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBooks(inputBook);
    //googleSearch();
    getRatings();
});




function getRatings() { //eventually needs to take in the array bookObj
    //list of titles (example book object)

    console.log(bookList);

    // let bookObj = [{
    //     title: "Breakfast of Champions"
    // }, {
    //     title: "slaughterhouse five",
    // }, {
    //     title: "cat's cradle"
    // }, {
    //     title: "sirens of titan"
    // }, {
    //     title: "welcome to the monkey house"
    // }];
    //loop for each entry in title list
    // for (let i = 0; i < bookObj.length; i++) {
    //     //get current title
    //     let title = bookObj[i].title;
    //     //search google book api for current title
    //     let queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + title;
    //     //ajax call
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function(response) {
    //         console.log(response.items);
    //         //store number of ratings as score
    //         let numRatings = response.items[0].volumeInfo.ratingsCount;
    //         let avgRating = response.items[0].volumeInfo.averageRating;
    //         if (numRatings > 0) {
    //             bookObj[i].numscores = numRatings;
    //             bookObj[i].avgScore = avgRating;
    //         } else {
    //             bookObj[i].numscores = 0;
    //             bookObj[i].avgScore = 0;
    //         }
    //     })
    // }
    //scratch work on sort method
    // console.log(bookObj.numscores);
    // // bookObj.sort((a, b) {
    // //     return a.numscores - b.numscores
    // // });
    // (a, b)
    // console.log(bookObj);
}