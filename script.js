function searchBooks() {
    let query = document.getElementById("searchBox").value;
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "🔍 Searching...";

    // Google Books API (Free)
    let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            resultsDiv.innerHTML = ""; // Clear results

            if (data.items) {
                data.items.forEach(book => {
                    let title = book.volumeInfo.title;
                    let pdfLink = book.accessInfo?.pdf?.downloadLink || "#";

                    let bookCard = `
                        <div class="book">
                            <h3>${title}</h3>
                            <a href="${pdfLink}" target="_blank">📥 Download PDF</a>
                        </div>
                    `;
                    resultsDiv.innerHTML += bookCard;
                });
            } else {
                resultsDiv.innerHTML = "No books found.";
            }
        })
        .catch(error => {
            resultsDiv.innerHTML = "❌ Error fetching data.";
            console.error(error);
        });
}
