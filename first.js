var bookList = [];
var topTen = [];

function searchBooks(place, genre) {

    var queryURL = "https://openlibrary.org/search.json?place=" + place + "&subject=fiction&subject=" + genre;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response.docs);

        bookList = [];
        let len = Math.min(response.docs.length, 25);
        for (var i = 0; i < len; i++) {

            let bookObj = {
                bookTitle: response.docs[i].title,
                bookAuthor: response.docs[i].author_name,
                bookLocation: response.docs[i].place,
                bookCoverId: response.docs[i].cover_i
            }

            bookList.push(bookObj);
        }
        if (len > 10) {
            getScores(bookList);
        } else {topTen = bookList;
                appendValues(topTen);}
        
    }); 
}

function getScores(booksArray) {

    console.log(booksArray);

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
        }).then(function (response) {

            // store number of ratings as score
            var numRatings = response.items[0].volumeInfo.ratingsCount;

            // assign scores each object in book list, assign value of 0 if undefined
            if (numRatings > 1) {
                booksArray[i].numScores = numRatings;
            } else {
                booksArray[i].numScores = 0;
            }
        })
    }

    // console.log(booksArray);

    setTimeout(function () {
        //sort books by number of scores (ascending)
        let sortedBooks = _.sortBy(booksArray, function (book) {
        return book.numScores;
        });
        //     take 10 highest rated books
        sortedBooks.reverse();
        topTen = sortedBooks.slice(0 , 10);
        console.log(topTen);
    }, 2000)
    setTimeout(function(){
        console.log("topTen",topTen);
        appendValues(topTen);
    },2000)
    
}

function appendValues(){

    console.log(topTen);

    for (var i = 0; i < topTen.length; i++){
        $(".lead-"+ [i]).text(topTen[i].bookTitle);
        $(".author-"+ [i]).text(topTen[i].bookAuthor);
        $(".img-"+ [i]).attr("src", "https://covers.openlibrary.org/b/id/" + topTen[i].bookCoverId + "-L.jpg")
    }
    
}


// Event handler for user clicking the select-artist button

$("#select-book").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city and genre
    var inputCity = $("#input-city").val().trim();
    var inputGenre = $("#genres").val().trim();
    //run searchBooks function that generates list of book objects
    searchBooks(inputCity, inputGenre);
     
});
