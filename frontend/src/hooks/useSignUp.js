import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_URL = import.meta.env.VITE_API_URL_USER;

export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate(); // Initialize useNavigate

    const signup = async (userData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/signUp`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const user = response.data;

            if (user) {
                localStorage.setItem('user', JSON.stringify(user.data));
                dispatch({ type: 'LOGIN', payload: user.data });
                setLoading(false);
                // Navigate after state is set
                navigate('/favourites');
            }
        } catch (err) {
            if(!err.response){
                setError(err.message);
              }
              setError(err.response?.data?.error || err.message);
              setLoading(false); 
        }
    };
    return { signup, loading, error };
};
