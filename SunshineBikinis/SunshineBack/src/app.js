import express from "express"
import productRoutes from "./routes/productos.routes.js"
import indexRoutes from "./routes/index.routes.js"
import compraRoutes from "./routes/compras.routes.js"
import userRoutes from "./routes/users.routes.js"
import carritoRoutes from "./routes/carrito.routes.js"
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

//routes
app.use(indexRoutes)
app.use('/api', productRoutes)
app.use('/api', compraRoutes)
app.use('/api', userRoutes)
app.use('/api', carritoRoutes)

//static images folder
app.use('/images', express.static('./images'))

//middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: "Not Found"
  })
})

// //files
// app.use(express.static(path.join(__dirname, '../images')));

export default app;