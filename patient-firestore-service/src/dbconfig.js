const firebase = require("firebase");
require("firebase/firestore");

// Initialize Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyD62yJ_XNMLY82DYCBVXMmkmyRA8SWQ9KY",
  authDomain: "cloudathon-55b93.firebaseapp.com",
  databaseURL: "https://cloudathon-55b93.firebaseio.com",
  projectId: "cloudathon-55b93",
  storageBucket: "cloudathon-55b93.appspot.com",
  messagingSenderId: "986906024336",
  appId: "1:986906024336:web:9cb149dbe6a4f14b413b15"
});

module.exports = firebase.firestore();