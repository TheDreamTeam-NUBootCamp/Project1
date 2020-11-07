    //I like pizza

//   function searchBooks(title) {

//     // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
//     var queryURL = "https://openlibrary.org/search.json?q="+title;
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {

//         for(var i = 0; i < 10; i++){

//             // Printing the entire object to console
//       //console.log(response); //returns whole object
//       console.log(response.docs); //returns array of results
//       //console.log(response.docs[1].place); //returns location of book
//       //console.log(response.docs[0].title); //returns title of book
//       //console.log(response.docs[0].author_name); //returns the author of the book
//       // console.log(response.docs[0].cover_edition_key); //returns the cover of the book
//       // Constructing HTML containing the book's information
//        var bookTitle = $("<h1>").text(response.docs[i].title);
//        var bookAuthor = $("<h2>").text(response.docs[i].author_name);
//        var bookCover = $("<img>").attr("src", "https://covers.openlibrary.org/b/id/" + response.docs[i].cover_i + "-L.jpg");
//        var bookLocation = $("<h2>").text(response.docs[i].place);
    

//       // Empty the contents of the artist-div, append the new artist content

//        //$("#book-div").empty();
//        $("#book-div").append(bookTitle,bookAuthor,bookCover,bookLocation);
            
//         }
      
//     });
//   }

function searchBooks(place) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://openlibrary.org/search.json?place="+ place +"&subject=fiction";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    
        console.log(response.docs);
        var isbnArr = [];
        for(var i = 0; i < 10; i++){
    
            // Printing the entire object to console
      //console.log(response); //returns whole object
      //console.log(response.docs); //returns array of results
      //console.log(response.docs[1].place); //returns location of book
      //console.log(response.docs[0].title); //returns title of book
      //console.log(response.docs[0].author_name); //returns the author of the book
      // console.log(response.docs[0].cover_edition_key); //returns the cover of the book
      // Constructing HTML containing the book's information
       var bookTitle = $("<h1>").text(response.docs[i].title);
       var bookAuthor = $("<h2>").text(response.docs[i].author_name);
       var bookCover = $("<img>").attr("src", "https://covers.openlibrary.org/b/id/" + response.docs[i].cover_i + "-L.jpg");
       var bookIsbn = response.docs[i].isbn[0];
       console.log(bookIsbn);
       //var bookLocation = $("<h2>").text(response.docs[i].place);
      
      
      isbnArr.push(bookIsbn);
    
      
    
      // Empty the contents of the artist-div, append the new artist content
    
       //$("#book-div").empty();
       $("#book-div").append(bookTitle,bookAuthor,bookCover);
            
        }
        console.log(isbnArr);
    });
    }
    
    function googleSearch(){
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
        var inputBook = $("#book-input").val().trim();
    
        // Running the searchBandsInTown function(passing in the artist as an argument)
        searchBooks(inputBook);
        googleSearch();
      });