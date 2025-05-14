document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("user-input");
  const checkBtn = document.getElementById("check-btn");
  const clearBtn = document.getElementById("clear-btn");
  const resultsDiv = document.getElementById("results-div");

  // Regex to validate US phone numbers based on provided formats
  // ^                   matches the beginning of the string
  // (1\s?)?             matches an optional "1" followed by an optional space (country code)
  // (\(\d{3}\)|\d{3})   matches either 3 digits in parentheses e.g., (555) OR 3 digits without e.g., 555 (area code)
  // [\s\-]?             matches an optional space or hyphen separator
  // \d{3}               matches exactly 3 digits (first part of local number)
  // [\s\-]?             matches an optional space or hyphen separator
  // \d{4}               matches exactly 4 digits (second part of local number)
  // $                   matches the end of the string
  const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

  checkBtn.addEventListener("click", () => {
    const phoneNumber = userInput.value.trim(); // Trim whitespace from input

    // Reset results-div classes and content
    resultsDiv.className = "";
    resultsDiv.textContent = "";

    if (phoneNumber === "") {
      alert("Please provide a phone number");
      return;
    }

    if (phoneRegex.test(phoneNumber)) {
      resultsDiv.textContent = `Valid US number: ${phoneNumber}`;
      resultsDiv.classList.add("valid");
    } else {
      resultsDiv.textContent = `Invalid US number: ${phoneNumber}`;
      resultsDiv.classList.add("invalid");
    }
  });

  clearBtn.addEventListener("click", () => {
    resultsDiv.textContent = "";
    userInput.value = "";
    resultsDiv.className = ""; // Reset class
  });

  // Optional: Allow Enter key to trigger check button
  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      checkBtn.click();
    }
  });
});
