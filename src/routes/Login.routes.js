const { Router } = require('express') /* comando que importa las fuciones de Route para relacionar las direcciones ingressadas en la pagina web */
const route = Router()/* se crea una constante para utilizar las propiedades del Route */
const LogingUsuario = require('../controllers/Login.controllers')/* importar el controlador js */
const auth=require('../helper/auth')
/* ACA SE CREAN LAS RUTAS QUESERAN LEIDAS EN LA WEB */


route.get('/listarUsuarios/', auth.verificartoken ,LogingUsuario.listarusuarios )/* realizar la peticion get,put,delete,pos creadasen el controlls*/
route.get('/mostrar/:id',auth.verificartoken,LogingUsuario.loginId )/* realizar la peticion get,put,delete,pos creadasen el controlls*/
route.get('/favoritos/:id',LogingUsuario.leeridFavoritos )/* realizar la peticion get,put,delete,pos creadasen el controlls*/
route.post('/registrar',LogingUsuario.registrar )
route.post('/ingresar',LogingUsuario.ingresar )
/* route.delete('/eliminar/:indexUsuario',UserControl.borrar ) */
route.delete('/eliminarUsuario/:indexUsuario', auth.verificartoken,LogingUsuario.borrar )
route.delete('/borrarFavoritos/:dir/:producto',LogingUsuario.borrarFavoritos )/* para pasar dos valores por el params */

route.put('/agregarfavorito/:indexUsuario',LogingUsuario.loginIdFavoritos )


//pruebas
route.delete('/pruebas',LogingUsuario.pruebadelete)

module.exports = route

