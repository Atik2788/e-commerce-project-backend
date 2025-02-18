const formidable = require("formidable");
const { responseReturn } = require("../../utiles/response");
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel')

class productController{

    add_product = async(req, res) =>{
        const {id} = req;

        const form = formidable({ multiples: true });

        form.parse(req, async(err, field, files) => {
            let{name, category, description, stock, price, discount, shopName, brand} = field;
            const {images} = files;
            name = name.trim()
            const slug = name.split(' ').join('-')            


            // send img in cloudinary
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })


            try {
                let allImageUrl = []
                // if images has one img then it is a obj, and loop dont work, then make it array, then it works
                const images = Array.isArray(files.images) ? files.images : [files.images];

                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.uploader.upload(images[i].filepath, {folder: 'products'});
                    // console.log("url",result.url);
                    allImageUrl = [...allImageUrl, result.url]
                }
 
                await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    shopName,
                    category: category.trim(),
                    description: description.trim(),
                    brand: brand.trim(),
                    stock: parseInt(stock),
                    price: parseInt(price),
                    discount: parseInt(discount),
                    images: allImageUrl,
                })
                responseReturn(res, 201, {message: "Product Added Successfully"})


            } catch (error) {
                responseReturn(res, 500, {error: error.message})
            }
             

          });
    }
    // end add_product method


    products_get = async(req, res) =>{
        console.log(req.query);
        console.log(req.id);

        const {page, searchValue, parPage} = req.query;
        const {id} =  req;

        skipPage = parseInt(parPage) * (parseInt(page) - 1)

        try {
            if (searchValue ) {
                            const products = await productModel.find({
                                $text: {$search: searchValue},
                                sellerId: id
                            }).skip(skipPage).limit(parPage).sort({createdAt: -1})
            
                            const totalProduct = await productModel.find({
                                $text: {$search: searchValue},
                                sellerId: id
                            }).countDocuments()
                            responseReturn(res, 200, {products, totalProduct})            
                        }else{
                            
                        }
        } catch (error) {
            
        }

    }
}


module.exports = new productController()