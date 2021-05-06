
/* CREA LA ACTIVACION DE MONGODB , LA ACTIVACIN DE EXPREXS Y MONGODB Y LA CREACION DE UNA BASE DE DATOS LLAMADA  /backend3*/

const mongoose=require('mongoose')
const URI = ('mongodb+srv://sor:angela2021@cluster0.1zajy.mongodb.net/test' )/* nombre de la tabla clave para configurar robo3t*/
mongoose.connect(URI, {   /* al conectarse la tabla se genera siertas propiedades como permitir un id index */
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
}).then(db => console.log('conexion base de datos'))  /* si es correcto que muestre un mensage */
.catch(error=>console.log(error)  )
module.exports=mongoose /* exportar la base de datos para ser usada por el modelo.js */