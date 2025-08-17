import mongoose, { Schema } from "mongoose";
const CardSchema=new mongoose.Schema({
    title:{type:String,required:true},
    color:{type:String}
});

const ColumnSchema=new mongoose.Schema({
    title:{type:String,required:true},
    cards:[CardSchema],
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
});

const Column=mongoose.model("Column",ColumnSchema);
export default Column;