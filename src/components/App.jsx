import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm.jsx';
import { Filter } from 'components/Filter/Filter.jsx';
import { ContactList } from 'components/ContactList/ContactList.jsx';

export const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) ?? [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const changeFilter = e => {
    const { value } = e.target;
    setFilter(value);
  }

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    }

    const findContact = contacts.find(item => item.name === name);
    if (findContact) {
      alert(findContact.name + " is already in contacts.")
      return;
    }

    setContacts(prevState => [newContact, ...prevState]);
  }

  const deleteContact = e => {
    setContacts(contacts.filter(contact => contact.id !== e));
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  return <div
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
      color: '#010101',
    }}
  >
    <h1>Phonebook</h1>
    <ContactForm onSubmit={addContact} />
    <h1>Contacts</h1>
    <Filter
      filter={filter}
      onChange={changeFilter} />
    <ContactList
      contacts={getVisibleContacts()}
      deleteContact={deleteContact} />
  </div >
};
