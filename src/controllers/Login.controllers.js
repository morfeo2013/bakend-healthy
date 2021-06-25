

const LogingUsuario = {} /* determinar el mombre de la constante que se llamara el control */
const Guardarmodelo1 = require('../models/Login.models') /* donde se encuentra el archivo moedels.js que contiene la tabla como sera introducida los modelos de la tabla de datos loging*/
const bcrypt = require('bcryptjs') /* se crea la constante para utilizar el encriptador */


var get_ip = require('ipware')().get_ip;
var geoip = require('geoip-lite');



var transporter1 = require('../correo/email.js') /* se importa el modulo mail.js */

const jwt = require('jsonwebtoken') /* para generar el token */
const { link } = require('fs-extra')









/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* SE CREA EL REGISTRO PRIMERO E INGRESA AUTOMATICAMENTE*/

/*  const nuevoLogings = new Guardarmodelo1({ nombre, correo, contrasena,cedula,contacto,direccion,ciudad,admin,user2 }) /* si no existe asignelo a un nuevo modelo
     este heredara todas las funciones del modelo  */

LogingUsuario.registrar = async(req, res) => {
    /* primero se especifica lo que esta en el loging.models.js */
    const { nombre, correo, contrasena, cedula, contacto, direccion, ciudad, admin, user2, contadorFavoritos } = req.body /* se ecuentra en el req del body que secibio del frontend*/


    /* SE HARA UNA VERIFICACION EN LA BASE DE DATOS DI EL CORREO INGRESADO ESTA YA CREADO */
    const copiaModeloDeBacken = await Guardarmodelo1.findOne({ correo: correo })
        /* tome de la base de datos Guardarmodelo1 la propiedad correo y comparelo con el dato ingresdo desde el frontend con la propiedad correo (correo:correo) */

    /* crea la condicion si esta repetido se us con if y else*/
    if (copiaModeloDeBacken) {
        res.json({ mensage: 'correo ya existe' })

    } else {
        const nuevoLogings = new Guardarmodelo1({ nombre, correo, contrasena, cedula, contacto, direccion, ciudad, admin, user2, contadorFavoritos })
            /* si no existe asignelo a un nuevo modelo
                este heredara todas las funciones del modelo */

        /* antes de agregarlo la contraseña a la vase de datos usara la funcion del models encriptador para activar la encriptacion */
        nuevoLogings.contrasena = await nuevoLogings.encriptador(contrasena)
            /* este metodo recive el parametro del frontend y lo envia a la funcion de models para activar el metoso encriptar y encriptarla contrasena */

        /* GUARDARA LA INFORMACION DEL FRONTEND EN LA TABLA DE MONGODB */
        await nuevoLogings.save()

        /* generar el token */
        const token = jwt.sign({ _id: nuevoLogings._id /* si se quiere colocar otro elemento se agrea una coma y se especifica que propiedad se va a crear */ }, 'lol') /* esto crea una cabezera donde ira el token */

        /* se crea la constante, 
        se utiliza el require jwt
        se escoge que elemento se le generara un token y al que se le asignara del ingresado en el frontend */
        /* se coloca seguido de una coma, una palabra secreta morfeo */


        /* LUEGO VERIFICA EL TOKEN Y SE LOGEA PARA ENTRAR */

        /* loginCorreo hereda la informacion del modelo de nuevoLogings(NOMBRE,CORREO,CONTRASENA) */

        await (res.json(



            {
                mensage: 'Ingresate login valido desde el backend'
                    /* estos datos se envian si la contraseña y la claves son correcta  al sesionStorange del fronnen */
                    ,
                nombre: nuevoLogings.nombre,
                /* para que cuando se loggee obtenga la informacion del nombre de el usuarios en el frontend */
                admin: nuevoLogings.admin,
                id: nuevoLogings._id,
                /* utiliza la propiedad heredada para asignar el id  */
                token /* envia el token del id valido */ ,
                contadorFavoritos: nuevoLogings.contadorFavoritos /* para enviar el numero de objetos añadidos en favorios */
            }))

    }

}

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* PARA LOGEARSE DIRECTAMENTE */

