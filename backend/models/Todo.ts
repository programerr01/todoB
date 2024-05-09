import mongoose, {Schema, Document} from "mongoose";

export  interface ITodo extends Document{
    userId : string;
    title : string;
    description : string;
    completed : boolean;
};


const TodoSchema  : Schema = new Schema({
    userId : { type: Schema.Types.ObjectId, ref:'User',required:true},
    title : {type:String, required:true},
    description : {type:String,required:true},
    completed : {type:Boolean , default: false}
})

export default mongoose.model<ITodo>("Todo",TodoSchema);
