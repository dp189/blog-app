import { useState} from 'react';
import { useAuthContext } from  './useAuthContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL_USER;


export const useLogOut =  () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const  {dispatch} = useAuthContext();

    const navigate = useNavigate(); 



    const logout = async (userData) => {

        
        setIsLoading(true);
        const user = await axios
        .post(`${API_URL}/logout`,{}, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userData}`
          },
        }).catch( err => {
            setError(err.error);
            setIsLoading(false);
        })
        

        if(user){
          
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT'});
            setIsLoading(false);
            navigate('/')
        }
    }
    return { logout, isLoading, error };
}