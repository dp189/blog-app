import { useContext } from "react"
import { FavouriteContext } from "../context/FavContext"


export const useFavouriteBlogContext = () => {
    const context = useContext(FavouriteContext);
    if(!context) 
        throw new Error("AuthContext should be used within AuthContextProvider");
    
    return context;
}

