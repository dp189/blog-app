import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import logger from './utils/logger.js';
import morgan from 'morgan';

dotenv.config({
    path:'./env'
})


const app = express();

const morganFormat = ':method :url :status :response-time ms';


//middleware
//logger configuration
app.use(morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logObject = {
        method: message.split(' ')[0],
        url: message.split(' ')[1],
        status: message.split(' ')[2],
        responseTime: message.split(' ')[3],

      };
      logger.info(JSON.stringify(logObject));
    }
  }
}));



app.use(cors({
    origin:process.env.CORS_ORIGINS,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
}));

app.options('*', cors());

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended:true
}))


app.use(cookieParser());

//Routes import
import blogRoutes from './routes/blogs.routes.js';
import userRoutes from './routes/user.routes.js';

//route configuration
app.use("/api/v1/blogs", blogRoutes); 
app.use("/api/v1/users", userRoutes);

//db connection
connectDB().then(() => {
    
    app.listen(process.env.PORT, ()=>{

        logger.info(`Server Started at port: ${process.env.PORT}`);
    })
}).catch( err => {
    logger.error("MONGODB connection FAILED", err);
    
});

app.get('/', (req,res) => {
    res.send("Hello World");
})
