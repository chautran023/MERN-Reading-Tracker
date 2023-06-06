import Item from '../models/Item.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

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
    res.send('get all items')
}

const updateItem = async (req, res) => {
    res.send('update item')
}

const deleteItem = async (req, res) => {
    res.send('delete item')
}

const showStats = async (req, res) => {
    res.send('show stats')
}


export { createItem, deleteItem, getAllItems, updateItem, showStats };
