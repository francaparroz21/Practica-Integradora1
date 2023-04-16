import { Router } from "express";

const router = Router()

router.get('/realtimeproducts',(req,res)=>{
    res.render('realTimeProducts')
})

export default router;