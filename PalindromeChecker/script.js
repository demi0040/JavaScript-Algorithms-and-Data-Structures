// script.js
document.getElementById("check-btn").addEventListener("click", function () {
    const input = document.getElementById("text-input").value.trim();

    // Check if input is empty
    if (!input) {
        alert("Please input a value");
        return;
    }

    // Clean the input by removing non-alphanumeric characters and converting to lowercase
    const cleanedInput = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    // Check if the cleaned input is a palindrome
    const isPalindrome = cleanedInput === cleanedInput.split("").reverse().join("");

    // Display the result
    const resultElement = document.getElementById("result");
    resultElement.textContent = `${input} is ${isPalindrome ? "" : "not "}a palindrome`;
});