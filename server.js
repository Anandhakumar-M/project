const mongoose = require("mongoose");
const app = require("./index");
mongoose.connect("mongodb://localhost/test",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const port = 3000;
const server=app.listen(port,()=>{
    console.log("server is runing...")
    console.log(process.env.NODE_ENV)
})
process.on('unhandledRejection',(error)=>{
    console.log(error.name,error.message);
    console.log('Unhandled rejection occured!');
    server.close(()=>{
        process.exit(1);
    })
})