LogingUsuario.ingresar = async(req, res) => {

    /* solo nesecita el correo y la contrasena para logiarse */
    const { correo, contrasena } = req.body /* se ecuentra en el req del body */


    /* SE HARA UNA VERIFICACION EN LA BASE DE DATOS DI EL CORREO INGRESADO ESTA YA CREADO */
    /* copiaModeloDeBacken hereda la informacion de la base de datos (nombre,correo,contrasena)*/
    const copiaModeloDeBacken = await Guardarmodelo1.findOne({ correo: correo })
        /* tome de la base de datos Guardarmodelo1 la propiedad correo y comparelo con el dato ingresdo desde el frontend con la propiedad correo (correo:correo) */

    /* crea la condicion si esta repetido se us con if y else*/

    /* si el correo es correcto */
    if (copiaModeloDeBacken) {

        /* se deve comparar la contraseña del labase de datos encryptada y convertir ladel fronentend a encriptada para poder comparar
         */


        /* compara si es verdadero o falso */
        bcrypt.compare(contrasena, copiaModeloDeBacken.contrasena, function(err, resp) {
                if (resp) {
                    /* generar el token */
                    const token = jwt.sign({ _id: copiaModeloDeBacken._id }, 'lol')
                        /* si se quiere colocar otro elemento se agrea una coma y se especifica que propiedad se va a crear */


                    /* se envia in mensajejson */


                    res.json(



                        {
                            mensage: 'Ingresate login valido desde el backend'
                                /* estos datos se envian si la contraseña y la claves son correcta  al sesionStorange del fronnen */
                                ,
                            user2: copiaModeloDeBacken.user2,
                            admin: copiaModeloDeBacken.admin,
                            nombre: copiaModeloDeBacken.nombre,
                            id: copiaModeloDeBacken._id,
                            /* utiliza la propiedad heredada para asignar el id  */
                            token /* envia el token del id valido */ ,
                            contadorFavoritos: copiaModeloDeBacken.contadorFavoritos
                        })

                } else {
                    res.json({
                        mensage: 'Contraseña/Correo incorecto',

                    })
                }
            })
            /* si es falso */
    } else {

        /* si el correo no es el mismo */
        res.json({
            mensage: 'Correo/contraseña incorecto',

        })
    }


   
    
}




/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/*  PARA RECUPERAR CONTRASEÑA */



LogingUsuario.Recuperar = async(req, res) => {

    /* solo nesecita el correo y la contrasena para logiarse */
    const { correo } = req.body /* se ecuentra en el req del body */


    /* SE HARA UNA VERIFICACION EN LA BASE DE DATOS DI EL CORREO INGRESADO ESTA YA CREADO */
    /* copiaModeloDeBacken hereda la informacion de la base de datos (nombre,correo,contrasena)*/
    const copiaModeloDeBacken = await Guardarmodelo1.findOne({ correo: correo })
        /* tome de la base de datos Guardarmodelo1 la propiedad correo y comparelo con el dato ingresdo desde el frontend con la propiedad correo (correo:correo)  el primero es del la base de datos y el segundo del fronen si tienen el mismo nombre se deja uno solo*/

 /* generar el token  para colocar tiempo se anexa ,{expiresIn:'30m'}*/
const token = jwt.sign({ _id: copiaModeloDeBacken._id}, 'lol',{expiresIn:'120s'})

/* var {recuperacion} = token
await Guardarmodelo1.findByIdAndUpdate({ _id: copiaModeloDeBacken._id}, 
    /* busca ese id en la base de datos comparando el _id 
     */
/*  {
        recuperacion
    } */ 





    /* crea la condicion si esta repetido se us con if y else*/

    /* si el correo es correcto */
    if (copiaModeloDeBacken) {

        /* se deve comparar la contraseña del labase de datos encryptada y convertir ladel fronentend a encriptada para poder comparar
         */
        /* CREA UN TOKEN QUE EXPIRE EN UN MINUTO */
    


        var verificacin= `https://www.ganohealthy-medellin.com/cambiopassword/${token}/${copiaModeloDeBacken.id}`
        
        await transporter1.transporter.sendMail({
            from: '"✉ Recuperacion de Contraseña " <ganohealthymedellin2021@gmail.com>', // sender address
            to: correo, // list of receivers
            subject: "Hola "+ copiaModeloDeBacken.nombre +" ✔", // Subject line
            text: "Hello world?", // plain text body
            html:`
            <div>
            <p>Estimado Usuario para acceder a la recuperacion de la contraseña, debes ingresar al 
            siguiente enlace 
            en los proximos 10 minutos.</p>
            <h2>Ingresar a el siguiente link : </h2>
            <a href="${verificacin}">${verificacin}</a>
            </div>
            
            `
            
        
        });



        try {
            var ip_info = get_ip(req);
            console.log(ip_info.clientIp);
            
            var geo = geoip.lookup(ip_info);
            console.log(geo);
            var {city,region}=geo
        s

        } catch (error) {
        console.log('algo salio mal');
        }


        res.json(



            {
                mensage: 'Tu Contraseña a sido enviada a tu Correo desde el backend'+token/* +copiaModeloDeBacken.id+token *//* +ip_info.clientIp+city+region */
                    /* estos datos se envian si la contraseña y la claves son correcta  al sesionStorange del fronnen */


            })

        /* si es falso */
    } else {

        /* si el correo no es el mismo */
        res.json({
            mensage: 'Correo incorecto o No existe'

        })
    }
    

}


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/*  PARA RECIVIR LOS DATOS DE MODIFICACION DE CONTRASEÑA DESDE EL FRONTENT */

