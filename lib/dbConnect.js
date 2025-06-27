import mongoose from "mongoose";
const DATABASE_URI=process.env.DATABASE_URI;


if(!DATABASE_URI) throw new Error('Database URI Not Found.')
  
  console.log(DATABASE_URI)

let cachedConnection=global.mongoose;

if(!cachedConnection){
    cachedConnection=global.mongoose={
        conn:null,
        promise:null
    };
}

export default async function dbConnect() {
    if (cachedConnection.conn) {
        console.log('Using existing MongoDB Connection')
    return cachedConnection.conn;
  }
  if (!cachedConnection.promise) {
    console.log('Connecting to MongoDB...')
    cachedConnection.promise = mongoose.connect(DATABASE_URI, {
      bufferCommands: false, // recommended to disable buffering
    }).then((mongooseInstance)=>{
        console.log('MongoDB connected successfully.')
        return mongooseInstance;
    }).catch((error)=>{
        console.log('MongoDB Connection error:',error);
        throw error;
    })
  }

  cachedConnection.conn = await cachedConnection.promise;
  return cachedConnection.conn;
    
}