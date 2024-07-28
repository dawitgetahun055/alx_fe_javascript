const newQuote = document.getElementById("newQuote");

const Quotes = JSON.parse(localStorage.getItem("quotes")) || [
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

document.addEventListener('DOMContentLoaded', ()=> {
  populateCategories();
  showRandomQuote();

  const savedCategory = localStorage.getItem("selectedCategory");
  if(savedCategory) {
    document.getElementById("categoryFilter").value = savedCategory;
    filterQuotes();
  }
})

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomQuote = Math.floor(Math.random() * Quotes.length);
  quoteDisplay.innerHTML = `<p>${Quotes[randomQuote].text}</p>`;
}

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(Quotes.map(quote => quote.category))];

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem("selectedCategory", selectedCategory);
  showRandomQuote();
}

newQuote.addEventListener("click", showRandomQuote);

const createAddQuoteForm = function () {
  const Form = document.createElement("form");
  Form.innerHTML = `<input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input
      id="newQuoteCategory"
      type="text"
      placeholder="Enter quote category"
    />
    <button onclick="addQuote()">Add Quote</button><br><br>`;

  document.body.appendChild(Form);
};

createAddQuoteForm();

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    Quotes.push({ text: newQuoteText, category: newQuoteCategory });
    localStorage.setItem("quotes" JSON.stringify(Quotes));
    populateCategories();
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both a quote and a category");
  }

  saveQuotes();
}

function getFilteredQuotes() {
  const selectedCategory = document.getElementById(categoryFilter).value;
  if (selectedCategory === "all") {
    return Quotes;
  }
  return Quotes.filter(quote => quote.category === selectedCategory);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    Quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(Quotes));
}

function exportToJson() {
  const dataStr = JSON.stringify(Quotes);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
