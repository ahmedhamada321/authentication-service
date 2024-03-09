import mongoose from "mongoose";


const connctionDb  = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/graphql")
        console.log("DB conncted ");
        
    }catch{
        console.error("cannot connct with mongodb ")
        process.exit(1)
    }
}

export default connctionDb