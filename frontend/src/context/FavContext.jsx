import { createContext, useReducer, useEffect } from "react";


export const FavouriteContext = createContext();

export const favouriteReducer = (state, action) => {
    switch(action.type){
        case 'SET_FAVOURITE':
            return action.payload;
        case 'ADD_FAVOURITE':
            return [...state, action.payload];

        case 'REMOVE_FAVOURITE':

            
            return state.filter(blog => blog._id !== action.payload)


        default:
            return state;
    }
}


import { getFavouriteBlogsByUser, addFavouriteBlogsToUser, removeFavouriteBlogByUser } from "../api/api";



export const FavouriteBlogProvider = ({children}) => {

    const [state, dispatch] = useReducer( favouriteReducer , []);

    
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        async function fetchFavourites(){
            
            try {

            
                const favBlogs = await getFavouriteBlogsByUser(user.user.accessToken);
                
                if(favBlogs.status === 200 && favBlogs.data){
                    dispatch({type: 'SET_FAVOURITE', payload: favBlogs.data});
                    
                }
                
            } catch (error) {
                console.error("Failed to fetch favourite blogs", error)
            }
            
          }

        fetchFavourites();
      }, []);


      const addFavourite = async (id, accessToken) => {
        
        try {
            const favBlog = await addFavouriteBlogsToUser(id, accessToken);
            dispatch({type: 'ADD_FAVOURITE', payload: favBlog.data});
        } catch (error) {
            console.error("Failed to add favourite blog", error);
        }
      }

    

    return <FavouriteContext.Provider value = {{favourites: state, addFavourite, dispatch}}>
        {children}
    </FavouriteContext.Provider>

}