const newQuote = document.getElementById("newQuote");

const Quotes = [
  {
    text: '"Behind every great man is a women rolling her eyes."',
    category: "Sarcasm",
  },

  {
    text: '"Prejudice is a great time saver. You can form opinions with out having to get the facts."',
    category: "Life",
  },

  {
    text: '"Whether forecast for tonight: dark."',
    category: "Sarcasm",
  },
];

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomQuote = Math.floor(Math.random() * Quotes.length);
  quoteDisplay.textContent = Quotes[randomQuote].text;
}
showRandomQuote();

newQuote.addEventListener("click", showRandomQuote);

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    Quotes.push({ Text: newQuoteText, category: newQuoteCategory });
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both a quote and a category");
  }
}
