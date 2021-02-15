/* ACA ESTAN LOS REQIRE  PARA LLAMAR EXREXS,MORGAN,ETC*/

const express = require('express'); /* iniciar exprexxs  */
const morgan = require('morgan');/* mostrar por consola si hay conecciones  */
const app = express();/* utilizr todas las propiedades de express */
const bodyparser=require('body-parser')/* traducir los mensaes enviados desde el fronen */
const cors = require('cors');/* admitir cualquier coneccion al servidor */
require ('./database')/* activar la base de datos */


//activa el morgan  sirve para ver las peticiones que nos hace el cliente
app.use(morgan('dev')); /* utilizar el morgan para leer que esta recibiendo el servidor por el puerto asignado */





//middlewares
//el bodyparser y express.json nos sirve para recibir y traducir lo que nos envia el frontend, ya que desde el frontend se va a mandar los datos en formato json
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(express.json()); 


//cors sirve para permitir las peticiones del cliente
app.use(cors({ origin: '*' }));





/* AQUI VAN LAS RUTAS GET POS DELETE PUT */
//routes
//app.use('/api/ejemplo', require('aca va las rutas que tengas configuradas'));

app.use('/',require('./routes/Login.routes'))
app.use('/',require('./routes/usuario.routes'))

/* ES EL COMIENZO DE LA ACTIVACION DE L PROGRAMA
1) PONE A LA ESCUCHA ATRVEZ DE LOS RUTES QUE LINK SE ESCRIBE
2) ROUTES LLAMA A CONTROLL Y EJECUTA LAS FUNCIONES PARA DEERMINADA ACCION 
3)CONTROLL LLAMA A USUARIO PARA USAR LA TABLA BASE Y LLLENARLA EN MODELS
4) MODELS GUARDA LOS DATOS EN LA BASE DE DATOS EN DATABASE DE MN-DB */




/* ACA ACTIVA EL SERVIDOR  */

app.set('port', process.env.PORT || 4000); /* ACTIVAR EL PUERTO SELECCIONADO PARA LA ESCUCHA */
/* entre el 3000 y el 4000 react trabaja con el puerto 3000 */



//poner al servidor a escuchar por el puerto designado server
app.listen(app.get('port'), () => {
    console.log('escuchando por el puerto', app.get('port'));
})