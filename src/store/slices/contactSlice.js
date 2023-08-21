import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import contactsState from '../../model/initialContact';
import { CONTACT_SLICE_NAME } from '../../model/constants';
import api from '../../contact-service';
import { setFetching, setError, createEmptyContact} from '../../model/constants'

const initialState = {
    contacts: contactsState,
    contactsForEdit: createEmptyContact(),
    isFetching: false,
    error: null,
}

export const getContacts = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/getContacts`,
    async function (_, { rejectWithValue }) {
        try {
            const response = await api.get('/');
            if (response.status >= 400) {
                throw new Error(`Ooops...something went wrong: ${response.status}`)
            }
            const { data } = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const updateContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/updateContact`,
    async function (contact, { rejectWithValue, dispatch }) {
        try {
            const { status } = await api.put(`/${contact.id}`, contact)
            if (status >= 400) {
                throw new Error(`Ooops...something went wrong: ${status}`)
            }
            dispatch(changeContact(contact))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const deleteContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/deleteContact`,
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const { status } = await api.delete(`${id}`);
            if (status >= 400) {
                throw new Error(`Ooops...something went wrong: ${status}`)
            }
            dispatch(removeContact(id))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const saveContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/saveContact`,
    async function (newContact, { rejectWithValue }) {
        try {
            const { data, statusText } = await api.post('/', newContact);
            if (statusText !== 'Ok') {
                throw new Error(`Ooops...something went wrong: ${statusText}`)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const contactSlice = createSlice({
    name: CONTACT_SLICE_NAME,
    initialState,
    reducers: {
        createNewContact(state) {
            state.contactsForEdit = createEmptyContact()
        },
        selectContact(state, {payload}) {
            state.contactsForEdit = payload;
        },
        changeContact(state, {payload}) {
            state.contacts = state.contacts.map((contact) => contact.id === payload.id ? payload : contact)
        },
        removeContact(state, { payload }) {
            state.contacts = 
                state.contacts.filter(movie => movie.id !== payload)
        }
    },
    extraReducers: {
        [getContacts.fulfilled]: (state, { payload }) => {
            state.contacts = payload;
            state.isFetching = false;
            state.error = null;
        },
        [saveContact.fulfilled]: (state, { payload }) => {
            state.contacts.push(payload);
            state.isFetching = false;
            state.error = null;
        },

        [getContacts.rejected]: setError,
        [updateContact.rejected]: setError,
        [deleteContact.rejected]: setError,
        [saveContact.rejected]: setError,
        [createNewContact.rejected]: setError,
        [selectContact.rejected]: setError,

        [getContacts.pending]: setFetching,
        [updateContact.pending]: setFetching,
        [deleteContact.pending]: setFetching,
        [saveContact.pending]: setFetching,
        [createNewContact.pending]: setFetching,
        [selectContact.pending]: setFetching,
    }
})

export const { createNewContact, selectContact, changeContact, removeContact } = contactSlice.actions;

export default contactSlice.reducer