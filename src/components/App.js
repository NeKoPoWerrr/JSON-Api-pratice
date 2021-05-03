import React,{ useEffect, useState} from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import {uuid as v4} from 'uuidv4';

const App = () => {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "Jason",
      email: "123@gmail.com",
    },
    {
      id: "2",
      name: "Mike",
      email: "456@gmail.com",
    }
  ]
  )
  const addContactHandler = (contact) =>{
    setContacts([...contacts, {id: v4(), ...contact}]);
  }

  const removeContactHandler = (id) =>{
    const newContactList = contacts.filter((contact)=>{
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  useEffect(()=> {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  },[]);
  
    
  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]);
  
  return (
      <div className ="ui container">
        <Header />
        <AddContact addContactHandler={addContactHandler}/>
        <ContactList contacts={contacts} getContactId={removeContactHandler}/>
      </div>
  );
}

export default App;
