const express = require('express');
const {createNewUser, signIn} = require('./handlers/user');
import { protect } from './modules/auth'

const app = express();

const PORT = 1254;

const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');


app.use(express.json());
app.use('/post', protect, postRoutes);

app.post('/signUp', createNewUser);
app.post('/signIn', signIn);
/*app.use('/post',postRoutes)
app.use('/comment',commentRoutes)*/


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})