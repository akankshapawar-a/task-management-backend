import mongoose, { Schema } from "mongoose";

const LabelSchema=new mongoose.Schema({
    labelColor:{type:String},
    labelTitle:{type:String},
},{_id:false});
const AttachmentSchema=new mongoose.Schema({
    fileName:{type:String,required:true},
    fileUrl:{type:String,required:true},
    uploadedAt:{type:Date,default:Date.now},
});
const CardSchema=new mongoose.Schema({
    title:{type:String,required:true},
    color:{type:String},
    label:[LabelSchema],
    startDate:{type:Date,default:''},
    dueDate:{type:Date ,default:''},
    attachments:[AttachmentSchema],
    description:{type:String,default:''},
    complete:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
},{_id:true});

const ColumnSchema=new mongoose.Schema({
    title:{type:String,required:true},
    cards:[CardSchema],
    color:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
});

const Column=mongoose.model("Column",ColumnSchema);
export default Column;