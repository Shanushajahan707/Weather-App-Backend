import app from "./app";
import dotenv from "dotenv";
import router from "./routes/user";
import { connectDatabase } from "./providers/db";

dotenv.config();
connectDatabase();
const port = process.env.port || 3001;

app.use("/user", router);
app.listen(port, () => {
  console.log(`Server started at port ${port} !`);
});
