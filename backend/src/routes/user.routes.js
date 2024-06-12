import { Router } from "express";
import { registerUser, loginUser,logoutUser, refreshAccessToken, addFavouriteBlog, findFavourites, removeFavouriteBlog } from "../controller/users.controller.js";
import { authenticateJWT } from "../middleware/jwtAuthenticate.middleware.js";

const router = Router();


router.route('/signUp').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post(authenticateJWT, logoutUser);

// router.route('/login/getUser').get(authenticateJWT, findAllUsers);

router.route('/refreshAccessToken').post(refreshAccessToken);

router.route('/favourites').post(authenticateJWT,addFavouriteBlog);
router.route('/favourites').get(authenticateJWT,findFavourites);

router.route('/removeFavourites').post(authenticateJWT,removeFavouriteBlog);

export default router;