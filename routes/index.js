import express from "express";
//METHOD FROM USERS
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

//METHOD FROM SONGS
import { getSongsByUserId, addSong, updateSong, deleteSong, findSong } from "../controllers/Songs.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

//SONGS
router.get("/songs", verifyToken, getSongsByUserId);
router.get("/song/:id", verifyToken, findSong);
router.post("/song", verifyToken, addSong);
router.put("/songs/:id", verifyToken, updateSong);
router.delete("/delete/:id", verifyToken, deleteSong);
export default router;
