import React from 'react';

import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';

import './App.css';

function App() {
  return (
    <>
     <h1>Contact List</h1>
     <div className="main-container">
      <ContactList />
      <ContactForm />
    </div>
    </>
   
  );
}

export default App;
