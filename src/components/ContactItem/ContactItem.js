import React from 'react';
import { useDispatch } from 'react-redux';
import api from '../../contact-service';
import { deleteContact, selectContact } from '../../store/actions/actions'
import './ContactItem.css';

function ContactItem({contact }) {
  const dispatch = useDispatch();
  
  function onContactDelete() {
     api.delete(`/${contact.id}`)
    .then(({status}) => {
      return status
    })
    .catch((e) => console.log(e))
    dispatch(deleteContact(contact.id));
  }

  function onEditContact() {
    dispatch(selectContact(contact));
  }
  return (
    <div className='contact-item' onDoubleClick={onEditContact}>
      <p className='content'>
        {contact.firstName} {contact.lastName}
      </p>
      <span className='delete-btn' onClick={onContactDelete}>
        X
      </span>
    </div>
  );
}

export default ContactItem;