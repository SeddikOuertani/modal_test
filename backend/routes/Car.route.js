const express = require('express');
const carRoute = express.Router();
const multer = require('multer');

const carPicUploadMw = require('../middleware/carPicUpload');

// Car model
let car = require('../models/Car');


// CarPic model
const CarPic = require('../models/CarPic');

carRoute.route('/create').post((req, res, next) => {

  let newCar = req.body;

  car.create(newCar, (error, data) => {
      if (error){
        return next(error)
      }
      else {
        res.json(data)
        console.log('Car Created successfully !')
      }
  })

});
// Get All Cars
carRoute.route('/').get((req, res) => {
  car.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('request for car list is successful')
    }
  })
})
// Get single Car
carRoute.route('/read/:id').get((req, res) => {
  car.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('Car found')
    }
  })
})

// Update Car
carRoute.route('/update/:id').put((req, res, next) => {
  car.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Car updated successfully')
    }
  })
})
// Delete Car
carRoute.route('/delete/:id').delete((req, res, next) => {
  car.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({msg : data})
      console.log('Car deleted successfully');
    }
  })
})

module.exports = carRoute;