document.addEventListener("DOMContentLoaded", () => {
    const greeting = document.createElement('p');
    greeting.textContent = "Hello! Thanks for visiting our website.";
    document.querySelector('main').appendChild(greeting);
});
