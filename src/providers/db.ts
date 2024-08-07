import mongoose from "mongoose";

const mongo_str = process.env.mongostr;
const dbName = "weather_touch";

export async function connectDatabase() {
  try {
    await mongoose.connect(mongo_str as string, { dbName });
    console.log(`Mongo connected to ${dbName}`);
  } catch (error) {
    throw error;
  }
}
