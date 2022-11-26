import { useState } from "react";
import s from './ContactForm.module.css';
import { addContact } from '../redux/contactsOperations'; 
import { useSelector, useDispatch } from 'react-redux';
import { getContactItems } from '../redux/selectors';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const dispatch = useDispatch();
    const contactsItems = useSelector(getContactItems);

    const handleSubmit = event => {
        event.preventDefault();
        if (contactsItems.find(contact => contact.name === name)) {
            alert((`${name} is already in contacts`));
            return;
        }
        dispatch(addContact({ name, number: number }));
        setName('');
        setNumber('');   
    }

    const handleChange = event => {
        const { name, value } = event.target;
        switch (name) {
            case "name": 
                setName(value);
                break;
            case "number":
                setNumber(value);
                break;
            default: return;
        };

    }

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <label className={s.label} >Name</label>
            <input className={s.input}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required
                value={name}
                onChange={handleChange}
            />
            <label className={s.label}>Number</label>
            <input
                className={s.input}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={handleChange}
            />
            <button className={s.btnSubmit} type="submit">Add contact</button>
        </form>
    );
    };

export default ContactForm;

