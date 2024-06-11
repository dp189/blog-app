import { useState} from 'react';
import { useAuthContext } from  './useAuthContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL_USER;


export const useLogOut =  () => {
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const  {dispatch} = useAuthContext();

    const navigate = useNavigate(); 



    const logout = async (userData) => {
        //console.log(userData);

        console.log(userData);
        setIsLoading(true);
        const user = await axios
        .post(`${API_URL}/logout`,{}, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userData}`
          },
        }).catch( err => {
            setIsError(err.message);
            setIsLoading(false);
        })
        

        if(user){
          
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT'});
            setIsLoading(false);
            navigate('/')
        }
    }
    return { logout, isLoading, isError };
}