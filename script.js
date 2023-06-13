
const displayedQuotes = new Set();
const displayedFavorites = new Set();

const favorites = [
        { content: "Despite everything, it's still you.", author: "" },
        { content: "Be like the flower that gives its fragrance to even the hand that crushes it.", author: "" },
        { content: "In the kingdom of glass everything is transparent, and there is no place to hide a dark heart.", author: "" },
        { content: "The child is father of the man", author: "" },
        { content: "Sometimes to stay alive, you gotta kill your mind.", author: "" },
        { content: "Work hard in silence, let your success make the noise.", author: "" },
        { content: "My thoughts are stars I cannot fathom into constellations.", author: "" },
        { content: "Common sense is not so common.", author: "" }
    ];

    function getQuote() {
        // Add the spinner class to the refresh button
        document.getElementById('new-quote').classList.add('spinner');
    
        // Occasionally select from favorites
        if (Math.random() < 0.3) {
            // Check if all favorites have been displayed
            if (displayedFavorites.size === favorites.length) {
                // If all favorites have been displayed, clear the displayedFavorites set
                displayedFavorites.clear();
            }
    
            let quote;
            do {
                quote = favorites[Math.floor(Math.random() * favorites.length)];
            } while (displayedFavorites.has(quote.content));
    
            document.getElementById('quote-content').innerHTML = `“<b>${quote.content}</b>”`;
            document.getElementById('author').innerText = quote.author;
            document.getElementById('quote-content').classList.add("favorite");
            document.getElementById('favorite-label').style.display = "block";
            
            // Add the displayed favorite quote content to the displayedFavorites set
            displayedFavorites.add(quote.content);
    
        } else {
            fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {            
                document.getElementById('quote-content').innerHTML = `“<b>${data.content}</b>”`;
                document.getElementById('author').innerText = data.author;
                document.getElementById('quote-content').classList.remove("favorite");
                document.getElementById('favorite-label').style.display = "none";
            });
        }
    
        // Use setTimeout to delay the removal of the spinner class
        setTimeout(() => {
            document.getElementById('new-quote').classList.remove('spinner');
        }, 500);
    }

    getQuote();

    // Add the theme toggle script here
    document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        this.innerHTML = "☀️";
        document.getElementById('logo').src = "https://i.ibb.co/k0DDCS4/quotesdarkpng.png";
        localStorage.setItem('theme', 'dark');  // save dark theme preference
    } else {
        this.innerHTML = "🌙";
        document.getElementById('logo').src = "https://i.ibb.co/s9QrBLX/quotespng.png";
        localStorage.setItem('theme', 'light'); // save light theme preference
    }
});

// When the page loads, check for a saved theme preference and apply it
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('toggle-theme').innerHTML = "☀️";
        document.getElementById('logo').src = "https://i.ibb.co/k0DDCS4/quotesdarkpng.png";
    } else {
        document.body.classList.remove('dark-theme');
        document.getElementById('toggle-theme').innerHTML = "🌙";
        document.getElementById('logo').src = "https://i.ibb.co/s9QrBLX/quotespng.png";
    }
});

document.getElementById('new-quote').addEventListener('click', getQuote);


