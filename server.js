const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT , console.log(`Server is running on port ${process.env.PORT}`))



process.on('unhandledRejection',(err, promise)=>{

    console.log(`Error ${err.message}`);
    server.close(()=>process.exit(1));
})

