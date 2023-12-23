import { Router } from "express";
import { delController, getController, getControllerPid, postController, postControllerPid } from "../../controllers/productsController.js";

const productRouter = Router()

productRouter.get('/products', getController)
productRouter.get('/products/:pid', getControllerPid)

productRouter.post('/products', postController)
productRouter.post('/products/:pid', postControllerPid)

productRouter.delete('/products/:pid', delController)


export {productRouter}