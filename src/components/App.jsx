import s from './app.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter.jsx';
import ContactList from './ContactList/ContactList'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "./redux/contactsOperations";
import { getContactsState } from "./redux/selectors";

const App = () => {
  const dispatch = useDispatch();
  const currentState = useSelector(getContactsState);
  const isLoading = currentState.contacts.isLoading;
  const error = currentState.contacts.error;  

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);
  
  return (
    <div>
      <h1 className={s.title}>Phonebook #6</h1>
      <ContactForm />
      <h2 className={s.title}>Contacts</h2>
      {isLoading && !error && <b>Request in progress...</b>}
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;

// https://637bb3b272f3ce38ea93247e.mockapi.io