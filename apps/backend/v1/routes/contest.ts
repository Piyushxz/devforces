import { Router } from "express";


export const contestRouter = Router()


contestRouter.get('/active',(req,res)=>{})
contestRouter.get('/finished',(req,res)=>{})
contestRouter.get('/:contestId',(req,res)=>{})
contestRouter.get('/:contestId/:challengeId',(req,res)=>{})

contestRouter.get('/leaderboard/:contestId',(req,res)=>{})
contestRouter.post('/:contestId/join',(req,res)=>{})
contestRouter.post('/:contestId/leave',(req,res)=>{})
contestRouter.post('/:contestId/submit',(req,res)=>{})
