const mongoose= require('mongoose')
const connectdb=async()=>{
   await  mongoose.connect(process.env.MONGODB_URL)
   console.log(`database connected on  host ${mongoose.connection.host.blue}`)
}

module.exports = connectdb