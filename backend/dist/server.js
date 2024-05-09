"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const todoRoute_1 = require("./routes/todoRoute");
const crypto_1 = require("crypto");
require("dotenv").config();
const app = (0, express_1.default)();
const PORT = 3000;
console.log(process.env.MONGODB_URL);
app.use(body_parser_1.default.json());
var possible_options = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'
];
function generateId() {
    var final_str = "";
    var i = 0;
    for (i = 0; i < 24; i++) {
        final_str += possible_options[(0, crypto_1.randomInt)(0, 16)];
    }
    return final_str;
}
// connecting with database 
mongoose_1.default.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With");
    next();
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/todo', todoRoute_1.todoRouter);
// generate new user Id for session 
app.get("/user", (req, res) => {
    res.send(generateId());
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map