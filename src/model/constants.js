export const BASE_URL = 'http://localhost:5000/contacts';
export const CONTACT_SLICE_NAME = 'contacts' 

// helper for contactSlice
export const setFetching = (state) => {
    state.fetching = true;
    state.error = null;
}
export const setError = (state, action) => {
    state.fetching = false;
    state.error = action.payload;
}
export function createEmptyContact() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
  }