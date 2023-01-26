const express = require('express');
const bodyParser = require('body-parser');
const {createNewUser, signIn} = require('./handlers/user');
import { protect } from './modules/auth';
import { body, validationResult } from 'express-validator';

const app = express();

const PORT = 1254;

const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/post', protect, postRoutes);
app.use('/comment', protect, commentRoutes);
app.use('/user', protect, userRoutes);

app.post('/signUp',body('username').isString, body('password').isLength({min:5}), createNewUser);
app.post('/signIn', signIn);
/*app.use('/post',postRoutes)
app.use('/comment',commentRoutes)*/


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})