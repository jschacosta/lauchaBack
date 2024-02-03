//Importacion Express router
import express from 'express';
const router = express.Router();
//Autentificación de roles por JWT
import {verificarAuth,verificarAdmin} from'../middleware/auth.js'
//controllers de usuarios
import {signup, signin, forgotPassword, resetPassword} from'../controllers/user-login.js'
import {editInfo,editTorneo,editPass,deleteUser,deleteUserTorneo} from '../controllers/user-edit.js'
import {allUsers,findUser,newUser,newRole,borrarUser} from'../controllers/user-admin.js'
///////////// RUTAS DE USUARIOS /////////////
//Opciones de Login
router.post('/sign-up', signup); 
router.post('/sign-in', signin);    
router.put('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
//Opciones de Usuario
router.put('/user/:id', [ verificarAuth , editInfo ]);  
router.put('/user-torneo', editTorneo);  
router.put('/delete-user-torneo/:id', deleteUserTorneo);  
router.put('/user-pass/:id', [ verificarAuth , editPass ]);
router.delete('/user/:id', [ verificarAuth , deleteUser ]);
//Opciones de Admin
router.get('/admin/users', [ verificarAuth , verificarAdmin,allUsers]);
router.get('/admin/user', [ verificarAuth , verificarAdmin, findUser]);
router.put('/admin/user/:id', [ verificarAuth , verificarAdmin, newRole]);
router.post('/admin/user', [ verificarAuth , verificarAdmin,newUser]);
router.delete('/admin/user/:id', [ verificarAuth , verificarAdmin, borrarUser]);

export default router;           
