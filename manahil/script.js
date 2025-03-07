  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail,} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDFOYhJda2FOCUdQVBlqp2gvnRjZYHeMQE",
    authDomain: "sign-up-3b725.firebaseapp.com",
    projectId: "sign-up-3b725",
    storageBucket: "sign-up-3b725.firebasestorage.app",
    messagingSenderId: "278667485871",
    appId: "1:278667485871:web:afd1ff12960181fb11ea5a",
    measurementId: "G-L0EFG54WSM"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  document.getElementById("signup-btn")?.addEventListener('click' ,(e) =>{
    e.preventDefault();
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    //the below is predefined firebase ka function amd also add its import link
    createUserWithEmailAndPassword(auth , email , password)
    .then( () =>{
        alert("Sign-Up successfully!!");
        window.location.href = "welcome.html";
    })
    .catch((error) =>{
        alert("error.message");
    });
  });

  document.getElementById("login-btn")?.addEventListener('click' ,(e) =>{
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    signInWithEmailAndPassword(auth , email, password)
    .then(() =>{
        alert("Login successfully!!");
        window.location.href = "welcome.html";
    })
    .catch((error) =>{
        alert("error.message");
    });
  });

  //code for google auth
  document.getElementById("google-btn")?.addEventListener('click' , ()=>{
    signInWithPopup(auth , provider)
    .then(()=>{
        alert("Login successfully!!");
        window.location.href = "welcome.html";
    })
    .catch((error) =>{
        alert(error.message);
    });
  });

  // Logout 
  document.getElementById("logout-btn")?.addEventListener("click", () => {   
    signOut(auth)     
    .then(() => {       
        alert("Logged Out Successfully!");       
        window.location.href = "index.html";     
    })     
    .catch((error) => {       
        alert(error.message); 
        //koi bhi error hota hai to .catch us error ko catch kart hai or user tak readeable form mien puhanchata haii    
    }); 
}); 

//reset password
document.getElementById("reset-password-link")?.addEventListener("click" , (e)=>{
    e.preventDefault();
    let email = prompt("Enter your email!");

    if(email){
        sendPasswordResetEmail(auth , email)
        .then(() => {
            alert('Please Password reset email send, Check Your Inbox')
        })
        .catch((error) =>{
            alert(error.message)
        })
    }
    else {
        alert ('Please enter a valid email')
    }
})



onAuthStateChanged(auth , (user)=> {
    if(user && window.location.pathname.includes("welcome.html")){
        document.getElementById("user-email").textContent = user.email;
    }else if (!user && window.location.pathname.includes("welcome.html")) {
        window.location.href = "index.html";
    }
});
  