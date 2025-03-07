const formidable = require("formidable");
const { responseReturn } = require("../../utiles/response");
const cloudinary = require('cloudinary').v2;
const categoryModel = require('../../models/categoryModel');
const sellerModel = require("../../models/sellerModel");

class sellerController{

    request_seller_get = async(req, res) =>{
        const {page, searchValue, parPage } = req.query;
        const skipPage = parseInt(parPage) * (parseInt(page) -1)

        try {
            if(searchValue){

            }
            else{
                const sellers = await sellerModel.find({status:'pending'}).skip(skipPage).limit(parPage).sort({createdAt: -1})
                const totalSeller = await sellerModel.find({status: 'pending'}).countDocuments()
                responseReturn(res, 200,{sellers, totalSeller})
            }
        } catch (error) {
            responseReturn(res, 500,{error: error.message}) 
        }
    }
    //  ******* end request_seller_get method  ***********


    get_seller = async(req, res) =>{
        const {sellerId} = req.params;
        // console.log(sellerId); 

        try {
            const seller = await sellerModel.findById(sellerId)
            responseReturn(res, 200,{seller})
        } catch (error) {
            responseReturn(res, 500,{error: error.message}) 
        }
    }
    //  ******* end get_seller method  ***********

    
    seller_status_update = async(req, res) =>{
        const {sellerId, status} = req.body;
        // console.log(sellerId, status); 

        try {
            await sellerModel.findByIdAndUpdate(sellerId,{status})
            const seller = await sellerModel.findById(sellerId)
            responseReturn(res, 200,{seller, message: 'Seller Status Updated Successfully!'})
        } catch (error) {
            responseReturn(res, 500,{error: error.message}) 
        }
    }
    //  ******* end seller_status_update method  ***********


}



module.exports = new sellerController()