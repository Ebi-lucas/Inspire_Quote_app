import React, { useEffect, useState } from 'react';
import './App.scss';
import colorsArray from './colorsarray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

let quoteAndAuthorDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("Life is a 10% what happen to me and 90% of how i react to it");
  const [author, setAuthor] = useState("Kevin Kruse");
  const [randomQuote, setRandomQuote] = useState(0);
  const [quoteAndAuthorArray, setQuoteAndAuthorArray] = useState([]);
  const [ accentColor, setAccentColor ]=useState('#005B7F');

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
    setAccentColor(colorsArray[randInteger]);
    setQuote(quoteAndAuthorArray[randInteger].quote);
    setAuthor(quoteAndAuthorArray[randInteger].author);
  }

  return (
    <div className="App"style={{backgroundColor:accentColor}}>
      <header className="App-header" >
        <div id="quote-box">
        <h2 id="text">
          <span id="quote-icon"><FontAwesomeIcon icon={faQuoteLeft} /></span>{quote}"
        </h2>
        <p id="author">
          - {author}
        </p>
          <div className="button">
           <a id="tweet-quote" target="_blank" 
              rel="noopener noreferrer" style={{
              backgroundColor:accentColor}} href={
              encodeURI(`https://twitter.com/intent/tweet?text="${quote}" - ${author}`)}
              ><FontAwesomeIcon icon={faTwitter} /></a>
          </div>
        <button id="new-quote" style={{
          backgroundColor:accentColor}} 
          onClick={() => getRandomQuote()}
          >Next Quote</button>

        </div>
      </header>
    </div>
  );
}

export default App;