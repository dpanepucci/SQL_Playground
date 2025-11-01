
async function easyMode() {
    const questionText = document.getElementById("questionText");
    
    // Show loading
    questionText.innerHTML = '<div class="loading-message">🤖 Generating easy question...</div>';
    
    try {
        // TODO: Replace with actual OpenAI API call
        const response = await fetch('/api/generate-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ difficulty: 'easy' })
        });
        
        const result = await response.json();
        
        if (result.question) {
            questionText.innerHTML = `
                <div class="question-display">
                    <h4>Easy Question:</h4>
                    <p>${result.question}</p>
                </div>
            `;
        } else {
            throw new Error('No question received');
        }
    } catch (error) {
        questionText.innerHTML = '<div class="error-message">Error generating question. Please set up the backend endpoint first.</div>';
    }
}

async function mediumMode() {
    const questionText = document.getElementById("questionText");
    
    questionText.innerHTML = '<div class="loading-message">🤖 Generating medium question...</div>';
    
    try {
        const response = await fetch('/api/generate-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ difficulty: 'medium' })
        });
        
        const result = await response.json();
        
        if (result.question) {
            questionText.innerHTML = `
                <div class="question-display">
                    <h4>Medium Question:</h4>
                    <p>${result.question}</p>
                </div>
            `;
        } else {
            throw new Error('No question received');
        }
    } catch (error) {
        questionText.innerHTML = '<div class="error-message">Error generating question. Please set up the backend endpoint first.</div>';
    }
}

async function hardMode() {
    const questionText = document.getElementById("questionText");
    
    questionText.innerHTML = '<div class="loading-message">🤖 Generating hard question...</div>';
    
    try {
        const response = await fetch('/api/generate-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ difficulty: 'hard' })
        });
        
        const result = await response.json();
        
        if (result.question) {
            questionText.innerHTML = `
                <div class="question-display">
                    <h4>Hard Question:</h4>
                    <p>${result.question}</p>
                </div>
            `;
        } else {
            throw new Error('No question received');
        }
    } catch (error) {
        questionText.innerHTML = '<div class="error-message">Error generating question. Please set up the backend endpoint first.</div>';
    }
}

function generateQuestion() {
    const questionModal = document.getElementById("questionModal");
    const questionText = document.getElementById("questionText");
    
    // Clear any previous content
    questionText.innerHTML = '';
    
    // Show the modal
    questionModal.style.display = 'block';
}

function closeQuestion() {
    const questionModal = document.getElementById("questionModal");
    questionModal.style.display = 'none';
};