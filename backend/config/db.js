import mongoose from 'mongoose'

export const connectDb = async ()=>{
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        //console.log(process)
        console.log(`Mongodb connected: ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`Mongodb connection error: ${error.message}`)
        process.exit(1);
    }
}

