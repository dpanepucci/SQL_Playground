function generateQuestion() {
    const questions = [
        "What is the average age of patients?",
        "How many patients have a diagnosis of diabetes?",
        "List the names of patients who visited in the last month.",
        "What is the most common diagnosis among patients?",
        "How many patients are over 65 years old?",
        "Which gender has more patients in the database?",
        "What is the youngest patient's age?",
        "What is the oldest patient's age?",
        "How many different medical conditions are recorded?",
        "Which hospital has the most patients?"
    ];

    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];

    // Display the question in the modal
    const questionText = document.getElementById("questionText");
    const questionModal = document.getElementById("questionModal");
    
    questionText.innerHTML = `<p style="font-size: 1.1rem; padding: 20px; background: #f5f3f0; border-radius: 8px; border-left: 4px solid #4a90a4;">${question}</p>`;
    questionModal.style.display = 'block';
}

function closeQuestion() {
    const questionModal = document.getElementById("questionModal");
    questionModal.style.display = 'none';
}
