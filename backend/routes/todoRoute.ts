import express, {Request, Response} from "express";
import Todo, { ITodo } from '../models/Todo';

const router  = express.Router();


router.get("/:userId", async ( req: Request, res: Response) =>{
    const { userId } = req.params;

    try{
        const todos: ITodo[] = await Todo.find({userId});
        res.json(todos);


    }
    catch(err){
        console.log("Error has occured", err);
        res.status(500).json({ message: 'Server Error' });

    }
});

router.post("/:userId",async (req: Request,res: Response) =>{
    const { userId }  = req.params;
    const { title, description } = req.body;
    try{
        const todo: ITodo = new Todo({ userId, title, description });
        await todo.save();
        res.status(201).json(todo);
    
    }
    catch(err){
        console.log("Error has occured", err);
        res.status(500).json({ message: 'Server Error' });
    }

})

router.put("/:userId/:todoId", async ( req: Request, res : Response)=>{
    const { userId ,todoId } = req.params;
    const { title , description, completed } = req.body;

    try{
        const todo : ITodo | null = await Todo.findOneAndUpdate(
        {_id : todoId, userId} , {title, description,completed },
        { new : true}
        )
        if(!todo){
            return res.status(404).json({message:"Todo not Found"});
        }
        res.json(todo);
    }
    catch(err){
        console.log("Some Error occured while updating", err);
        res.status(500).json({message:"server error"});
    }
})

export { router as todoRouter };