LogingUsuario.Password = async(req, res) => {

    const idUsuario = req.params.usuario /* debe coicidir con loging.routers para recivir desde el frontend */
    const contrasena = req.params.password /* debe coicidir con loging.routers para recivir desde el frontend */


 



  /* implementar la buaqueda en la basede datos */
 const nuevaContrasena= await Guardarmodelo1.findByIdAndUpdate({ _id: idUsuario },
    /* busca ese id en la base de datos comparando el _id 
     */
    {
        contrasena,
    })

       /* ENCRIPTAR A CONTRASEÑA */
 /* luego de agregarlo la contraseña a la vase de datos se  usara la funcion del models encriptador para activar la encriptacion */
 nuevaContrasena.contrasena = await nuevaContrasena.encriptador(contrasena)
 /* este metodo recive el parametro del frontend y lo envia a la funcion de models para activar el metoso encriptar y encriptarla contrasena */
 await nuevaContrasena.save()
 /* para que quede guardado */




  /*   const {idUsuario,newPassword}=await req.body
    console.log(req.body) */
    res.json({
        mensaje: 'Ingresaste a la recuperacion de password  '+req.params.usuario+'  '+req.params.password

    })

}

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/*  PARA LISTAR LOS USUARIOS CREADOS */


LogingUsuario.listarusuarios = async(req, res) => {
        /* el fin da la orden de tomar todos los datos de usuarios */
        const listarusuarios = await Guardarmodelo1.find({} /* ,{contrasena:0} */ ).populate('user2')
        res.json(listarusuarios) /* envio el objeto como json  */

    }
    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/*  PARA AGREGARLOS USUARIOS POR ID CREADOS */

LogingUsuario.loginIdFavoritos = async(req, res) => {
    const identificador = req.params.indexUsuario





    await Guardarmodelo1.updateOne( // aggregate significa que vamos a agrupar
        // lista de operaciones, a realizar en secuencia
        // en este caso solo una operación, agrupar
        { _id: identificador }, { $inc: { contadorFavoritos: 1 } } // agrupamos por nombre
        // nueva clave, num_sesiones
        // cuenta el num.elementos en el grupo



    )



    if (await Guardarmodelo1.findByIdAndUpdate({ _id: identificador }, { $addToSet: req.body }
            /* busca ese id en la base de datos comparando el _id     
                
                */
        )) {




        res.json({
            mensaje: "Mensaje desde el Backend: Agregado a Favoritos "

        })

    } else {
        res.json({
            mensaje: "Mensaje desde el Backend: El producto ya esta en Favoritos "

        })


    }
} /* actualice todo lo que le llegue por el req.body osea todos los nuevos datos json a el _id encontrado  con  findByIdAndUpdate*/





/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


LogingUsuario.
leeridFavoritos = async(req, res) => {
    /* res.send('hola mundo')  */

    /* creo una constante y le asigno el valor de guardarmodelo2  esta se le agrega la propiedadd  .find */
    /* esta le permite recorer y extraer  todos los json guardados */

    /* sacamos el indice del usuario */

    const identificadorFav = req.params.id
        /* se crea una constante donde guarde los datos
           para sacar el id que se suministro por fronent (req)
           para sacarlo de los parametros de la web (params)
            para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/

    const usuarioUnicoFav = await Guardarmodelo1.findById({ _id: identificadorFav }, /* busca ese id en la base de datos comparando el _id  */
        req.body).populate('user2') /* muestraun usuario index todo lo que le llegue por el req.bodyen el _id encontrado  con findById*/

    res.json(usuarioUnicoFav) /* responde y envia los datos para ser leidos por el res y los datos por el usuarioUNICO */


}




