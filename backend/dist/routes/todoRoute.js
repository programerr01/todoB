"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const Todo_1 = __importDefault(require("../models/Todo"));
const router = express_1.default.Router();
exports.todoRouter = router;
router.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const todos = yield Todo_1.default.find({ userId });
        res.json(todos);
    }
    catch (err) {
        console.log("Error has occured", err);
        res.status(500).json({ message: 'Server Error' });
    }
}));
router.post("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { title, description } = req.body;
    try {
        const todo = new Todo_1.default({ userId, title, description });
        yield todo.save();
        res.status(201).json(todo);
    }
    catch (err) {
        console.log("Error has occured", err);
        res.status(500).json({ message: 'Server Error' });
    }
}));
router.put("/:userId/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, todoId } = req.params;
    const { title, description, completed } = req.body;
    try {
        const todo = yield Todo_1.default.findOneAndUpdate({ _id: todoId, userId }, { title, description, completed }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: "Todo not Found" });
        }
        res.json(todo);
    }
    catch (err) {
        console.log("Some Error occured while updating", err);
        res.status(500).json({ message: "server error" });
    }
}));
//# sourceMappingURL=todoRoute.js.map