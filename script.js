document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("brailleInput");
    const suggestionBox = document.getElementById("suggestion");
    const keys = document.querySelectorAll(".braille-key");
    const themeToggle = document.getElementById("themeToggle");
    const clearButton = document.getElementById("clearInput");
    const outputBox = document.getElementById("brailleOutput");
    const body = document.body;

    // Initialize in dark mode
    body.classList.add("dark-mode");
    themeToggle.textContent =  "🌙 Dark Mode";

    // Keyboard button clicks
    keys.forEach(function(key) {
        key.addEventListener("click", function() {
            inputBox.value += key.dataset.key;
            updateTranslation();
            inputBox.focus();
        });
    });

    // Input handling - now allows spaces
    inputBox.addEventListener("input", function() {
        // Allow spaces but clean other invalid characters
        var brailleInput = inputBox.value.toLowerCase().replace(/[^sdfjkl ]/g, "");
        
        // Update the input with cleaned value
        if (inputBox.value !== brailleInput) {
            var cursorPos = inputBox.selectionStart;
            inputBox.value = brailleInput;
            inputBox.setSelectionRange(cursorPos, cursorPos);
        }
        
        updateTranslation();
    });

    // Clear button functionality
    clearButton.addEventListener("click", function() {
        inputBox.value = "";
        outputBox.value = "";
        suggestionBox.textContent = "None";
        inputBox.focus();
    });

    // Insert suggestion when clicked
    suggestionBox.addEventListener("click", function() {
        if (suggestionBox.textContent && suggestionBox.textContent !== "None") {
            var words = inputBox.value.split(" ");
            words[words.length - 1] = dictionary.find(w => w.text === suggestionBox.textContent)?.braille || "";
            inputBox.value = words.join(" ");
            updateTranslation();
            inputBox.focus();
        }
    });

    // Theme toggle
    themeToggle.addEventListener("click", toggleTheme);

    // Keyboard event listener for physical keyboard
    document.addEventListener("keydown", function(e) {
        // Allow spacebar (keyCode 32) along with braille keys
        var validKeys = ['s', 'd', 'f', 'j', 'k', 'l'];
        if (validKeys.includes(e.key.toLowerCase()) || e.keyCode === 32) {
            inputBox.value += e.key.toLowerCase();
            updateTranslation();
        }
    });

    function updateTranslation() {
        var brailleInput = inputBox.value.toLowerCase().replace(/[^sdfjkl ]/g, "");
        var words = brailleInput.split(" ");
        var currentWord = words[words.length - 1];
        
        // Update suggestion for current word
        updateSuggestion(currentWord);
        
        // Update output with full translation
        updateOutput(brailleInput);
    }

    function updateSuggestion(currentBrailleWord) {
        var suggestion = getSuggestion(currentBrailleWord);
        suggestionBox.textContent = suggestion || "None";
    }

    function updateOutput(fullBrailleInput) {
        var words = fullBrailleInput.split(" ");
        var translatedWords = [];
        
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (word === "") {
                translatedWords.push(""); // Maintain spaces
                continue;
            }
            var translated = getSuggestion(word) || "?";
            translatedWords.push(translated);
        }
        
        outputBox.value = translatedWords.join(" ");
    }

    function toggleTheme() {
        body.classList.toggle("dark-mode");
        var isDarkMode = body.classList.contains("dark-mode");
        themeToggle.textContent = isDarkMode ? "🌙 Dark Mode" : "🌞 Light Mode";
        localStorage.setItem("darkMode", isDarkMode);
    }

    // Check for saved theme preference
    if (localStorage.getItem("darkMode") === "false") {
        body.classList.remove("dark-mode");
        themeToggle.textContent =  "🌞 Light Mode";
    }
});

var dictionary = [
    { text: "and", braille: "sdj" },
    { text: "be", braille: "df" },
    { text: "can", braille: "sf" },
    { text: "do", braille: "dj" },
    { text: "go", braille: "sl" },
    { text: "have", braille: "dfk" },
    { text: "it", braille: "dk" },
    { text: "just", braille: "jk" },
    { text: "know", braille: "kl" },
    { text: "like", braille: "dkl" },
    { text: "more", braille: "flk" },
    { text: "not", braille: "sd" },
    { text: "on", braille: "sj" },
    { text: "people", braille: "sdf" },
    { text: "quick", braille: "jkl" },
    { text: "run", braille: "fj" },
    { text: "see", braille: "fk" },
    { text: "to", braille: "dl" },
    { text: "up", braille: "lk" },
    { text: "very", braille: "fl" },
    { text: "will", braille: "slk" },
    { text: "yes", braille: "sk" }
];

function levenshtein(a, b) {
    if (!a) return b ? b.length : 0;
    if (!b) return a.length;

    var matrix = [];
    for (var i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (var j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function getSuggestion(input) {
    if (!input || input.length === 0) return "";

    var minDist = Infinity;
    var bestMatch = '';
    
    for (var i = 0; i < dictionary.length; i++) {
        var word = dictionary[i];
        var dist = levenshtein(input, word.braille);
        if (dist < minDist) {
            minDist = dist;
            bestMatch = word.text;
        }
    }
    
    return minDist <= 2 ? bestMatch : "";
}