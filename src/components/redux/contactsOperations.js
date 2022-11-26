import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://637bb3b272f3ce38ea93247e.mockapi.io';

export const getContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {const response = await axios.get('/contacts');
            return response.data;    
        }   catch (e) {
            return thunkAPI.rejectedWithValue(e.message);
        } 
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContacts',
    async (contactData, thunkAPI) => {
        try {const response = await axios.post('/contacts', contactData);
            return response.data;
        }   catch (e) {
            return thunkAPI.rejectedWithValue(e.message);
        }
    }
);

export const deleteContacts = createAsyncThunk(
    'contacts/deleteContacts',
    async (contactId, thunkAPI) => {
        try {const response = await axios.delete(`/contacts/${contactId}`);
            return response.data;
        }   catch (e) {
            return thunkAPI.rejectedWithValue(e.message);
        }
    }
)