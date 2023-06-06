import Item from '../models/Item.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError, NotFoundError } from '../errors/index.js';

const createItem = async (req, res) => {
    const { itemName, author, seller } = req.body;
    if (!itemName || !author || !seller) {
        throw new BadRequestError('Please Provide All Values');
    }
    req.body.createdBy = req.userInfo.userID;
    const item = await Item.create(req.body);
    res.status(StatusCodes.CREATED).json({ item });
}

const getAllItems = async (req, res) => {
    const items = await Item.find({createdBy:req.userInfo.userID})
    res.status(StatusCodes.OK).json({ items, numOfItems: items.length, numOfPages: 1 });
}

const updateItem = async (req, res) => {
    const {id:itemId} = req.params
    const {itemName, author, seller} = req.body
    if (!itemName || !author || !seller) {
        throw new BadRequestError('Please Provide All Values');
    }
    const item = await Item.findOne({_id:itemId})
    if(!item) {
        throw new NotFoundError(`No Item with id ${itemId}`);
    }
    // console.log(req.userInfo.userID)
    // console.log(item.createdBy.toString())
    // console.log(req.userInfo.userID===item.createdBy.toString())
    if(req.userInfo.userID===item.createdBy.toString()){
        const updatedItem = await Item.findOneAndUpdate(
            {_id:itemId}, 
            req.body,
            {new:true, runValidators:true}
        );  
        res.status(StatusCodes.OK).json({updatedItem})
    }
    if(req.userInfo.userID!==item.createdBy.toString()){
        throw new UnAuthenticatedError('Not authorized to access this route/you cannot touch other users data')
    }
    
    }
const deleteItem = async (req, res) => {
    const {id:itemId} = req.params
    const item = await Item.findOne({_id:itemId})
    if(!item) {
        throw new NotFoundError(`No Item with id ${itemId}`);
    }
    if(req.userInfo.userID===item.createdBy.toString()){
        const updatedItem = await Item.findOneAndDelete(
            {_id:itemId}, 
        );  
        res.status(StatusCodes.OK).json({msg:'deleted item successfully'})
    }
    if(req.userInfo.userID!==item.createdBy.toString()){
        throw new UnAuthenticatedError('Not authorized to access this route/you cannot touch other users data')
    }
}

const showStats = async (req, res) => {
    res.send('show stats')
}


export { createItem, deleteItem, getAllItems, updateItem, showStats };
