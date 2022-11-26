import s from './ContactList.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts } from '../redux/contactsOperations';
import { getContactsState } from '../redux/selectors';

// const ContactList = () => {
//     const {
//         contacts: { items, isLoading, error },
//         filter: filterValue,
//             } = useSelector(getContactsState);
//     const dispatch = useDispatch();
//     // const { items } = useSelector(state => state.contacts)
//     // const filterValue = useSelector(state => state.filter);
//     const visibleContacts = items.filter(contact =>
//     contact.name.toLowerCase().includes(filterValue.toLowerCase())
//     );

  const ContactList = () => {
  const {
    contacts: { items },
    filter: filterValue,
  } = useSelector(getContactsState);
  const dispatch = useDispatch();
      const visibleContacts = items.filter(contact =>
          contact.name.toLowerCase().includes(filterValue.toLowerCase())
      );

    
      return (
    
    <ul className={s.list}>
        {visibleContacts.map(({ id, name, number}) => (
            <li key={id} className={s.listItem} >
                <p>{name}: {number}</p>
                <button className={s.btnDelete} type="button" onClick={() => dispatch(deleteContacts(id))}>Delete</button>
            </li>                
        ))}

    </ul>
)};

export default ContactList;