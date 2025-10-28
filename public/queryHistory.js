function openHistory() {
    document.getElementById('queryHistory').style.display = 'block';
    const queryHistory = localStorage.getItem('savedQueries');

    // Get the ul element where we'll put the list items
    const queryList = document.getElementById('queryList');

    if (queryHistory === null) {
        // No saved queries - show message
        queryList.innerHTML = '<li>No saved queries yet. Save some queries to see them here!</li>';
    } else {
        // Parse the saved queries
        const queriesArray = JSON.parse(queryHistory);
        
        // Build HTML for all queries
        let listHTML = '';
        queriesArray.forEach((query, index) => {
            listHTML += `
                <li style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;">
                    <div onclick="loadQuery('${query.sql.replace(/'/g, "\\'")}')" style="cursor: pointer; flex-grow: 1;">
                        <strong>${query.title}</strong> (${query.date})<br>
                        <small style="color: #666;">${query.sql.substring(0, 50)}...</small>
                    </div>
                    <button onclick="deleteQuery(${index})" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 10px;">Delete</button>
                </li>
            `;
        });
        
        // Put the HTML inside the ul
        queryList.innerHTML = listHTML;
    }
}

function loadQuery(sql) {
    // Put the saved SQL back in the textarea
    document.getElementById('queryInput').value = sql;
    // Close the modal so user can run the query
    closeHistory();
}

function closeHistory() {
    document.getElementById('queryHistory').style.display = 'none';
}

function saveQuery() {
    // Step 1: Get the query text
    const queryText = document.getElementById("queryInput").value; 

    // Step 2: Validate it's not empty
    if (!queryText || queryText.trim() === '') {
        alert("Write a query first!");
        return;
    }

    // Step 3: Get description from user
    const description = prompt("Enter description for your query:");
    
    // If user cancels prompt, stop here
    if (!description) {
        return;
    }

    // Step 4: Get existing queries from localStorage
    const existingQueries = localStorage.getItem('savedQueries');
    let queriesArray;
    
    if (existingQueries === null) {
        // First time - no saved queries yet, start with empty array
        queriesArray = [];
    } else {
        // Parse the JSON string back to JavaScript array
        queriesArray = JSON.parse(existingQueries);
    }
    
    // Step 5: Create new query object and ADD it to existing array
    const newQuery = {
        id: Date.now(),                    // Unique ID
        title: description,                // User's description
        sql: queryText,                    // The SQL query
        date: new Date().toISOString().split('T')[0]  // Today's date (YYYY-MM-DD)
    };
    
    // Add new query to the array
    queriesArray.push(newQuery);
    
    // Step 6: Save back to localStorage
    localStorage.setItem('savedQueries', JSON.stringify(queriesArray));
    
    // Step 7: Show success and clear textarea
    alert("Query Saved to History");
    document.getElementById("queryInput").value = '';
};

function deleteQuery(index) {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this query?")) {
        return;
    }
    
    // Get existing queries from localStorage
    const existingQueries = localStorage.getItem('savedQueries');
    
    if (existingQueries) {
        // Parse the queries
        let queriesArray = JSON.parse(existingQueries);
        
        // Remove the query at the specified index
        queriesArray.splice(index, 1);
        
        // Save back to localStorage
        localStorage.setItem('savedQueries', JSON.stringify(queriesArray));
        
        // Refresh the history modal to show updated list
        openHistory();
    }
}