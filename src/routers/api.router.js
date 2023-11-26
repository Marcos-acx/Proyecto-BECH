import { Router } from "express";
import { productRouter } from "./productos.router.js";
import { cartsRouter } from "./carts.router.js";

export const apiRouter = Router()

apiRouter.use('/api', productRouter)
apiRouter.use('/api', cartsRouter)