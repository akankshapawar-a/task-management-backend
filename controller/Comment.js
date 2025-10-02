import comment from "../Model/Comments.model.js";

export const newComment=async(req,res)=>{
    try{
    const newComment=new comment({
        name:req.body.name,
        cardId:req.body.cardId,
        comments:req.body.comments,
    });
    const data=await newComment.save();
     return res.status(200).json({
            status: 'SUCCESS',
           data
        });
}catch(error){
            res.status(500).json({ error: "Failed to create a comment", errorMessage: error.message });
}
}

export const getComment=async(req,res)=>{
    try{
        const comments=await comment.find();
         return res.status(200).json({
            status: 'SUCCESS',
           comments
        });

    } catch (error) {
            res.status(500).json({ error: "Failed to get a comment", errorMessage: error.message });
}}

export const deleteComment=async(req,res)=>{
    const {id}=req.params;
    try{
      await comment.findOneAndDelete({_id:id});
         return res.status(200).json({
            status: 'SUCCESS',
        });

    }catch (error) {
       res.status(500).json({ error: "Failed to Delete Comment", errorMessage: error.message });
}
}

export const editComment=async(req,res)=>{
try{
const {id}=req.params;
const {comments}=req.body;
const updateComment=await comment.findByIdAndUpdate(
    id,
    {comments},
    {new:true}
);
return res.status(200).json({
    status:"SUCCESS",
    message:"Comment Updated Successfully",
    data:updateComment
})
}catch (error) {
    res.status(500).json({error: "Failed to update comment", errorMessage: error.message});
  }
}