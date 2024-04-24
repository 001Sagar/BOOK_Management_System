import express from 'express';
const route = express.Router();

import UserControllor from '../controllors/usercontrollor'
import BookControllor from '../controllors/bookcontrollor.ts'
import auth from '../utills/auth.ts'


// Routers of the User authentication API's
route.post('/SignUp', UserControllor.SingUp);
route.get('/login', UserControllor.login);
route.put('/update_password',auth.authenticate, UserControllor.updatepassword);
route.delete('/delete_user',auth.authenticate, UserControllor.deleteUser);

// Routers of the Book Managerment API's
route.post('/BookAdd',auth.authenticate, BookControllor.add_book);
route.get('/getBook',auth.authenticate, BookControllor.getBook);
route.put('/update_book_data',auth.authenticate, BookControllor.updateBookData);
route.delete('/delete_book',auth.authenticate, BookControllor.deleteBook);


export default route;