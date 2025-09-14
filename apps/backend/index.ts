import express from 'express'
import { v1Router } from './v1'


const app = express()


app.use('/v1',v1Router)


app.listen(5000,()=>{
    console.log('Server running')
})