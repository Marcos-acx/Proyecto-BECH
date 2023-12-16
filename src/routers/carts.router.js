import {Router} from 'express';

import {
    getController,
    delControllerPid, 
    delController,
    postController, 
    postControllerPid, 
    putController, 
    putControllerPid
} from '../controllers/cartsController.js';
import {checkPid} from '../middlewares/products.middleware.js';

export const cartsRouter = Router()

cartsRouter.get('/carts/:cid', getController)
cartsRouter.post('/carts', postController)
cartsRouter.post('/carts/:cid/products/:pid', checkPid, postControllerPid)
cartsRouter.delete('/carts/:cid/products/:pid', delControllerPid)
cartsRouter.delete('/carts/:cid', delController)
cartsRouter.put('/carts/:cid', putController)
cartsRouter.put('/carts/:cid/products/:pid', putControllerPid)
