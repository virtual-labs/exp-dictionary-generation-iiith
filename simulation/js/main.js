let exp7Corpus = {}; // Global variable to store the JSON data
let currentMeanings = []; // Store meanings for the selected word
let currentAssignments = []; // Store assignments for the selected word

// Mock data for testing
function loadMockData() {
    exp7Corpus = {
        english: {
            bank: {
                Words: [
                    { POS: "noun", Meaning: "sloping land" },
                    { POS: "noun", Meaning: "financial institution" },
                    { POS: "verb", Meaning: "tip laterally" },
                    { POS: "verb", Meaning: "put into a bank account" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "The river bank" },
                    { Answer: 1, Sentence: "Dam is situated near bank" },
                    { Answer: 2, Sentence: "Bank of India" },
                    { Answer: 2, Sentence: "A thief robbed a bank" }
                ]
            },
            book: {
                Words: [
                    { POS: "noun", Meaning: "a written work or composition that has been published" },
                    { POS: "verb", Meaning: "engage for a performance" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "The red book" },
                    { Answer: 2, Sentence: "Book a flight" }
                ]
            },
            bright: {
                Words: [
                    { POS: "adjective", Meaning: "giving off lots of light" },
                    { POS: "adjective", Meaning: "intelligent or clever" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "The sun is very bright today" },
                    { Answer: 2, Sentence: "She is a bright student" }
                ]
            },
            google: {
                Words: [
                    { POS: "noun", Meaning: "a popular search engine" },
                    { POS: "verb", Meaning: "to search for information on the internet" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "Google is a tech giant" },
                    { Answer: 2, Sentence: "I googled the recipe for pasta" }
                ]
            },
            table: {
                Words: [
                    { POS: "noun", Meaning: "a set of data arranged in rows and columns" },
                    { POS: "noun", Meaning: "a piece of furniture with a flat top and legs" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "Refer to Table 1 for details" },
                    { Answer: 2, Sentence: "The book is on the table" }
                ]
            }
        },
        hindi: {
            सोना: {
                Words: [
                    { POS: "noun", Meaning: "gold" },
                    { POS: "verb", Meaning: "sleep" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "सोना एक कीमती धातु है।" }, // "Gold is a precious metal."
                    { Answer: 2, Sentence: "मैं सोने जा रहा हूँ।" }   // "I am going to sleep."
                ]
            },
            पानी: {
                Words: [
                    { POS: "noun", Meaning: "water" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "पानी जीवन के लिए आवश्यक है।" } // "Water is essential for life."
                ]
            },
            किताब: {
                Words: [
                    { POS: "noun", Meaning: "book" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "यह किताब बहुत रोचक है।" } // "This book is very interesting."
                ]
            },
            कर: {
                Words: [
                    { POS: "noun", Meaning: "tax" },
                    { POS: "verb", Meaning: "do" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "सरकार ने नया कर लगाया।" }, // "The government imposed a new tax."
                    { Answer: 2, Sentence: "अपना काम कर।" }           // "Do your work."
                ]
            },
            किनारा: {
                Words: [
                    { POS: "noun", Meaning: "shore" },
                    { POS: "noun", Meaning: "edge" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "नदी का किनारा बहुत सुंदर है।" }, // "The river shore is very beautiful."
                    { Answer: 2, Sentence: "कागज का किनारा फटा हुआ है।" }   // "The edge of the paper is torn."
                ]
            },
            कृष्ण: {
                Words: [
                    { POS: "noun", Meaning: "Lord Krishna" },
                    { POS: "adjective", Meaning: "dark" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "कृष्ण भगवान विष्णु के अवतार हैं।" }, // "Krishna is an avatar of Lord Vishnu."
                    { Answer: 2, Sentence: "आकाश में कृष्ण बादल छाए हुए हैं।" }   // "Dark clouds are covering the sky."
                ]
            },
            दास: {
                Words: [
                    { POS: "noun", Meaning: "servant" },
                    { POS: "noun", Meaning: "devotee" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "दास ने राजा की सेवा की।" }, // "The servant served the king."
                    { Answer: 2, Sentence: "मैं भगवान का दास हूँ।" }   // "I am a devotee of God."
                ]
            },
            बाल: {
                Words: [
                    { POS: "noun", Meaning: "hair" },
                    { POS: "noun", Meaning: "child" }
                ],
                Sentences: [
                    { Answer: 1, Sentence: "उसके बाल बहुत लंबे हैं।" }, // "Her hair is very long."
                    { Answer: 2, Sentence: "बाल खेल के मैदान में खेल रहे हैं।" } // "The children are playing in the field."
                ]
            }
        }
    };
    console.log("Mock data loaded:", exp7Corpus);
}

// Load words for the selected language
function loadWords() {
    const language = document.getElementById("language").value; // Get selected language
    const wordDropdown = document.getElementById("word"); // Get word dropdown element
    const assignmentDiv = document.getElementById("assignment-section"); // Get assignment section div
    const dictionaryDetailsDiv = document.getElementById("dictionary-details"); // Get dictionary details div

    // Clear existing options and reset related sections
    wordDropdown.innerHTML = '<option value="">--Select Word--</option>';
    assignmentDiv.innerHTML = ""; // Clear assignments
    dictionaryDetailsDiv.innerHTML = ""; // Clear dictionary details
    document.getElementById("start-assignment").disabled = true; // Disable the Start Assignment button

    // Check if the selected language exists in exp7Corpus
    if (language && exp7Corpus[language]) {
        Object.keys(exp7Corpus[language]).forEach((word) => {
            const option = document.createElement("option");
            option.value = word;
            option.textContent = word;
            wordDropdown.appendChild(option);
        });
    }
}

