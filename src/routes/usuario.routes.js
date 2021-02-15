const { Router } = require('express') /* comando que importa las fuciones de Route para relacionar las direcciones ingressadas en la pagina web */
const route = Router()/* se crea una constante para utilizar las propiedades del Route */
const UserControl = require('../controllers/usuario.controllers')/* importar el controlador js */
const auth=require('../helper/auth')
/* const auth=require('../helper/auth') */
/* ACA SE CREAN LAS RUTAS QUESERAN LEIDAS EN LA WEB */

route.get('/obtener',UserControl.leer )/* realizar la peticion get,put,delete,pos creadasen el controlls*/
route.get('/obtener/:indexUsuario',UserControl.leerusuario )/* realizar la peticion get,put,delete,pos creadasen el controlls*/
route.put('/modificar/:indexUsuario',UserControl.modificar )/* se selecciona la funcion que coresponde con la orden se adiciona el :index  para operaciones de modificacion de clientes */
route.delete('/eliminar/:indexUsuario',UserControl.borrar )

route.post('/crear',UserControl.crear )
module.exports = route