// AS A traveler
// I WANT to see a list of available books that take place in the city I am visiting
// SO THAT I can read more about the city
// GIVEN a map dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with a list of books that take place in that city ranked by review score
// WHEN I view the list of books
// THEN I am presented with the book’s author, synopsis, and review
// WHEN I click on a city in the search history
// THEN I am again presented with a list of books that take place in that city ranked by review score
// WHEN I open the map dashboard
// THEN I am presented with the last searched city book list
**************************************************
// Upon entering the site user is presented with 
// 2 search boxes.  The first search box asks for city the second search
// box has a preset list of genres to choose from such as:
// thriller
// romance
// contemporary
// SyFy
// Young Adult*
// Suprise Me

// user will input a city and then select a genre.   the site will then make an initial API call to 
// open library and return a list of books with that city. (store city in local storage? )  this list will be pushed into an array and a second API 
// will be made to goodreads API   the Array will be sent to Goodreads to request the reviews/socres for each book, 
// once we get the scores we can then go through the array using a 4 loop to grab the  by highest 
// ranking scores of those titles and create a new array of the books with highest rankings.  
// once the function has run the book array of the top 10  will be stored locally 
// the top 10 books based on number of reviews and overall review.
//        
// each book will be stored in local Storage, it will then be appended to the page within
//  a div referred to as Destinations
// each book will be listed in order of  ranking and we would include the following 
// following information on each book on the page this information is captured from the initial API call and a function run 
// to pull the data and append to the page :
// Title, Author, Setting (City name/region), genre, year published and rating? title picture and ISBN. description/summary?

// MVP option?  Side note we could simply display the book cover and then when user clicks on each book the book details appear?  