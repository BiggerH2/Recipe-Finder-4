"use strict";

var _firebaseApp = require("https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js");

var _firebaseAnalytics = require("https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js");

var _firebaseAuth = require("https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js");

// Import Firebase modules
// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB-hIKoWx0OUm4VcQBrRwH_-ObCVqwzHts",
  authDomain: "recipe-finder-68058.firebaseapp.com",
  projectId: "recipe-finder-68058",
  storageBucket: "recipe-finder-68058.appspot.com",
  messagingSenderId: "825131867923",
  appId: "1:825131867923:web:df336aa059788aa6eb04e6",
  measurementId: "G-K98R5B57YJ"
}; // Initialize Firebase

var app = (0, _firebaseApp.initializeApp)(firebaseConfig);
var analytics = (0, _firebaseAnalytics.getAnalytics)(app);
var auth = (0, _firebaseAuth.getAuth)(); // Function to fetch recipes

function fetchRecipes(ingredients) {
  var response, data;
  return regeneratorRuntime.async(function fetchRecipes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://api.edamam.com/search?q=".concat(encodeURIComponent(ingredients), "&app_id=4c456034&app_key=65b702355251608e46884041beb2cef8")));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          return _context.abrupt("return", data.hits.map(function (hit) {
            return hit.recipe;
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching recipes:', _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
} // Function to display recipes


function displayRecipes(recipes) {
  var recipeResults = document.getElementById('recipe-results');
  recipeResults.innerHTML = '';
  recipes.forEach(function (recipe) {
    var recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    var title = document.createElement('h3');
    title.textContent = recipe.label;
    var ingredients = document.createElement('p');
    ingredients.textContent = 'Ingredients: ' + recipe.ingredientLines.join(', ');
    var instructions = document.createElement('p');
    instructions.innerHTML = "Instructions: <a href=\"".concat(recipe.url, "\" target=\"_blank\">View Recipe</a>;");
    var image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.label;
    recipeCard.appendChild(title);
    recipeCard.appendChild(ingredients);
    recipeCard.appendChild(instructions);
    recipeCard.appendChild(image);
    recipeResults.appendChild(recipeCard);
  });
} // Event listener for search button


function searchButtonHandler() {
  var ingredients, recipes;
  return regeneratorRuntime.async(function searchButtonHandler$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ingredients = document.getElementById('ingredient-input').value.toLowerCase();
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetchRecipes(ingredients));

        case 3:
          recipes = _context2.sent;
          displayRecipes(recipes);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
} // Add event listener for the search button


document.getElementById('search-button').addEventListener('click', searchButtonHandler); // Event listener for login form submission

document.getElementById('login-form').addEventListener('submit', function _callee(event) {
  var email, password, userCredential;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          event.preventDefault();
          email = document.getElementById('email').value;
          password = document.getElementById('password').value;
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap((0, _firebaseAuth.signInWithEmailAndPassword)(auth, email, password));

        case 6:
          userCredential = _context3.sent;
          console.log('User signed in:', userCredential.user);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](3);
          console.error('Error signing in:', _context3.t0.message);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 10]]);
});