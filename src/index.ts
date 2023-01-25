const express = require('express');
const {createNewUser} = require('./handlers/user');

const app = express();

const PORT = 1254;

const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');


app.use(express.json());
app.use('/user',userRoutes);

app.post('/signUp', createNewUser);
/*app.use('/post',postRoutes)
app.use('/comment',commentRoutes)*/


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})