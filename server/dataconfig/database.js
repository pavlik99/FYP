import mongoose from "mongoose";

const connDB = async () => {
    try{
        const connection  = await mongoose.connect(process.env.MONGO_URI, {

            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log(`Database connected: ${connection.connection.host}`)
    } catch (error) {
        console.error(`Fault: ${error.message}`)
        process.exit(1)
    }
}

export default connDB