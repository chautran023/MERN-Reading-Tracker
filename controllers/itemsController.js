import Item from '../models/Item.js';
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError, NotFoundError } from '../errors/index.js';
import moment from 'moment'

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
    const {status, genres, purpose, sort, search, numericFilters } = req.query
    const queryObject = {
        createdBy:req.userInfo.userID
    }
    //add conditions
    if(status !== 'tất cả') {
        queryObject.status = status
    }
    if(genres !== 'tất cả') {
        queryObject.genres = genres
    }
    if(purpose !== 'tất cả') {
        queryObject.purpose = purpose
    }
    //search
    if(search) {
        queryObject.itemName = {$regex:search, $options:'i'}
    }
    //filter theo price
    if(numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
          };
          const regEx = /\b(<|>|>=|=|<=)\b/g
          let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
          );
            console.log(filters);
          const options = ['price'];
          filters = filters.split(',').forEach((item) => {
            const [field, operator, value, operator2, value2] = item.split('-');
            if (options.includes(field)) {
                if(operator2 === undefined) {
                        queryObject[field] = { [operator]: Number(value) };
                        console.log(queryObject)

                }
                else {
                    queryObject[field] = { [operator]: Number(value),[operator2]:Number(value2) };
                    console.log(queryObject)

                }
            }
          });
          console.log(queryObject)
    }   
    let result = Item.find(queryObject)
    // chain sort conditions
    if (sort === 'mới nhất') {
        result = result.sort('-createdAt');
      }
      if (sort === 'cũ nhất') {
        result = result.sort('createdAt');
      }
      if (sort === 'a-z') {
        result = result.sort('itemName').collation({ locale: "vi", caseLevel: true });
      }
      if (sort === 'z-a') {
        result = result.sort('-itemName').collation({ locale: "vi", caseLevel: true });
      }
      
     // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    const items = await result

    const numOfItems = await Item.countDocuments(queryObject);
    const numOfPages = Math.ceil(numOfItems / limit);

    res.status(StatusCodes.OK).json({ numOfItems, numOfPages, items });
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
    let statStatus = await Item.aggregate([
        {$match:{createdBy:mongoose.Types.ObjectId(req.userInfo.userID)}},
        {$group:{_id:'$status', count:{$sum:1}}},
    ])
    let statGenres = await Item.aggregate([
        {$match:{createdBy:mongoose.Types.ObjectId(req.userInfo.userID)}},
        {$group:{_id:'$genres', count:{$sum:1}}},
    ])
    let statPurpose = await Item.aggregate([
        {$match:{createdBy:mongoose.Types.ObjectId(req.userInfo.userID)}},
        {$group:{_id:'$purpose', count:{$sum:1}}},
    ])
    //reduce
    statStatus = statStatus.reduce((acc, curr) => {
        const {_id:title, count} = curr
        acc[title] = count
        return acc
    },{})
    //default
    const defaultStatStatus = {
        'đang đọc': statStatus['đang đọc'] || 0,
        'chưa đọc': statStatus['chưa đọc'] || 0,
        'đã đọc': statStatus['đã đọc'] || 0,
    }
    //chart: monthly new books bought
    let monthlyApplications =  await Item.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.userInfo.userID) } },
        {
          $group: {
            _id: {
              year: {$year: '$createdAt',},
              month: {$month: '$createdAt',},
            },count: {$sum: 1}, total: { $sum: "$price" }
          },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 }, //6 latest months
    ])
    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: {year, month}, count, total} = item
        const date = moment().month(month - 1).year(year).locale('vi').format('MMM Y')
        return {date, count, total}
    }).reverse()

    //chart: monthly cost
    // let monthlyCost =  await Item.aggregate([
    //     { $match: { createdBy: mongoose.Types.ObjectId(req.userInfo.userID) } },
    //     {
    //       $group: {
    //         _id: {
    //           year: {$year: '$createdAt',},
    //           month: {$month: '$createdAt',},
    //         },total: { $sum: "$price" } }
    //     },
    //     { $sort: { '_id.year': -1, '_id.month': -1 } },
    //     { $limit: 6 }, //6 latest months
    // ])
    // monthlyCost = monthlyCost.map((item) => {
    //     const { _id: {year, month}, total} = item
    //     const date = moment().month(month - 1).year(year).locale('vi').format('MMM Y')
    //     return {date, total}
    // }).reverse()
    res.status(StatusCodes.OK).json({defaultStatStatus, monthlyApplications })
}


export { createItem, deleteItem, getAllItems, updateItem, showStats };
