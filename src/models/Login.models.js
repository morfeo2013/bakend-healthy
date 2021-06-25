const mongoose=require('mongoose')/* requerimos la bases de datos */
const {Schema}=mongoose/* se crea el esquema de la base de datos */
const bcrypt =require ('bcryptjs') /* se crea la constante para utilizar el encriptador */


/* ACA SE RESPETA LA PALABRA RESERVADA SCHEMA */
/* creamos es modelo RESPETANDO  =NEW SCHEMA*/


const LoginglTabla= new Schema({
  

    nombre: String,
    cedula: String,
    contacto: String,
    direccion: String,
    ciudad: String,
    correo: String,
    contrasena: String,
    admin:String,
    recuperacion:String,
    contadorFavoritos:Number,
   user2: [{type:Schema.Types.ObjectId,ref:'user2'}] /* para relacionar el pbjeto de favoritos de la tabla usuario a la loging */
    
},{
    timestamps:true/* crea informacion de la fecha de creacion  */
}
)




/* PARA CREAR LA FUNCION DE ENCRIPTAR */
/* SE UTILIZA EL NOMBRE DE  LA TABLA Y SE LE AGREGA LA PALABRE RESERVADA .methods SEGUIDO DE UN NOMBRE DESCRIPTIVO */

/* SE LE ASIGNA UN PARAMETRO COMO CONTRASENA */
LoginglTabla.methods.encriptador= async contrasenaBase =>{ /* el metodo se llama encriptador y recibe un parametro que se tomara como la contraseña a cambiar*/

/* SE CREA UNA CONSTANTE QUE INDIQUE LAS VUELTAS A ENCRPTAR Y ACTIVE EL CRYPT */
const activarEncriptador = await bcrypt.genSalt(8) 
  
/* TOMA CON LA PALABRA RESERADA .HASH LA CONVIERTE LA PALABRE QUE RECIVA CONTRASEÑA Y LE APLICA EN ENCRYPTADOR QUE ESTA INDICADO EN LA CONSTANTE activarEncriptador */
return await bcrypt.hash(contrasenaBase,activarEncriptador)
}





/* ACA SE CREA EL NOMBRE DE LA NUEVA TABLA CREADA */
module.exports= mongoose.model('loging2',LoginglTabla) /* user2 sera el  nombre de la tabla y se asignara ala funcion NuevoModeloTabla*/
