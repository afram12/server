const express = require('express')
const ContactController = require('../controllers/ContancController')
const teacherController = require('../controllers/teachercontroler')
const coursecontroller = require('../controllers/coursecontroller')
const usercontroller = require('../controllers/usercontroller')
const router = express.Router()
const checkAuth= require("../middleware/auth")
const BookingController = require('../controllers/Bookingcontroller')

//contact 
router.get('/contact', ContactController.display)
router.post('/create', ContactController.create)
router.get('/view/:id', ContactController.view)
router.put('/update/:id', ContactController.update)
router.delete('/delete/:id', ContactController.delete)

//teacher 
router.get('/teacher', teacherController.teacherdisplay)
router.post('/teachercreate', teacherController.teachercreate)
router.get('/teacherview/:id', teacherController.teacherview)
router.put('/teacherupdate/:id', teacherController.teacherupdate)
router.delete('/teacherdelete/:id', teacherController.teacherdelete)



//course
router.get('/course', coursecontroller.coursedisplay)
router.post('/coursecreate', coursecontroller.coursecreate)
router.get('/courseview/:id', coursecontroller.courseview)
router.put('/courseupdate/:id', coursecontroller.courseupdate)
router.delete('/coursedelete/:id', coursecontroller.coursedelete)


//user
router.post('/register', usercontroller.register)
router.post('/login', usercontroller.login)
router.get('/profile', checkAuth,usercontroller.profile)
router.get('/logout', checkAuth,usercontroller.logout)

//booking 
router.post ('/booking/create/:courseId',checkAuth,BookingController.createBooking)
router.get ('/booking/mybookings',checkAuth,BookingController.getUserBookings)
router.get ('/admin/bookings',checkAuth,BookingController.getAllBookings)


module.exports = router
