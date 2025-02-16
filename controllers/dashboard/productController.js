const formidable = require("formidable");
const { responseReturn } = require("../../utiles/response");
const cloudinary = require('cloudinary').v2;

class productController{

    add_product = async(req, res) =>{
         const form = new formidable.IncomingForm({ multiples: true });

       from.parse(req, async(err, field, files) =>{
        if(err){
            console.log(err);
        }
        console.log(files[0]);
        console.log(field);
       })
    }
}


module.exports = new productController()