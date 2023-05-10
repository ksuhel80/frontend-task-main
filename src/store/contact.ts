import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface contact {
    id : number,
    firstName : string,
    lastName : string,
    statuses : string
}

interface contactState {
    contacts : contact[]
}

const initialState: contactState = {
    contacts: []
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers :{
        addContact: (state, action:PayloadAction<{firstName: string, lastName : string, status: string}>) => {
            state.contacts.push({
                id: state.contacts.length,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                statuses: action.payload.status
            })
            console.log(action.payload)
        },
        editContact: (state, action:PayloadAction<{id:number,firstName: string, lastName : string, status: string}>) => {
         state.contacts = state.contacts.map((item)=> {
           if( item.id === action.payload.id)  
           
            {
             return   { id : action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                statuses: action.payload.status}
            }
            else
            {return item}
            })
         
         
        },
        deleteContact: (state, action:PayloadAction<{id:number}>) => {
            state.contacts = state.contacts.filter(item=> item.id !== action.payload.id )
           },
    }
})


export default contactSlice.reducer;
export const { addContact,editContact,deleteContact } = contactSlice.actions;