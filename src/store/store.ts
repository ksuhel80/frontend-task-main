import {configureStore} from "@reduxjs/toolkit"
import {useDispatch, useSelector,TypedUseSelectorHook} from "react-redux"
import { contactSlice } from "./contact"

export const store= configureStore({
    reducer:{
        contact: contactSlice.reducer
    }
})

export const useAppDispatch:()=>typeof store.dispatch= useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
