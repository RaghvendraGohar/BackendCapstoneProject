import express from "express";
const app = express();

const PORT = 6000;

app.get('/health',(req,res)=>{
    console.log("health api");
    res.json({
        service:'backend jobs listing API server',
        status:"active",
        time:new Date(),
    });

})

app.listen(PORT,()=>{
    console.log(`backend running on port : ${PORT}`)
    
});