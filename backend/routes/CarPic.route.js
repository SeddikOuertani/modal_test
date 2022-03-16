const express = require('express');
const carPicRoute = express.Router();
const multer = require('multer');

const carPicUploadMw = require('../middleware/carPicUpload');

// CarPic model
const CarPic = require('../models/CarPic');

// downloadCarPics


carPicRoute.route('/:carId').get((req,res,next)=>{

    CarPic.find({carId : req.params.carId}, async (error,data) => {  
        if(error){
            console.log("error processing get request for car with id "+req.params.carId);
            return next(error)
        }else{
            res.json(data)
        }
    })
})

// add Car Pic
carPicRoute.route('/add/:carId').post(carPicUploadMw.uploadCarPic().array('carPic'), (req, res, next) => {
    if(req.files){
        console.log(req.files[0].location);
        let carPic = {
            name : req.files[0].fieldName,
            carId : req.params.carId,
            file : req.files[0],
        }
        console.log(req.files)

        CarPic.create(carPic, (error, data) => {
            if(error){
                console.log("Error saving pic");
                return next(error)
            }else{
                console.log("Picture added successfully")
                res.json(data).status(200);
            }
        })
    }else{
        console.log(req.files)
    }
})

//delete Car pic
carPicRoute.route('/delete/:picId').delete((req, res, next) => {
    CarPic.findOneAndRemove(req.params.id , (error, data) => {
        if(error){
            console.log(`Error deleting pic ${req.params.picId}`);
            return next(error)
        }else{
            console.log('Car pic deleted Successfully !');
            res.json(data).status(200);
        }
    })
})

module.exports = carPicRoute;