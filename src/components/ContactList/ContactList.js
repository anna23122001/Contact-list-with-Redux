import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import api from '../../contact-service';
import { 
  addNewContact,
  getContacts
} from '../../store/actions/actions';
import './ContactList.css';


function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((store) => store.contacts);

  useEffect(() => {
    api.get('/')
    .then(({data}) => dispatch(getContacts(data)))
  }, [dispatch])

    return (
    <div className='list-container'>
        {contacts.map(contact => {
          return(
            <ContactItem
              key={contact.id}
              contact={contact}/>
        )})}
           <button 
               onClick={() => dispatch(addNewContact())}
               className='new'>New</button>
    </div>
  )}
     

export default ContactList;