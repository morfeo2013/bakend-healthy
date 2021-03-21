const multer = require('multer');/*ACTIVA EL MODULO PARA LAS IMAGENES */
const path = require('pach') /* desde exprexs para obtener la hubicacion */
const {v4:uuidv4}= require ('uuid') /* llamada a lel generador de id */


/* secrea una funcion llamada stornge */
/* se crea la carpeta para guardar ls fotos */
const contenedorImagen= multer.diskStorage({
    destination: path.join(__dirname,'../contenedor/imagenes') 
})


/* e lcodigo para guardar el archivo */

const upload = multer ({
    contenedorImagen 
})

/* se exporta */

module.exports = upload