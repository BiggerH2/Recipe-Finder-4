// Firebase configuration
// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to handle login submission
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Sign in user with email and password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('User signed in:', userCredential.user);
                // Optionally, redirect user or perform additional actions after successful login
            })
            .catch(error => {
                console.error('Error signing in:', error);
                // Display error message or take appropriate action
            });
    } catch (error) {
        console.error('Error signing in:', error);
        // Display error message or take appropriate action
    }
}

// Function to handle registration submission
function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Create user with email and password
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('User registered:', userCredential.user);
                // Optionally, redirect user or perform additional actions after successful registration
            })
            .catch(error => {
                console.error('Error registering user:', error);
                // Display error message or take appropriate action
            });
    } catch (error) {
        console.error('Error registering user:', error);
        // Display error message or take appropriate action
    }
}
