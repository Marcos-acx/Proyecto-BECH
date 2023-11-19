import { Router } from "express";
import { delController, getController, getControllerPid, postController, postControllerPid } from "../controllers/productsController.js";
import { checkInstance } from "../middlewares/products.middleware.js";

const productRouter = Router()

productRouter.get('/api/products', getController)
productRouter.get('/api/products/:pid', getControllerPid)

productRouter.post('/api/products', checkInstance, postController)
productRouter.post('/api/products/:pid', checkInstance, postControllerPid)

productRouter.delete('/api/products/:pid', delController)


export {productRouter}