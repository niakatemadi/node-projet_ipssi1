const express = require('express');
const bodyParser = require('body-parser');
const {createNewUser, signIn} = require('./handlers/user');
import { protect } from './modules/auth';

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

app.post('/signUp', createNewUser);
app.post('/signIn', signIn);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})