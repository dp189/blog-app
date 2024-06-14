import { useState} from 'react';
import { useAuthContext } from  './useAuthContext';
import axios from "axios";

import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL_USER;


export const useLogin =  () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const  {dispatch} = useAuthContext();



    const login = async (userData) => {
      setIsLoading(true);
      try {
          const response = await axios.post(`${API_URL}/login`, userData, {
              headers: {
                  "Content-Type": "application/json",
              },
          });
          console.log(response);
          const user = response.data;
  
          if (user) {
              localStorage.setItem('user', JSON.stringify(user.data));
              dispatch({ type: 'LOGIN', payload: user.data });
              setIsLoading(false);
              // Navigate after state is set
              navigate('/favourites');
          }
      } catch (err) {
        if(!err.response.data){
          setError(err.message);
        }
        setError(err.response?.data?.error);
        setIsLoading(false); 
      }
  };
    return { login, isLoading, error };
} 