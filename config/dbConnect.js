const { default: mongoose } = require("mongoose")

const dbConnect=()=>{
    try{
        const conn = mongoose.connect(process.env.URL)
        console.log("Database Connected")
    }catch(error){
        console.log("Database error")
    }
}
module.exports = dbConnect;