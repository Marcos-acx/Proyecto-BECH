import { Router } from "express";
import { delController, getController, getControllerPid, postController, postControllerPid } from "../controllers/productsController.js";
import { checkInstance } from "../middlewares/products.middleware.js";

const productRouter = Router()

productRouter.get('/products', getController)
productRouter.get('/products/:pid', getControllerPid)

productRouter.post('/products', checkInstance, postController)
productRouter.post('/products/:pid', checkInstance, postControllerPid)

productRouter.delete('/products/:pid', delController)


export {productRouter}