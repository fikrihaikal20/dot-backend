const dotenv = require('dotenv')
const mongoose = require('mongoose');
dotenv.config()
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)

