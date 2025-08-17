import Column from "../Model/Column.model.js";

export const getColumn=async(req ,res)=>{

const columns=await Column.find();
return res.status(200).json({
    status:'SUCCESS',
    message:"Data Fetch Successfully",
    columns});
};

export const createColumn=async(req,res)=>{
    const {title}=req.body;
    try{
    const newColumn=new Column({
        title,
        cards:[],
        userId:req.user.id,
    });
    await newColumn.save();
    return res.status(200).json({ status:'SUCCESS',
        message:"Column create Successfully",
    });
    }catch(error){
        return res.status(500).json({errorMessage:error});
    }

}

export const addCard=async(req,res)=>{
const {columnId}=req.params;
const{title,color}=req.body;
try{
const column=await Column.findById(columnId);
console.log('column',column);
console.log('console',columnId);
// if(!column || column.userId.toString() !== req.user.id)
//     return res.status(403).json({message:'Not allowed'});
column.cards.push({title,color});
await column.save();
 return res.status(200).json({
    status:'SUCCESS',
    message:"Cards Created Successfully",
    column});
}catch(error){
        return res.status(500).json({message:error.message});
    }

};