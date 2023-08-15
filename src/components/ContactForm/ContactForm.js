import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createContact, deleteContact, updateContact } from '../../store/actions/actions';
import api from '../../contact-service'
import './ContactForm.css';


function ContactForm() {
 const contactsForEdit = useSelector(store => store.contactsForEdit)
 const dispatch = useDispatch();
 const [contact, setContact] = useState(contactsForEdit);

  useEffect(() => {
    setContact(contactsForEdit);
  }, [contactsForEdit]);

  function onInputChange(event) {
    setContact((contact) => ({
      ...contact,
      [event.target.name]: event.target.value,
    }));
  }

  function onFormSubmit(event) {
    event.preventDefault();
    if (!contact.id) {
      api.post('/', contact)
      .then(({ data }) => dispatch(createContact(data)))
      .catch((e) => console.log(e))
    } else {
      api.put(`/${contact.id}`, contact)
      .then(({ data }) => dispatch(updateContact(data)))
      .catch((e) => console.log(e))
    }}

  function onClearField(event) {
    const sibling = event.target.parentNode.firstChild;
    setContact((contact) => ({
      ...contact,
      [sibling.name]: '',
    }));
  };

  function onContactDelete() {
    api.delete(`/${contact.id}`)
    .then(({status}) => {
      return status
    })
    .catch((e) => console.log(e))
    dispatch(deleteContact(contact.id));
  }
  return (
    <>
      <form className='form' onSubmit={onFormSubmit}>
        <div className='form-item-container'>
          <input
            className='input-item'
            type='text'
            name='firstName'
            value={contact.firstName}
            placeholder='Enter your name'
            onChange={onInputChange}
          />
          <span onClick={onClearField} className='input-delete'>
            X
          </span>
        </div>
        <div className='form-item-container'>
          <input
            className='input-item'
            type='text'
            name='lastName'
            value={contact.lastName}
            placeholder='Enter your surname'
            onChange={onInputChange}
          />
          <span onClick={onClearField} className='input-delete'>
            X
          </span>
        </div>

        <div className='form-item-container'>
          <input
            className='input-item'
            type='email'
            name='email'
            value={contact.email}
            placeholder='Enter your email'
            onChange={onInputChange}
          />
          <span onClick={onClearField} className='input-delete'>
            X
          </span>
        </div>

        <div className='form-item-container'>
          <input
            className='input-item'
            type='text'
            name='phone'
            value={contact.phone}
            placeholder='Enter phone number'
            onChange={onInputChange}
          />
          <span onClick={onClearField} className='input-delete'>
            X
          </span>
        </div>
        <button type='submit' className='save'>
          Save
        </button>
        {contact.id ? (
          <button
            type='button'
            className='delete'
            onClick={onContactDelete}>
            Delete
          </button>
        ) : (
          ''
        )}
      </form>
    </>
  );
}

export default ContactForm;