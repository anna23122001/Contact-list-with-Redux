import ACTION_TYPES from "./actionTypes";


export const addNewContact = (payload) => {
    return {
        type:ACTION_TYPES.ADD_NEW_CONTACT,
        payload,
    }};

export const postNewContact = (payload) => {
    return {
        type: ACTION_TYPES.POST_NEW_CONTACT,
        payload
    }};

export const putContact = () => {
    return {
        type:ACTION_TYPES.PUT_CONTACT,
        payload
    }};

export const deleteContact = () => {
    return {
        type: ACTION_TYPES.DELETE_CONTACT,
        payload
    }};

export const selectContact = () => {
    return {
        type: ACTION_TYPES.SELECT_CONTACT,
        payload
    }};
    
export const getContacts = () => {
    return {
        type:ACTION_TYPES.GET_CONTACTS,
        payload
    }};