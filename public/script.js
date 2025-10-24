async function runQuery() {
    const queryText = document.getElementById('queryInput').value;
    // error message if not text in field
    if (!queryText) {
        console.log("Please enter a query");
        return;
    }
    // Sending post request
    const response = await fetch('/api/query', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText })
    });
 
    // stores awaited response in results variable then console logs it
    const result = await response.json();
    const resultsDiv = document.getElementById('results');

    // NEED TO BETTER UNDERSTAND HTML TABLE CODE
    if (result.error) {
        resultsDiv.innerHTML = `<p style="color: red;">Error: ${result.error}</p>`;
    } else {
        // Check if we have data
        if (result.data.length === 0) {
            resultsDiv.innerHTML = '<p>No results found.</p>';
            return;
        }

        // Get column names from first row
        const columns = Object.keys(result.data[0]);

        // Build table
        let tableHTML = '<table border="1"><thead><tr>';
        columns.forEach(column => {
            tableHTML += `<th>${column}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';

        result.data.forEach(row => {
            tableHTML += '<tr>';
            columns.forEach(column => {
                tableHTML += `<td>${row[column]}</td>`;
            });
            tableHTML += '</tr>';
        });

        tableHTML += '</tbody></table>';
        resultsDiv.innerHTML = tableHTML;
    }
}