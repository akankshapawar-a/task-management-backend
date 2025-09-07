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
const{title,color,label,startDate,dueDate,attachments,createdAt,updatedAt}=req.body;
try{
const column=await Column.findById(columnId);
console.log('column',column);
console.log('console',columnId);
if(!column || column.userId.toString() !== req.user.id)
    return res.status(403).json({message:'Not allowed'});
column.cards.push({title,color,label,startDate,dueDate,attachments,createdAt,updatedAt});
await column.save();
 return res.status(200).json({
    status:'SUCCESS',
    message:"Cards Created Successfully",
    column});
}catch(error){
        return res.status(500).json({message:error.message});
    }
};

export const addLablesCard=async(req,res)=>{
const {cardId}=req.params;
const{ labelTitle,labelColor }=req.body;
try{
const column=await Column.findOne({
    userId:req.user.id,
    'cards._id':cardId
});
console.log('column',column);
console.log('console',cardId);
if(!column)
    return res.status(404).json({ message: 'Column or card not found' });
const card=column.cards.id(cardId);
if(!card){
     return res.status(404).json({ message: 'Card not found' });
}
if(!Array.isArray(card.label))card.label=[];
card.label.push({labelTitle,labelColor});
await column.save();
 return res.status(200).json({
    status:'SUCCESS',
    message:"Label added to card successfully",
    column});
}catch(error){
        return res.status(500).json({message:error.message});
    }
};

export const getCardData = async (req, res) => {
    try {
        const { id: cardId } = req.params;
        const userId = req.user.id;
        const column = await Column.findOne({
            userId: userId,
            'cards._id': cardId
        });
        if (!column) {
            return res.status(404).json({
                success: false,
                message: 'Card not found'
            });
        }
        const card = column.cards.id(cardId);
        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'Card not found'
            });}
             return res.status(200).json({
            success: true,
            data: {
                card: card,
                columnId: column._id,
                columnTitle: column.title
            }
        });
} catch (error) {
        console.error('Error fetching card data:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
