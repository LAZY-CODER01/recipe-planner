
import React from 'react';
import { auth, db } from '../config/firebase'; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleSignInButton = () => {

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); 
    try {
     
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in with Google:", user);

      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        console.log("New user detected, creating document in Firestore...");
      
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName, 
          email: user.email,
          photoURL: user.photoURL, 
          createdAt: new Date(),
        });
        console.log("New user document created successfully.");
      } else {
        console.log("Existing user logged in.");
      }


    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    
    }
  };

  return (
    <button onClick={handleGoogleSignIn} style={{ marginTop: '10px' }}>
      Sign In with Google
    </button>
  );
};

export default GoogleSignInButton;