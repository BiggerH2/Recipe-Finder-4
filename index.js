// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-hIKoWx0OUm4VcQBrRwH_-ObCVqwzHts",
  authDomain: "recipe-finder-68058.firebaseapp.com",
  projectId: "recipe-finder-68058",
  storageBucket: "recipe-finder-68058.appspot.com",
  messagingSenderId: "825131867923",
  appId: "1:825131867923:web:df336aa059788aa6eb04e6",
  measurementId: "G-K98R5B57YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(); 

// Function to fetch recipes from API
async function fetchRecipes(ingredients) {
    try {
        const response = await fetch(`https://api.edamam.com/search?q=${encodeURIComponent(ingredients)}&app_id=4c456034&app_key=65b702355251608e46884041beb2cef8`);
        const data = await response.json();
        return data.hits.map(hit => hit.recipe);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Function to display recipes
function displayRecipes(recipes) {
    const recipeResults = document.getElementById('recipe-results');
    recipeResults.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const title = document.createElement('h3');
        title.textContent = recipe.label;

        const ingredients = document.createElement('p');
        ingredients.textContent = 'Ingredients: ' + recipe.ingredientLines.join(', ');

        const instructions = document.createElement('p');
        instructions.innerHTML = `Instructions: <a href="${recipe.url}" target="_blank">View Recipe</a>;`;

        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.label;

        recipeCard.appendChild(title);
        recipeCard.appendChild(ingredients);
        recipeCard.appendChild(instructions);
        recipeCard.appendChild(image);

        recipeResults.appendChild(recipeCard);
    });
}

// Event listener for search button
async function searchButtonHandler() {
    const ingredients = document.getElementById('ingredient-input').value.toLowerCase();
    const recipes = await fetchRecipes(ingredients);
    displayRecipes(recipes);
}

// Add event listener for the search button
document.getElementById('search-button').addEventListener('click', searchButtonHandler);

// Event listener for login form submission
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
    } catch (error) {
        console.error('Error signing in:', error.message);
    }
});
