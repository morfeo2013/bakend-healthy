const Auth={}
const jwt=require('jsonwebtoken')

Auth.verificartoken=(req,res,next)=>{

/* try {
    
} catch (error) {
    
} */

    if(!req.headers.autorizacion){
        return res.json({
            mensage:'No estas autorizado token erroneo o en blanco'
        })
    }
    const token=req.headers.autorizacion.split(" ")[1]
    
 
   
  
   jwt.verify(token, 'lol',(error,payload)=>{
       if(error){
        return res.json({
            mensage:'Error de identificacion por token errado'
        })
       }
        req.userid=payload._id
        next()
       
   })



}

module.exports=Auth