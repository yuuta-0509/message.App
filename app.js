// app.js
document.addEventListener("DOMContentLoaded", function() {
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
  
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
  
    sendButton.addEventListener('click', async () => {
      const message = messageInput.value;
      if (message.trim()) {
        await db.collection('messages').add({
          text: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = '';
      }
    });
  
    db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
      chatBox.innerHTML = '';
      snapshot.forEach(doc => {
        const message = document.createElement('div');
        message.textContent = doc.data().text;
        chatBox.appendChild(message);
      });
    });
  });
  