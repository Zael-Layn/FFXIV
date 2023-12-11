import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore, query, getDocs } from "firebase/firestore";
import * as firebaseui from "firebaseui";

const firebaseConfig = {
  apiKey: "AIzaSyBY7_GPppYAcruueYG7ZpOba4QEMbfbJSE",
  authDomain: "ffxiv-d569e.firebaseapp.com",
  projectId: "ffxiv-d569e",
  storageBucket: "ffxiv-d569e.appspot.com",
  messagingSenderId: "717526266838",
  appId: "1:717526266838:web:3e875787f79497115caa77",
  measurementId: "G-4SXEV2M1ML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

onAuthStateChanged(auth, (user) => {
  // Check for user status
  // console.log(user);
  if (user) {
    console.log("User log in: ", user.email);
    getTasks(db).then((snapshot) => {
      setupTasks(snapshot);
    });

    setupUI(user);
    
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      addDoc(collection(db, "tasks"), {
        title: form.title.value,
        description: form.description.value,
      })
      .then(() => {
        console.log("Task added successfully");
        form.title.value = "";
        form.description.value = "";
      })
      .catch((error) => console.log("Error adding task:", error));
    });
  } else {
    // console.log("User Logged out");
    setupUI();
    setupTasks([]);
  }
});

//signup
const signupForm = document.querySelector("#signup-form");
// const auth = getAuth(app);
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

    });
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      //close the login modal and reset the form
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      console.log("user has signed out");
    })
    .catch((error) => {
      // An error happened.
    });
});

function getTasks(db) {
  const tasksRef = collection(db, "tasks");
  const queryRef = query(tasksRef);
  return getDocs(queryRef);
}

function setupTasks(snapshot) {
  // Process and display tasks from the snapshot
}

function setupUI(user) {
  // Update UI based on user authentication state
}


