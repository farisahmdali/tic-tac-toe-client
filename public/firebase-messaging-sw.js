"use client"
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyC-yByDGOtQdJmcVgovgh9l-0H-xRyjGgQ",
    authDomain: "tic-tac-toe-ee2b1.firebaseapp.com",
    projectId: "tic-tac-toe-ee2b1",
    storageBucket: "tic-tac-toe-ee2b1.appspot.com",
    messagingSenderId: "167887642006",
    appId: "1:167887642006:web:9c685ef79cc33aa53151b7",
    measurementId: "G-4305T2Q9Z9"
  };
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();



messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self?.registration.showNotification(notificationTitle, notificationOptions); 
});


