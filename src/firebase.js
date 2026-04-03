import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCqDcJRhmvFbD9ACMbhTMHxB005mPj4yhQ",
  authDomain: "life-support-b1449.firebaseapp.com",
  projectId: "life-support-b1449",
  storageBucket: "life-support-b1449.firebasestorage.app",
  messagingSenderId: "768923759080",
  appId: "1:768923759080:web:b3d83a2054cd00abdcb45d"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)