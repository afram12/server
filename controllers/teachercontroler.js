const teacherModel = require('../models/teacherdb')

class teacherController {
    static teacherdisplay = async (req, res) => {
        try {
            const data = await teacherModel.find()
            res.json(data)
        } catch (error) {
            console.log(error)
        }
    }
    static teachercreate = async (req, res) => {
        try {
            //console.log(req.body)
            const { name, email, password } = req.body
            const data = await teacherModel.create({
                name,
                email,
                password
            })
            res.json(data)
        } catch (error) {
            console.log(error)

        }
    }

    static teacherview = async (req, res) => {
        try {
            const id = req.params.id
            const data = await teacherModel.findById(id)
            res.json(data)
        } catch (error) {
            console.log(error)

        }
    }

    static teacherupdate = async (req, res) => {
        try {
            const id = req.params.id
            //console.log(id)
            const { name } = req.body
            const data = await teacherModel.findByIdAndUpdate(id, {
                name, email, password
            })
            res.json(data)
        } catch (error) {
            console.log(error)

        }
    }

    static teacherdelete = async (req, res) => {
        try {
            const id = req.params.id
            const data = await teacherModel.findByIdAndDelete(id)
            res.json({
                msg: "delete succefully"
            })
        } catch (error) {
            console.log(error)

        }
    }




}

module.exports = teacherController