import mongoose from "mongoose";


const mongooseconection = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongoose connect successfully !");

    } catch (error) {
        console.log(error);

    }

}

export default mongooseconection
