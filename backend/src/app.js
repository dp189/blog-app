import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import connectDB from "./db/index.js";


dotenv.config({
    path:'./env'
})


const app = express();

// const port = 8080

//middleware
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));


app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended:true
}))

//Routes import
import blogRoutes from './routes/blogs.routes.js'

app.use("/api/v1/blogs", blogRoutes); //route configuration


//db connection
connectDB().then(() => {
    
    app.listen(process.env.PORT, ()=>{
        console.log(`Server Started at port: ${process.env.PORT}`)
    })
}).catch( err => {
    console.log("MONGODB connection FAILED", err);
});

app.get('/', (req,res) => {
    res.send("Hello World");
})
