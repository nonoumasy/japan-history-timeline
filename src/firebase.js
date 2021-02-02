import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCYdnZEvg-qZdPWib9B_PUisaaiofhqOYc",
    authDomain: "storymap-e263a.firebaseapp.com",
    projectId: "storymap-e263a",
    storageBucket: "storymap-e263a.appspot.com",
    messagingSenderId: "746781011485",
    appId: "1:746781011485:web:8421bcbf78d021ac8c60f4"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase