import React from 'react'
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.css'


function ContactList({contacts, onDelete, onAddContact, onEditContact}) {
  return (
    <div className='list-container'>
      {contacts.map(contact => {
        return(
           <ContactItem
            key={contact.id}
            contact={contact}
            onAddContact={onAddContact}
            onDelete={onDelete}
            onEdit={onEditContact}
        />
        )
      })}
           <button 
               onClick={onAddContact}
               className='new'>New</button>
    </div>
  )}

export default ContactList