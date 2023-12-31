import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import { 
  createNewContact,
  getContacts
} from '../../store/slices/contactSlice';
import './ContactList.css';
import { createEmptyContact } from '../../model/constants'

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((store) => store.contacts);

  useEffect(() => {
   dispatch(getContacts())  
  }, [dispatch])
  
  // function createNewContact() {
  //    return createEmptyContact()
  //  }

    return (
    <div className='list-container'>
        {contacts.map(contact => {
          return(
            <ContactItem
              key={contact.id}
              contact={contact}/>
        )})}
           <button 
               onClick={() => dispatch(createNewContact())}
               className='new'>New</button>
    </div>
  )}
     

export default ContactList;