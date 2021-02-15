const UserCtrl2 = {}/* determinar el mombre de la constante que se llamara el control */
const Guardarmodelo2 = require('../models/usuario.models')/* donde se encuentra el archivo moedels.js que contiene la tabla como sera introducida los modelos de la tabla de datos */







/* req es entrada del fronrnent 
    y res es la salida del bakend */


/* FUNCIONES */

/* se crean las funciones que se envian al archivo routes.js */
UserCtrl2.leer = async (req, res) => {
    /* res.send('hola mundo')  */

    /* creo una constante y le asigno el valor de guardarmodelo2  esta se le agrega la propiedadd  .find */
    /* esta le permite recorer y extraer  todos los json guardados */

    const listaUsuarios = await Guardarmodelo2.find()
    /* .populate('loging2',{contrasena:0}) */
    /* .populate('loging2',{contrasena:0})
     */
    res.json(listaUsuarios)



}


/* SE CREA LA FUNCION LEER USUARIO EL NOMBRE ES CREADO SEGUN LA NECESIDAD
.leerUsuario */
UserCtrl2.leerusuario = async (req, res) => {
    /* res.send('hola mundo')  */

    /* creo una constante y le asigno el valor de guardarmodelo2  esta se le agrega la propiedadd  .find */
    /* esta le permite recorer y extraer  todos los json guardados */

    /* sacamos el indice del usuario */

    const identificador = req.params.indexUsuario  /* se crea una constante donde guarde los datos
     para sacar el id que se suministro por fronent (req)
     para sacarlo de los parametros de la web (params)
      para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/

     const usuarioUnico= await Guardarmodelo2.findById({ _id: identificador },/* busca ese id en la base de datos comparando el _id  */
        req.body) /* muestraun usuario index todo lo que le llegue por el req.bodyen el _id encontrado  con findById*/
 
        res.json(usuarioUnico)


}


UserCtrl2.modificar = async (req, res) => {
    /*  res.send('Eviando una orden Post')  */


    /* sacamos el indice del usuario */

    const identificador = req.params.indexUsuario  /* se crea una constante donde guarde los datos
     para sacar el id que se suministro por fronent (req)
     para sacarlo de los parametros de la web (params)
      para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/

    /* con los siguientes comandos se busca el usuario usando la id suministrada */

    await Guardarmodelo2.findByIdAndUpdate({ _id: identificador },/* busca ese id en la base de datos comparando el _id  */
        req.body) /* actualice todo lo que le llegue por el req.body osea todos los nuevos datos json a el _id encontrado  con  findByIdAndUpdate*/

    res.json({
        mensaje: "Mensaje desde el Backend: modifica el usuario con el id "
    })

}

UserCtrl2.borrar = async (req, res) => {
    /*  res.send('Eviando una orden Delete')  */

    /* se usa tambien el id del usuario en la base de datos */
    const identificador = req.params.indexUsuario  /* se crea una constante donde guarde los datos
    para sacar el id que se suministro por fronent (req)
    para sacarlo de los parametros de la web (params)
     para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/

    await Guardarmodelo2.findByIdAndDelete({ _id: identificador },/* busca ese id en la base de datos comparando el _id  */
        req.body) /* elimina todo lo que le llegue por el req.bodyen el _id encontrado  con findByIdAndDelete */

    res.json({

        mensaje: "Mensaje desde el Backend: usuario fue eliminado desde el put usuario"


    })

}

/*      titulo,
        autor,
        genero,
        ficha */
UserCtrl2.crear = async (req, res) => {

    /* res.send('CREAR USUARIO funcion post') */
    /* recivira la informacion por el post del fronen y la guardara en la constarte de un objeto usando el req */
    const { titulo,autor,genero,ficha,imagen} = req.body   /* estos corresponde a los del models.js que llegan del frontend*/


    /* se crea un nuevo modelo utilizando el que esta en la direccion Guardarmodelo2 asignando la informacion*/
    const nuevousuario = new Guardarmodelo2({
        titulo,
        autor,
        genero,
        ficha,
        imagen

    })
    await nuevousuario.save() /* guardara la informacion en la base de datos con await para que el proseso pueda terminar correctamente */
    res.json({ mensaje: 'Mensaje desde el Backend: Usuario gardado exitosamente' }) /* este mensaje se puede mostrar en el frontent */


}



module.exports = UserCtrl2 