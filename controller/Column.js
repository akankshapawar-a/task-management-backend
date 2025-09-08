import Column from "../Model/Column.model.js";
// fetch columns all cards data
export const getColumn=async(req ,res)=>{  
const columns=await Column.find();
return res.status(200).json({
    status:'SUCCESS',
    message:"Data Fetch Successfully",
    columns});
};
// add cards in means whole cards
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

//add cards while clicing on cards
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


//get particular card info
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


export const updateCardLables = async (req, res) => {
    const { cardId } = req.params;
    const { labels } = req.body; 
    
    try {
 
        const column = await Column.findOne({
            userId: req.user.id,
            'cards._id': cardId
        });
        
        if (!column) {
            return res.status(404).json({ message: 'Card not found' });
        }
        
        const card = column.cards.id(cardId);
        if (!card) {
            return res.status(404).json({
                message: 'Card not found'
            });
        }

        card.label = Array.isArray(labels) ? labels : [];
        card.updatedAt = new Date();
        
        await column.save();
        
        const updatedColumn = await Column.findOne({
            userId: req.user.id,
            'cards._id': cardId
        });
        const updatedCard = updatedColumn.cards.id(cardId); 
        return res.status(200).json({
            status: 'SUCCESS',
            message: "Card labels updated successfully",
            card: updatedCard 
        });
        
    } catch (error) {
        console.error('Error updating card labels:', error);
        return res.status(500).json({
            message: error.message
        });
    }
};