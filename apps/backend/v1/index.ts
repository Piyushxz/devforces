import { Router } from "express";
import { adminRouter } from "./routes/admin";
import { userRouter } from "./routes/user";
import { contestRouter } from "./routes/contest";


export const v1Router = Router()


v1Router.use('/admin',adminRouter)
v1Router.use('/user',userRouter)
v1Router.use('/contest',contestRouter)
