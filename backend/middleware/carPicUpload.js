const multer = require('multer')

module.exports.uploadCarPic = () => {
    const pictureStorage = multer.diskStorage({
        destination : "../assets/images/car_pictures",
        filename : (req, file, cb) => req.params.carId,
    });

    const pictureFileFilter = (req, file, cb) =>{
        if(!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)){
            return cb(new Error('You can only upload image files!'),false);
        }
    }

    return multer({pictureFileFilter, pictureStorage});
}
;