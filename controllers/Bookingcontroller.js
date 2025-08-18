const Booking = require("../models/Booking"); // Booking model
const Course = require("../models/course"); // Course model

class BookingController {
  // static arrow function to create booking
  static createBooking = async (req, res) => {
    try {
      const { courseId } = req.params;
      const userId = req.user._id; // assume JWT middleware sets req.user
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const newBooking = await Booking.create({
        course: course._id,
        user: userId,
        price: course.price,
      });

      return res.status(201).json({
        message: "Booking created succesfully",
        booking: newBooking,
      });
      
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error"})
    }
  };

  // Static arrow function to get user bookings
static getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate("course", "title price")
      .sort({ createdAt: -1 });

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Static arrow function to cancel booking
static cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Server error"});
  }
};


// Static arrow function to get all  booking
static getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email") // user ka name & email
      .populate("course", "title price") // course ka title & price
      .sort({ createdAt: -1 });

    // Format response
    const formatted = bookings.map(b => ({
      _id: b._id,
      userName: b.user.name,
      userEmail: b.user.email,
      courseTitle: b.course.title,
      price: b.course.price,
      status: b.status,
      createdAt: b.createdAt,
    }));

    res.status(200).json(formatted);
} catch (err) {
    console.error(err);
    res.status(500).json({message: "Server error"});
}

};
}

module.exports = BookingController;