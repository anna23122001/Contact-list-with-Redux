import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, selectContact } from '../../store/slices/contactSlice'
import './ContactItem.css';

function ContactItem({contact }) {
  const dispatch = useDispatch();

  function onContactDelete() {
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