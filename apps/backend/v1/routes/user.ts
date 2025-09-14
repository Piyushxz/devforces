import { Router } from "express";
import {client} from "db/client"
import { signupSchema } from "../../types";
import jwt, { type JwtPayload } from "jsonwebtoken"
import { SendEmail } from "../../mail";
export const userRouter = Router()

userRouter.post('/signin',async (req,res)=>{

    try{
        const {success,data} = signupSchema.safeParse(req.body)

        if(!data?.email ){
            res.status(411).json({message:"Pls enter all fields <3"})
            return
        }
        if(!success){
            res.status(411).json({message:'invalid format !!'})
            return
        }
        
        const user = await client.user.upsert({
            create:{
                email:data?.email,
                role:"User"
            },
            update:{},
            where:{
                email:data?.email
            }
        })

        const token = jwt.sign({userId:user.id},process.env.EMAIL_JWT_SECRET as string)

        if(process.env.NODE_ENV === "production"){
            await SendEmail(data.email , 'test.com')
        }else{
            console.log(`http://localhost:3000/login?token=${token}`)
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Errr!!"})
        console.log(error)
    }
  
})

userRouter.post('/signin/post',async (req,res)=>{
    try{

        const token = req.query.token 
        const decoded = jwt.verify(token as string,process.env.EMAIL_JWT_SECRET as string) as JwtPayload

        if(!decoded.userId){
            res.status(401).json({message:"Unauthorized"})
        }

        const user = await client.user.findUnique({
            where:{
                id:decoded.userId
            }
        })
        
        if(!user){
            res.status(401).json({message:"Unauthorized"})
        }

        const authToken = jwt.sign({userId:decoded.userId,role:user?.role},process.env.USER_JWT_SECRET as string)
        
        res.status(200).json({message:"User signed in successfully",token:authToken})
    }
    catch(err){
        res.status(500).json({message:"Internal Server Errr!!"})
        console.log(err)
    }

})