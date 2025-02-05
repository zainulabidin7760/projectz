const firebaseConfig = {
    apiKey: "AIzaSyBcUlHornZGfa4c4T6LyiSCqkb4-hPvcpg",
    authDomain: "fir-chat-app-2f059.firebaseapp.com",
    projectId: "fir-chat-app-2f059",
    storageBucket: "fir-chat-app-2f059.firebasestorage.app",
    messagingSenderId: "963093380061",
    appId: "1:963093380061:web:ab815184eadcad2ac25434",
    measurementId: "G-TBJYCY9FFE"
  };
  
firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
const db = firebase.firestore();

// DOM elements
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");

// Sending messages to Firestore
sendButton.addEventListener("click", async () => { // Fixed typo
    const message = messageInput.value;
    if (message.trim()) {
        try {
            await db.collection("messages").add({
                text: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            messageInput.value = ''; // Clear input after sending
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
});

// Listen for messages in Firestore
db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot((querySnapshot) => {
        chatMessages.innerHTML = ''; // Clear existing messages
        querySnapshot.forEach((doc) => {
            const messageData = doc.data();
            const messageElement = document.createElement("div");
            messageElement.textContent = messageData.text;
            chatMessages.appendChild(messageElement);
        });
    });