/*
 
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/*  PARA LISTAR LOS USUARIOS POR ID CREADOS */

LogingUsuario.loginId = async(req, res) => {


    /* el fin da la orden de tomar todos los datos de usuarios */
    const id = req.params.id /* obtiene el id del uusario recivido desde frontend */
    const listarusuariosId = await Guardarmodelo1.findById({ _id: id } /* ,{contrasena:0} */ ) /* compara el de la base de datos con el del frontend y envia el usario que tenga ese id*/
    res.json(listarusuariosId) /* envio el objeto como json  */
}

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ELIMINAR UN USUARIO */

LogingUsuario.borrar = async(req, res) => {
    /*  res.send('Eviando una orden Delete')  */

    /* se usa tambien el id del usuario en la base de datos */
    const identificador = req.params.indexUsuario
        /* se crea una constante donde guarde los datos
              para sacar el id que se suministro por fronent (req)
              para sacarlo de los parametros de la web (params)
               para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/

    await Guardarmodelo1.findByIdAndDelete({ _id: identificador }, /* busca ese id en la base de datos comparando el _id  */
        req.body) /* elimina todo lo que le llegue por el req.bodyen el _id encontrado  con findByIdAndDelete */

    res.json({

        mensaje: "Mensaje desde el Backend: usuario fue eliminado desde el put"


    })

}

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
LogingUsuario.borrarFavoritos = async(req, res) => {

    /*NOTA PARAMS-REQ.BODY existen dos maneras ede enviar los datos pr el params o per el  req.body pero en el caso de eliminar tablas aniddas se pasan por prams si es directamente el padre se usa e req.body
    haunque se podria por el req.bodypero usando el putpues el req.bodyno  recive del axios delete para anidados*/

    const identificador = req.params.dir /* debe coicidir con loging.routers para recivir desde el frontend */
    const identificador2 = req.params.producto /* debe coicidir con loging.routers para recivir desde el frontend */
        /*   console.log(identificador2) */
    await Guardarmodelo1.findByIdAndUpdate({ _id: identificador }, { $pull: { "user2": identificador2 } }) /* pull para borrar ese elemento dntro del otroelemento de la tabla sin afectar la tabla original */
    await Guardarmodelo1.updateOne( // aggregate significa que vamos a agrupar
        // lista de operaciones, a realizar en secuencia
        // en este caso solo una operación, agrupar
        { _id: identificador }, { $inc: { contadorFavoritos: -1 } } // agrupamos por nombre
        // nueva clave, num_sesiones
        // cuenta el num.elementos en el grupo



    )

    /*  res.send('Eviando una orden Delete')  */

    /* se usa tambien el id del usuario en la base de datos */
    /* se crea una constante donde guarde los datos
    para sacar el id que se suministro por fronent (req)
    para sacarlo de los parametros de la web (params)
     para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/

    /* const fredyy= await Guardarmodelo1.find({ _id: identificador },{$pull: {"user2":[0]}}) 
    
    
    */
    /* busca ese id en la base de datos comparando el _id  */
    /* elimina todo lo que le llegue por el req.bodyen el _id encontrado  con findByIdAndDelete 
    .update({}, {"$pull" : {"deportes": "voley"}})
     db.usuarios.findOne({"_id" : ObjectId(req.body)})
    */

    res.json({

        mensaje: "Mensaje desde el Backend: usuario fue eliminado desde el delete FAVORITOS"


    })

}

LogingUsuario.pruebadelete = async(req, res) => {
    try {
        //si reconoce el body. entonces el "problema" esta en el front, el axios.delete no esta diseñado para enviar cuerpo, puede ser eso. Borro todo loq hice? no

        console.log(req.body)
        res.json({
            mensaje: 'estoy en pruebasDelete'
        })
    } catch (error) {
        res.json({
            mensaje: error.message
        })
    }
}

module.exports = LogingUsuario /* para poder exportarlo y ser utilizado en otros archivos */