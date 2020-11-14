## Project Name 
Read Here 

## Description 
   Our almost novel idea was born, with the concept of adding to a user's travel packing list, by being able to find a book that is set in the city  that you are travelling to.   Sometimes it gets you excited about your destination.   For example, a user might be travelling to New Orleans and wants to read a book set in the Crescent City that is mystery.     When the user inputs their destination city and selects "Mystery" as their desired genre the API will make a call to Open Library to obtain a list of books set in New Orleans with a "Mystery" Genre.  Then a 2nd call is made to Google Books, where we filter out the results to present the top 10 books based on the number of reviews. The user is then presented with their top 10 books in that destination city.   Don't worry if you are not actually travelling anywhere, you can still select your list of books to escape with.        

## Installation
A user can navigate to our site through:   https://thedreamteam-nubootcamp.github.io/ReadHere/

## Usage
When user pulls up the site, https://thedreamteam-nubootcamp.github.io/ReadHere/, they are presented with search boxes.  
![Main ScreenPNG](https://user-images.githubusercontent.com/69594945/99137101-0a4a0780-25ee-11eb-88be-3dbb23e5b068.PNG)

The User inputs a city 
![City Seeclection ](https://user-images.githubusercontent.com/69594945/99137095-09b17100-25ee-11eb-91a5-05e96219e411.PNG)

And selects the genre 
![Search box Genre](https://user-images.githubusercontent.com/69594945/99137107-0c13cb00-25ee-11eb-837c-3ca796e91815.PNG)


Once the user hits submit, a list of books by order of reviews will appear on the screen (the 10 most popular by review score on Google books)
<img width="1225" alt="search results" src="https://user-images.githubusercontent.com/69594945/99138728-5732db80-25f8-11eb-907a-2a4b2eab8df2.png">

Included in the list of books is the title, author, book cover: 
![Book tite, author, cover](https://user-images.githubusercontent.com/69594945/99138796-f3f57900-25f8-11eb-9cc4-e8f91325c948.PNG)   


## Credits
The Dream Team: Jordan, Jen, Lauren, Rafael
Our API's: 
Open Library: https://openlibrary.org 
GoogleBooks: https://www.googleapis.com/books 
With a little help from friends and our esteemed instructor Lori
W3 Schools and stackOverflow for invaluable guidance.  
https://coderwall.com/p/w7npmq/fully-custom-select-box-simple-css-only

## License
MIT License

Copyright (c) [2020] [Jennifer Doyle]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

