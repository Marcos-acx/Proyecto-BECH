import { Router } from "express";
import { productRouter } from "./productos.router.js";
import { cartsRouter } from "./carts.router.js";
import { sessionsRouter } from "./sessions.router.js";
import { usersRouter } from "./users.router.js";

export const apiRouter = Router()

apiRouter.use('/api', productRouter)
apiRouter.use('/api', cartsRouter)
apiRouter.use('/api', sessionsRouter)
apiRouter.use('/api', usersRouter)