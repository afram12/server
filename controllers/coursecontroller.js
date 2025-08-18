const { url } = require('inspector');
const courseModel = require('../models/course')
const cloudinary = require('cloudinary')

// Configuration
cloudinary.config({
    cloud_name: 'dqfuuc9zh',
    api_key: '264158389892637',
    api_secret: 'XtRyvy4rP_JjGX0Qk6P3X98p07s' // Click 'View API Keys' above to copy your API secret
});

class coursecontroller {

    static coursedisplay = async (req, res) => {
        try {
            const data = await courseModel.find()
            res.json(data)
        } catch (error) {
            console.log(error)
        }
    }
    static coursecreate = async (req, res) => {
        try {
            console.log(req.files)
            const { title, description, price, duration } = req.body
            const file = req.files.image
            //console.log(file)

            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Tanishk_slider'
            })
            // console.log(imageUpload)
            const data = await courseModel.create({
                title,
                description,
                price,
                duration,
                image: {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url
                }
            })
            res.json(data)
        } catch (error) {
            console.log(error)

        }
    }

    static courseview = async (req, res) => {
        try {
            const id = req.params.id
            const data = await courseModel.findById(id)
            res.json(data)
        } catch (error) {
            console.log(error)

        }
    }


    static courseupdate = async (req, res) => {
        try {
            const id = req.params.id
            console.log(id)
            const { name } = req.body
            const data = await courseModel.findByIdAndUpdate(id, {
                title,
                discription,
                price,
                duration
            })
            res.json(data)
        } catch (error) {
            console.log(error)

        }
    }


    static coursedelete = async (req, res) => {
        try {
            const id = req.params.id
            const data = await courseModel.findByIdAndDelete(id)
            res.json({
                msg: "delete succefully"
            })
        } catch (error) {
            console.log(error)

        }
    }

}

module.exports = coursecontroller