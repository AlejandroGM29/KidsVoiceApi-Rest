import express from "express";
import actionRoutes from './routes/actions.routes.js';
import indexRoutes from './routes/index.routes.js';
import userRoutes from './routes/user.routes.js';
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.urlencoded({extended: true,}));


app.use(express.json())

app.use('/api', userRoutes)
app.use('/api', actionRoutes)
app.use('/api', indexRoutes) 


app.use((req,res,next) =>{
    res.status(404).json({
        message:"endpoint not found"
    })
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(err.status || 500); // Establecemos el código de estado HTTP del error
  //res.status(502).send("hubo un error en el servidor: " + err.message)
  res.json({
      error: {
          message: err.message // Enviamos el mensaje de error al cliente
      }
  });
});

export default app;