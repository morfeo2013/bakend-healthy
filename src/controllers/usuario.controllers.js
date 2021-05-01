const UserCtrl2 = {} /* determinar el mombre de la constante que se llamara el control */
const Guardarmodelo2 = require('../models/usuario.models') /* donde se encuentra el archivo moedels.js que contiene la tabla como sera introducida los modelos de la tabla de datos */

const cloudinary = require('cloudinary') /* iniciar cloudinari */
const fs = require('fs-extra') /* previa mente instalado el modulo fs-extra */


/* autentificacion cloudinary */
cloudinary.config({

    cloud_name: 'dhiasghho',
    api_key: '423165925611845',
    api_secret: 'Xb8zjRkqtpThzsEXf9Yrfh7usp0'

})


/* controlador para la dubida de imagenes */




/* req es entrada del fronrnent 
    y res es la salida del bakend */


/* FUNCIONES */

/* se crean las funciones que se envian al archivo routes.js */
UserCtrl2.leer = async(req, res) => {
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
UserCtrl2.leerusuario = async(req, res) => {
    /* res.send('hola mundo')  */

    /* creo una constante y le asigno el valor de guardarmodelo2  esta se le agrega la propiedadd  .find */
    /* esta le permite recorer y extraer  todos los json guardados */

    /* sacamos el indice del usuario */

    const identificador = req.params.indexUsuario
        /* se crea una constante donde guarde los datos
        para sacar el id que se suministro por fronent (req)
        para sacarlo de los parametros de la web (params)
            para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/

    const usuarioUnico = await Guardarmodelo2.findById({ _id: identificador }, /* busca ese id en la base de datos comparando el _id  */
        req.body) /* muestraun usuario index todo lo que le llegue por el req.bodyen el _id encontrado  con findById*/

    res.json(usuarioUnico)


}


UserCtrl2.modificar = async(req, res) => {
    /*  res.send('Eviando una orden Post')  */


    /* sacamos el indice del usuario */

    const identificador = req.params.indexUsuario
        /* se crea una constante donde guarde los datos
        para sacar el id que se suministro por fronent (req)
        para sacarlo de los parametros de la web (params)
            para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/



    /* SI EL ENVIO TIENE UN ARCHIVO IMAGEN */
    if (req.file) {

        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        /* PARA OBTENER EL ID DE CLOUDINARY Y ELIMINARLO */

        const { imagenURL } = await Guardarmodelo2.findById({ _id: identificador })


        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        console.log('este es el usuario claudinary ++++++++++' + imagenURL)
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        await cloudinary.v2.uploader.destroy(imagenURL)
            /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


        const resultado = await cloudinary.v2.uploader.upload(req.file.path)
            /* con los siguientes comandos se busca el usuario usando la id suministrada */
        console.log(req.body)
        const { titulo, autor, genero, ficha, imagen, imageURL } = req.body /* sacar los datos quese necesitan del req body */

        await Guardarmodelo2.findByIdAndUpdate({ _id: identificador },
            /* busca ese id en la base de datos comparando el _id 
             */
            {
                titulo,
                autor,
                genero,
                ficha,
                imagen: resultado.secure_url,
                /* aca adicionamos el link obtenido  */
                imagenURL: resultado.public_id
            }) /* actualice todo lo que le llegue por el req.body osea todos los nuevos datos json a el _id encontrado  con  findByIdAndUpdate*/

        /*  await fs.unlink(req.file.path) */
        /* borrar el archivo guardado en el contenedor */
        await fs.unlink(req.file.path)
        res.json({
            mensaje: "Mensaje desde el Backend: modifica el usuario con el id Imagen Enviada"
        })
        /* SI EL ENVIO NO TIENE UN ARCHIVO IMAGEN */
    } else {
        const { titulo, autor, genero, ficha, imagen, imageURL } = req.body /* sacar los datos quese necesitan del req body modifica el usuario con el id Sin Imagen*/
        await Guardarmodelo2.findByIdAndUpdate({ _id: identificador },
            /* busca ese id en la base de datos comparando el _id 
             */
            {
                titulo,
                autor,
                genero,
                ficha,
            }) /* actualice todo lo que le llegue por el req.body osea todos los nuevos datos json a el _id encontrado  con  findByIdAndUpdate*/
        res.json({
            mensaje: "Mensaje desde el Backend: modifica el usuario con el id Sin Imagen"
        })
    }
}

UserCtrl2.borrar = async(req, res) => {
    /*  res.send('Eviando una orden Delete')  */
    /* se usa tambien el id del usuario en la base de datos */
    const identificador = req.params.indexUsuario
        /* se crea una constante donde guarde los datos
        para sacar el id que se suministro por fronent (req)
        para sacarlo de los parametros de la web (params)
        para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/
    /* const {imagenURL}= await Guardarmodelo2.findById({ _id: identificador })
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log('este es el usuario claudinary ++++++++++'+imagenURL)
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    await cloudinary.v2.uploader.destroy(imagenURL) */
    const { imagenURL } = await Guardarmodelo2.findByIdAndDelete({ _id: identificador }, /* busca ese id en la base de datos comparando el _id  */
        req.body) /* elimina todo lo que le llegue por el req.bodyen el _id encontrado  con findByIdAndDelete */
    await cloudinary.v2.uploader.destroy(imagenURL) /* borrar la imagen de cloudinary */
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log('este es el usuario claudinary ++++++++++' + imagenURL)
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    res.json({
        mensaje: "Mensaje desde el Backend:  eliminado desde el put "
    })
}

/*      titulo,
        autor,
        genero,
        ficha */
UserCtrl2.crear = async(req, res) => {
    /* res.send('CREAR USUARIO funcion post') */
    /* recivira la informacion por el post del fronen y la guardara en la constarte de un objeto usando el req */
    const { titulo, autor, genero, ficha, imagen, imageURL } = req.body /* estos corresponde a los del models.js que llegan del frontend*/
    console.log(req.body)
    const resultado = await cloudinary.v2.uploader.upload(req.file.path)
    console.log(resultado)
        /* se crea un nuevo modelo utilizando el que esta en la direccion Guardarmodelo2 asignando la informacion*/
    const nuevousuario = new Guardarmodelo2({
        titulo,
        autor,
        genero,
        ficha,
        imagen: resultado.secure_url,
        /* para que lo suba como htpps */
        imagenURL: resultado.public_id
    })
    /* si envian un archivo lo envia al modelo */
    await nuevousuario.save() /* guardara la informacion en la base de datos con await para que el proseso pueda terminar correctamente */
        /*  if (req.file){
            console.log('se envio archivo foto')
            
                const {filename}=req.file
                Guardarmodelo2.setImgUri(filename)
            
            
            }else{
                console.log('no se envio archivo foto')
               } */



    await fs.unlink(req.file.path)



    res.json({ mensaje: 'Mensaje desde el Backend: Producto guardado exitosamente' }) /* este mensaje se puede mostrar en el frontent */


    console.log(req.file)
}



module.exports = UserCtrl2