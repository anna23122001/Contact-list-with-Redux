import React, { useEffect, useState } from 'react';

import api from './contact-service';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';

import './App.css';

function App() {
  const [contacts, setContacts] = useState([])
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact())

  function createEmptyContact(){
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone:'',
    }
  };

  useEffect (() => {
    api.get('/')
    .then(({data}) => {
      data ? setContacts(data) :
      setContacts([])
    })
  }, [])

  function createContact(contact) {
    api.post('/', contact)
    .then(({data}) => {
      const newContacts = [...contacts, data]
      setContacts(newContacts);
    })
  };

  function deleteContact(id) {
    api.delete(`/${id}`)
    .then(({status}) => {
      return status
    })
    .catch((e) => console.log(e))
    const newContacts = contacts.filter((contact) => contact.id !== id)
    setContacts(newContacts);
  };
  
  function addNewContact() {
    setContactForEdit(createEmptyContact)
  };

  function selectContact(contact){
    setContactForEdit(contact)
  };

  function updateContact(contact) {
      api.put(`/${contact.id}`, contact)
      .then(({data}) => {
        setContacts(
          contacts.map((item) => (item.id !== contact.id ? item : data))
          );
      })
      setContactForEdit(createEmptyContact());
  };

  function saveContact(contact){
    if (!contact.id) {
      createContact(contact);
    }else{
      updateContact(contact)
    }
  };

  return (
    <>
     <h1>Contact List</h1>
     <div className="main-container">
      <ContactList 
      contacts={contacts}
      onDelete={deleteContact}
      onAddContact = {addNewContact}
      onEditContact={selectContact}
      />
      <ContactForm
      contactForEdit={contactForEdit}
      onSubmit={saveContact}
      onDelete={deleteContact}
      />
    </div>
    </>
   
  );
}

export default App;
