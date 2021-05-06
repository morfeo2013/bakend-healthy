const mongoose=require('mongoose')/* requerimos la bases de datos */
const {Schema}=mongoose/* se crea el esquema de la base de datos */




/* ACA SE RESPETA LA PALABRA RESERVADA SCHEMA */
/* creamos es modelo RESPETANDO  =NEW SCHEMA*/


const NuevoModelTabla=new Schema({
  

    titulo: String,
    autor: String,
    genero: String,
    ficha: String,
    imagen:String,
 
    imagenURL:String
},{
    timestamps:true/* crea informacion de la fecha de creacion  */
}


)








/* ACA SE CREA EL NOMBRE DE LA NUEVA TABLA CREADA */
module.exports=mongoose.model('user2',NuevoModelTabla) /* user2 sera el  nombre de la tabla y se asignara ala funcion NuevoModeloTabla*/