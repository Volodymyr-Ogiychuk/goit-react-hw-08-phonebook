import { createSlice } from '@reduxjs/toolkit';
import { getContacts, addContact, deleteContacts } from './contactsOperations';

const handlePending = state => {
  state.contacts.isLoading = true;
};

function isRejectedAction(action) {
  return action.type.endsWith('rejected');
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    makeFilter(state, action) { 
      return { ...state, filter: action.payload };
    },
  },
  extraReducers:
  builder => {
      builder
        .addCase(getContacts.pending, handlePending)
        .addCase(getContacts.fulfilled, ({ contacts }, action) => {
          contacts.items = action.payload;
          contacts.isLoading = false;
        })
        .addCase(addContact.pending, handlePending)
        .addCase(addContact.fulfilled, ({ contacts }, action) => {
          contacts.items.push(action.payload);
          contacts.isLoading = false;
        })
        .addCase(deleteContacts.pending, handlePending)
        .addCase(deleteContacts.fulfilled, ({ contacts }, action) => {
          const index = contacts.items.findIndex(
            task => task.id === action.payload.id
          );
          contacts.items.splice(index, 1);
          contacts.isLoading = false;
        })
        .addMatcher(
          isRejectedAction,
          (state, action) => {
            console.log('reject');
            state.contacts.isLoading = false;
            state.contacts.error = action.payload;
          }
        );
    },
});

export const { makeFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;