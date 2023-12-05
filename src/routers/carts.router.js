import { Router } from "express";
import { postController, postControllerPid } from "../controllers/cartsController.js";
import { checkPid } from "../middlewares/products.middleware.js";

const cartsRouter = Router()

cartsRouter.post('/carts', postController)
cartsRouter.post('/carts/:cid/product/:pid', checkPid, postControllerPid)

export {cartsRouter}