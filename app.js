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























//-------------------------------------------------------------
// //this cafeList holds a reference to the unordered list tag,
// //by using the query selector to find the tag by id
// const cafeList = document.querySelector('#cafe-list');
// const form = document.querySelector('#add-cafe-form');

// //create element and render cafe
// function renderCafe(doc){
//     //creating a list item object
//     let li = document.createElement('li');

//     //creating span tags 
//     let name = document.createElement('span');
//     let city = document.createElement('span');

//     //the 'X'
//     let cross = document.createElement('div');
//     cross.textContent = 'x';

//     //setting the id of the list item to the id of the firebase document
//     li.setAttribute('data-id', doc.id);

//     //get the data out of the doc
//     name.textContent = doc.data().name;
//     city.textContent = doc.data().city;

//     //append the span tags to the list item
//     li.appendChild(name);
//     li.appendChild(city);
//     li.appendChild(cross);

//     //append the list item back to the document
//     cafeList.appendChild(li);

//     //deleteing data
//     cross.addEventListener('click', (e) =>{
//         //the target is the cross clicked, the parentElement
//         //is the list item that the cross is a child of, and the
//         //getAttribute() gets the value of the data-id ATTRIBUTE
//         //that we created
//         let id = e.target.parentElement.getAttribute('data-id');
//         //the collection() points to the collection we want to
//         //reference in the firestore
//         db.collection('cafes').doc(id).delete();
//     });
// }

// //this is an asyncronous function, meaning it completes whenever
// //the .then() fires when the async completes
// // db.collection('cafes').get().then((snapshot) =>{
// //     //the snapshot contains everything in the db here.

// //     //adding the .where() acts as a query, and it accepts 3 parameters,
// //     //allowing for filtering
// //     //db.collection('cafes').where('city', '==', 'Dumpville').get().then((snapshot)

// //     //can also add orderBy() on the collection or after the where(), and pass a field

// //     //a for each loop that cycles through each document in the snapshot
// //     snapshot.docs.forEach(doc => {
// //         renderCafe(doc);
// //     });
// // })

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     //the {} inside add is an object that will represent the
//     //document we are adding to the firestore
//     db.collection('chatroom').add({
//         //the 'name' and 'city' here are the NAME ATTRIBUTES
//         //of the REFERENCED form variable. the first is a form 
//         //with a name attribute equal to 'name' for example
//         name: form.name.value,
//         city: form.city.value
//     });
//     //reset the values
//     form.name.value = '';
//     form.city.value = '';
// })

// //real time listener
// //the onSnapshot() runs whenever there is a change to the database
// db.collection('cafes').onSnapshot(snapshot =>{
//     let changes = snapshot.docChanges();
//     changes.forEach(change =>{
//         //upon first pulling from the database, all items appear as 'added' types,
//         //and only become removed types when the app is running and removed from the database
//         if(change.type == 'added'){
//             renderCafe(change.doc);
//         }
//         else if(change.type == 'removed'){
//             let li = cafeList.querySelector('[data-id=' + change.doc.id +']');
//             cafeList.removeChild(li);
//         }
//     });
// })

// //doc.set() and doc.update() can modify data. set() will completely overwrite the document
// //with the passed values, even if they dont all exist
