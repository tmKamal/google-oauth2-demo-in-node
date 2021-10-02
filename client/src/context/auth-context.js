import {createContext} from 'react';

export const AuthContext=createContext({
    name:null,
    isLoggedin:false,
    user:null,
    login:()=>{},
});