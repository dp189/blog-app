import { useState} from 'react';
import { useAuthContext } from  './useAuthContext';
import axios from "axios";

import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL_USER;


export const useLogin =  () => {

    const navigate = useNavigate();
    const [isError, setIsError] = useState(null);
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
          const user = response.data;
  
          if (user) {
              localStorage.setItem('user', JSON.stringify(user.data));
              dispatch({ type: 'LOGIN', payload: user.data });
              setIsLoading(false);
              // Navigate after state is set
              navigate('/favourites');
          }
      } catch (err) {
          setIsError(err.message);
          setIsLoading(false);
      }
  };
    return { login, isLoading, isError };
} 