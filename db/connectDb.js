const mongoose = require("mongoose");
// const Live_url =
//   "mongodb+srv://tanishk107:tanishk107@cluster0.htndl7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
 const connectDb = async () => {
  return mongoose
    .connect(process.env.Live_url)
    .then(() => {
      console.log("connection stabilished successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDb;
