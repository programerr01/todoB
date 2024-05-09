import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { todoRouter } from "./routes/todoRoute";
import { randomInt } from "crypto";
require("dotenv").config();
const app = express(); 
const PORT = 3000;

console.log(process.env.MONGODB_URL)
app.use(bodyParser.json());
var possible_options = [
  '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'
]
function generateId(){
  var final_str : String  = "";
  var i : number = 0;
  for(i = 0;i < 24;i++){
      final_str += possible_options[randomInt(0,16)];
  }
  return final_str;

}

// connecting with database 
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(function(req,res,next){
  	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
 	res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With");
	next();
});

app.get('/', (req, res) => {
res.send('Hello World!');
});


app.use('/todo',todoRouter);


// generate new user Id for session 
app.get("/user",(req,res)=>{
  res.send(generateId())
})

// Start the server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
  
