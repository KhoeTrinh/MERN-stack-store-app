import express from 'express';
import { 
    createUser, 
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile, 
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from '../controllers/userController.js'
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)

// For all
router
    .route('/profile')
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile)

//Just for Admin 👇
router
    .route('/:id')
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById) 

export default router