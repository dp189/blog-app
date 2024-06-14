
import { useFavouriteBlogContext } from "./useFavouriteBlogContext";
import { removeFavouriteBlogByUser } from "../api/api";

export const useRemoveFavourite = () => {

    
    const {dispatch} = useFavouriteBlogContext();

    const removeFavourite = async (blogId, accessToken) => {
        try{
            const favBlog = await removeFavouriteBlogByUser(blogId, accessToken);
            if(favBlog.status == 200){
            dispatch({type: 'REMOVE_FAVOURITE', payload:blogId})}
            
        }catch(error){
            console.error("Failed to remove favourite blog", error);
        }
        
      }


    return { removeFavourite }

}