import { Router } from "express";
import { postController, postControllerPid } from "../controllers/cartsController.js";
import { checkCid, checkInstance } from "../middlewares/carts.middleware.js";
import { checkPid } from "../middlewares/products.middleware.js";

const cartsRouter = Router()

cartsRouter.post('/carts', checkInstance, postController)
cartsRouter.post('/carts/:cid/product/:pid', checkPid, checkCid, postControllerPid)

export {cartsRouter}