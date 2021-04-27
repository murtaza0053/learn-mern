
const mongoose = require('mongoose');
const DB = process.env.DATABASE;

// for connect to mongodb cluster cloud
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    // userFindAndModify: false
}).then(() => {
    console.log('connection successful');
}).catch((err) => console.log(err, '  -- no connection'));
