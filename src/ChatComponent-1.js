



//import firebase from 'firebase/app';
//import 'firebase/firestore';
import './Chat.css'

import { projectFirestore, timestamp } from './firebase/config';
//import { useFirestore } from './hooks/useFirestore';
import { useState, useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthContext } from './hooks/useAuthContext';
//import { useCollection } from './hooks/useCollection';

export default function ChatBox() {
  //const firestore = firebase.firestore();
  const { user } = useAuthContext()
  const dummy = useRef()
  // reference a firestore collection(table)
  const messagesRef = projectFirestore.collection('messages')
  //query documents in a collection
  const query = messagesRef.orderBy('createdAt').limit(25);
  //listen to data with a hook
  const [messages] = useCollectionData(query, {idField: 'id'});
  //console.log(messages)
  const [formValue, setFormValue] = useState('');


//const {messages, error} = useCollection('messages', orderBy)

  function ChatMessage(props) {
    const { user } = useAuthContext()
  
    const { text, uid, photoURL } = props.message
    const messageClass = uid === user.uid ? 'sent' : 'received';
  
    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt='avatar' />
        <p>{text}</p>
      </div>
    )
  }

  const sendMessage = async (e) => {  
    e.preventDefault();
    const { uid, photoURL } = user;

    // create new document in firestore 
    await messagesRef.add({
      text: formValue, 
      createdAt: timestamp.fromDate(new Date()),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  // loop over each document
   // write value to firestore
  // bind state to form input

  return (
    <div className='chatbox'>
    <main className='chat-messages'>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    <div ref={dummy} ></div>
    </main>

    <form className='add-message' onSubmit={sendMessage}>
      
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
      <button type="submit">Send</button>
    </form>
    </div>
  )
}


