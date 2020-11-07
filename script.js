var queryURL = "https://www.googleapis.com/books/v1/volumes?q=978-0553212457"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response)
})