// Load details for the selected word
function loadWordDetails() {
    const language = document.getElementById("language").value; // Get selected language
    const word = document.getElementById("word").value; // Get selected word
    const detailsDiv = document.getElementById("dictionary-details"); // Get dictionary details div
    const assignmentDiv = document.getElementById("assignment-section"); // Get assignment section div

    // Clear existing content
    detailsDiv.innerHTML = "";
    assignmentDiv.innerHTML = ""; // Clear assignments
    document.getElementById("start-assignment").disabled = true; // Disable the Start Assignment button

    if (language && word && exp7Corpus[language][word]) {
        const wordData = exp7Corpus[language][word];
        const posOptions = [...new Set(wordData.Words.map((item) => item.POS))];
        currentMeanings = wordData.Words;

        // Load POS options
        loadPOSOptions(posOptions);

        // Display all meanings initially
        displayMeanings(wordData.Words);

        // Enable the "Start Assignment" button
        document.getElementById("start-assignment").disabled = false;
    }
}

// Load POS options dynamically
function loadPOSOptions(posOptions) {
    const posDropdown = document.getElementById("pos-options"); // Get POS dropdown element

    // Clear existing options
    posDropdown.innerHTML = '<option value="">--Select POS--</option>';

    posOptions.forEach((pos) => {
        const option = document.createElement("option");
        option.value = pos;
        option.textContent = pos;
        posDropdown.appendChild(option);
    });

    // Add event listener for POS selection
    posDropdown.addEventListener("change", filterMeaningsByPOS);
}

// Display meanings based on POS
function displayMeanings(meanings) {
    const detailsDiv = document.getElementById("dictionary-details"); // Get dictionary details div

    // Clear existing content
    detailsDiv.innerHTML = "";

    const meaningsList = document.createElement("ul");

    meanings.forEach(({ POS, Meaning }, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. (${POS}) ${Meaning}`;
        meaningsList.appendChild(listItem);
    });

    detailsDiv.appendChild(meaningsList);
}

// Filter meanings by selected POS
function filterMeaningsByPOS() {
    const selectedPOS = document.getElementById("pos-options").value; // Get selected POS

    if (selectedPOS) {
        const filteredMeanings = currentMeanings.filter((item) => item.POS === selectedPOS);
        displayMeanings(filteredMeanings);
    } else {
        // If no POS is selected, display all meanings
        displayMeanings(currentMeanings);
    }
}

// Start the assignment for the selected word
function startAssignment() {
    const word = document.getElementById("word").value; // Get selected word
    const assignmentDiv = document.getElementById("assignment-section"); // Get assignment section div

    // Clear existing content
    assignmentDiv.innerHTML = "";
    currentAssignments = []; // Reset current assignments

    const language = document.getElementById("language").value; // Get selected language

    if (word && language && exp7Corpus[language] && exp7Corpus[language][word]) {
        const assignments = exp7Corpus[language][word].Sentences;
        currentAssignments = assignments; // Store assignments for evaluation

        // Display the assignment questions
        displayAssignments(assignments);
    }
}

// Display assignment questions
function displayAssignments(assignments) {
    const assignmentDiv = document.getElementById("assignment-section"); // Get assignment section div

    // Clear existing content
    assignmentDiv.innerHTML = "";

    assignments.forEach(({ Sentence }, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "assignment-question";

        const questionText = document.createElement("p");
        questionText.textContent = `${index + 1}. ${Sentence}`;

        // Create input field for answers
        const inputField = document.createElement("input");
        inputField.type = "number"; // Restrict input to numbers only
        inputField.min = "1"; // Optional: Set minimum value
        inputField.step = "1"; // Optional: Allow only whole numbers
        inputField.placeholder = "Enter Sense ID"; // Display placeholder text
        inputField.dataset.index = index; // Store the question index for evaluation

        // Create a span for error messages
        const errorMessage = document.createElement("span");
        errorMessage.style.color = "red"; // Set error message color
        errorMessage.style.display = "none"; // Hide error message initially
        errorMessage.textContent = "Wrong Input";

        // Add input validation
        inputField.addEventListener("input", () => {
            if (isNaN(inputField.value) || inputField.value.trim() === "") {
                inputField.style.borderColor = "red"; // Highlight input field in red
                errorMessage.style.display = "block"; // Show error message
            } else {
                inputField.style.borderColor = ""; // Reset input field border
                errorMessage.style.display = "none"; // Hide error message
            }
        });

        questionDiv.appendChild(questionText);
        questionDiv.appendChild(inputField);
        questionDiv.appendChild(errorMessage);
        assignmentDiv.appendChild(questionDiv);
    });

    // Add a submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Assignment";
    submitButton.onclick = evaluateAssignment;
    assignmentDiv.appendChild(submitButton);
}

// Evaluate the assignment
function evaluateAssignment() {
    const inputs = document.querySelectorAll("#assignment-section input");
    let score = 0;

    inputs.forEach((input) => {
        const userAnswer = parseInt(input.value, 10);
        const index = parseInt(input.dataset.index, 10);
        const correctAnswer = currentAssignments[index]?.Answer;

        if (userAnswer === correctAnswer) {
            score++;
        }
    });

    alert(`You scored ${score}/${inputs.length}`);
}

// Load mock data and initialize the page
document.addEventListener("DOMContentLoaded", () => {
    loadMockData();
    loadWords();
});

