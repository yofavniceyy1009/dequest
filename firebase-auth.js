// Initialize Firebase using compat SDK loaded via <script> tags
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let unsubscribeLanguages = null;

// DOM Elements
const authForm = document.getElementById('auth-form');
const authEmailInput = document.getElementById('auth-email');
const authPasswordInput = document.getElementById('auth-password');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authError = document.getElementById('auth-error');
const authToggle = document.getElementById('auth-toggle');
const forgotPasswordLink = document.getElementById('forgot-password-link');

const authScreen = document.getElementById('auth-screen');
const appRoot = document.getElementById('app-root');
const usernameDisplay = document.getElementById('username-display');
const profileCardName = document.getElementById('profile-card-name');
const logoutBtn = document.getElementById('logout-btn');

// Progress Tracker DOM Elements
const langNameInput = document.getElementById('lang-name-input');
const langStatusInput = document.getElementById('lang-status-input');
const addLanguageBtn = document.getElementById('add-language-btn');
const myLanguagesList = document.getElementById('my-languages-list');
const noLanguagesMsg = document.getElementById('no-languages-msg');

let isRegisterMode = false;

// Handle UI mode toggle (handled mostly by app.js visually, but we need to track state)
authToggle.addEventListener('click', () => {
    isRegisterMode = !isRegisterMode;
    authError.style.display = 'none';
});

// Helper: Show Auth Error
function showError(msg) {
    authError.textContent = msg;
    authError.style.display = 'block';
}

// Handle Form Submit
authForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop default and app.js logic (if any runs)
    
    const email = authEmailInput.value.trim();
    const password = authPasswordInput.value;
    
    if (!email || !password) {
        showError('Please enter both email and password.');
        return;
    }
    
    authError.style.display = 'none';
    const originalText = authSubmitBtn.textContent;
    authSubmitBtn.textContent = 'Loading...';
    authSubmitBtn.disabled = true;

    try {
        if (isRegisterMode) {
            await auth.createUserWithEmailAndPassword(email, password);
        } else {
            try {
                await auth.signInWithEmailAndPassword(email, password);
            } catch (loginErr) {
                // If login fails, attempt auto-registration (matches old mock behavior)
                try {
                    await auth.createUserWithEmailAndPassword(email, password);
                } catch (regErr) {
                    // Throw original login error if registration fails (e.g. email exists but wrong password)
                    if (regErr.code === 'auth/email-already-in-use') {
                        throw loginErr;
                    }
                    throw regErr;
                }
            }
        }
    } catch (error) {
        console.error("Auth Error:", error);
        // Clean up Firebase error codes for users
        let msg = "Authentication failed. Please try again.";
        if (error.code === 'auth/email-already-in-use') msg = "This email is already in use.";
        if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') msg = "Incorrect email or password.";
        if (error.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";
        
        showError(msg);
    } finally {
        authSubmitBtn.textContent = originalText;
        authSubmitBtn.disabled = false;
    }
});

// Handle Forgot Password
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', async (e) => {
        e.preventDefault(); // Stop app.js logic if any
        const email = authEmailInput.value.trim();
        
        if (!email) {
            showError("Please enter your email address first, then click 'Forgot Email or Password?'.");
            return;
        }
        
        try {
            await auth.sendPasswordResetEmail(email);
            authError.style.color = '#4ade80'; // Green for success
            showError("Password reset email sent! Check your inbox.");
            setTimeout(() => { authError.style.color = '#ff4d4f'; }, 5000); // Reset color back to red for future errors
        } catch (error) {
            console.error("Reset Error:", error);
            authError.style.color = '#ff4d4f';
            showError("Failed to send reset email. Ensure the email is correct.");
        }
    });
}

// Handle Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        if (window.devQuestFirebaseLogout) window.devQuestFirebaseLogout();
    } catch (error) {
        console.error("Error signing out:", error);
    }
});

// Auth State Observer
auth.onAuthStateChanged((user) => {
    currentUser = user;
    if (user) {
        // User is logged in
        authScreen.style.display = 'none';
        appRoot.style.display = 'flex';
        
        // Display email
        if(usernameDisplay) usernameDisplay.textContent = user.email;
        if(profileCardName) profileCardName.textContent = user.email;
        
        // Bridge back to app.js to load offline privileges and mock data
        if (window.devQuestFirebaseLogin) {
            window.devQuestFirebaseLogin(user.email);
        }
        
        // Start listening to languages
        startLanguageListener(user.uid);
    } else {
        // User is logged out
        authScreen.style.display = 'flex';
        appRoot.style.display = 'none';
        authForm.reset();
        authError.style.display = 'none';
        
        // Stop listening to languages
        if (unsubscribeLanguages) {
            unsubscribeLanguages();
            unsubscribeLanguages = null;
        }
    }
});


// ==========================================
// PROGRESS TRACKER: Firestore Logic
// ==========================================

function startLanguageListener(uid) {
    unsubscribeLanguages = db.collection("users").doc(uid).collection("languages").onSnapshot((snapshot) => {
        myLanguagesList.innerHTML = '';
        
        if (snapshot.empty) {
            myLanguagesList.appendChild(noLanguagesMsg);
            noLanguagesMsg.textContent = "No languages added yet.";
            noLanguagesMsg.style.display = 'block';
            return;
        }
        
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const id = docSnap.id;
            
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.justifyContent = 'space-between';
            item.style.alignItems = 'center';
            item.style.padding = '10px';
            item.style.background = 'rgba(255,255,255,0.05)';
            item.style.borderRadius = '8px';
            
            const isCompleted = data.status === 'Completed';
            const color = isCompleted ? '#4ade80' : 'var(--primary)'; // Green or Blue
            
            item.innerHTML = `
                <div>
                    <strong style="display:block; margin-bottom: 2px;">${data.name}</strong>
                    <span style="font-size: 0.8rem; color: ${color};"><i class="fa-solid fa-circle" style="font-size: 0.6rem; margin-right: 4px;"></i>${data.status}</span>
                </div>
                <button class="btn btn-secondary delete-lang-btn" data-id="${id}" style="padding: 5px 10px; font-size: 0.8rem; color: var(--danger);"><i class="fa-solid fa-trash"></i></button>
            `;
            
            // Delete Listener
            item.querySelector('.delete-lang-btn').addEventListener('click', async (e) => {
                const langId = e.currentTarget.getAttribute('data-id');
                if(confirm('Delete this language?')) {
                    try {
                        await db.collection("users").doc(uid).collection("languages").doc(langId).delete();
                    } catch (err) {
                        console.error("Error deleting doc: ", err);
                    }
                }
            });
            
            myLanguagesList.appendChild(item);
        });
    }, (error) => {
        console.error("Error fetching languages:", error);
        noLanguagesMsg.textContent = "Failed to load languages.";
        noLanguagesMsg.style.display = 'block';
    });
}

// Add Language
addLanguageBtn.addEventListener('click', async () => {
    try {
        if (!currentUser) {
            alert("Error: You are not fully logged into Firebase.");
            return;
        }
        
        const name = langNameInput.value.trim();
        const status = langStatusInput.value;
        
        if (!name) {
            alert("Error: Please type a language name first.");
            return;
        }
        
        addLanguageBtn.disabled = true;
        addLanguageBtn.textContent = '...';
        
        await db.collection("users").doc(currentUser.uid).collection("languages").add({
            name: name,
            status: status,
            createdAt: new Date().toISOString()
        });
        
        langNameInput.value = '';
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Firebase Error: " + error.message);
    } finally {
        addLanguageBtn.disabled = false;
        addLanguageBtn.textContent = 'Add';
    }
});
