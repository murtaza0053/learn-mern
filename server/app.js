const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});
require('./db/conn');

app.use(express.json());
app.use(require('./router/auth'));

const PORT = process.env.PORT

// // Middleware
// const middleware = (req, res, next) => {
//     console.log('middleware');
//     next();
// }

const User = require('./models/userSchema');



app.listen(PORT,()=> {
    console.log(`app listing at port no ${PORT}`);
});