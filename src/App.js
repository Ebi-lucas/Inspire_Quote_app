import React, { useEffect, useState } from 'react';
import './App.scss';

let quoteAndAuthorDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("Life is a 10% what happen to me and 90% of how i react to it");
  const [author, setAuthor] = useState("Kevin Kruse");
  const [randomQuote, setRandomQuote] = useState(0);
  const [quoteAndAuthorArray, setQuoteAndAuthorArray] = useState([]);

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuoteAndAuthorArray(parsedJSON.quotes);
    console.log(parsedJSON);
  }

  useEffect(() => {
    fetchQuotes(quoteAndAuthorDBUrl);
  }, [quoteAndAuthorDBUrl]);

  const getRandomQuote = () => {

    let randInteger = (randomQuote + 1) % quoteAndAuthorArray.length;

    setRandomQuote(randInteger);
    setQuote(quoteAndAuthorArray[randInteger].quote);
    setAuthor(quoteAndAuthorArray[randInteger].author);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div id="quote-box">
        <p id="text">
          "{quote}"
        </p>
        <p id="author">
          - {author}
        </p>
        <button id="new-quote" onClick={() => getRandomQuote()}>Next Quote</button>
        <a id="tweet-quote" target="_blank" rel="noopener noreferrer" href={encodeURI(`https://twitter.com/intent/tweet?text="${quote}" - ${author}`)}>Tweet Quote</a>
        </div>
      </header>
    </div>
  );
}

export default App;