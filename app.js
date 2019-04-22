const messageDisplay = document.querySelector('#messageDisplay');
const messageSender = document.querySelector('#messageSender');

function drawChatroom(messageDoc){

    let li = document.createElement('li');
    li.setAttribute('messageID', messageDoc.id);

    let message = document.createElement('span');
    message.textContent = messageDoc.data().messageContents;

    li.appendChild(message);
    messageDisplay.appendChild(li);
}

messageSender.addEventListener('submit', (e) => {
    e.preventDefault();
    if(messageSender.messageToSend.value != ''){
        db.collection('chatroom').add({
            messageContents:messageSender.messageToSend.value
        });
    }
    messageSender.messageToSend.value = '';
})


db.collection('chatroom').onSnapshot(snapshot => {
    let updates = snapshot.docChanges();
    updates.forEach(message => {
        drawChatroom(message.doc);
    });
})
