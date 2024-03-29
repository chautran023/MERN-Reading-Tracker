import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import attachCookie from '../utils/attachCookies.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('Thiếu thông tin');
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError('Email đã có người dùng');
    }
    const user = await User.create({ name, email, password });
    const token = user.createJWT()
    attachCookie({res, token});
    res
        .status(StatusCodes.CREATED)
        .json({
            user: {
                name:user.name, 
                email:user.email,
                lastName:user.lastName
            }, 
            // token: token, >>> tra token bang cookie roi
            lastName:user.lastName
        }); //ko them location >>> registerUser tra ve response.data ko bao gom loction ({user, token, lastName})
}
const login = async (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password) {
        throw new BadRequestError('Thiếu thông tin');
    }
    //find the user in DB that matches the input email
    const user = await User.findOne({email}).select('+password') //because select is false in models
    if(!user) {
        throw new UnAuthenticatedError('Email người dùng chưa đăng ký');
    }
    //compare the password
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnAuthenticatedError('Password không đúng');
    }
    const token = user.createJWT()
    attachCookie({res, token});
    user.password = undefined; // ngan ko cho response password
    res.status(StatusCodes.OK).json({user,lastName:user.lastName}); //thich thi bo vi lastName co san trong user roi, bo token luon
} 
const updateUser = async (req, res) => {
    const {name, email, lastName} = req.body
    if(!name || !email || !lastName) {
        throw new BadRequestError('Vui lòng nhập đủ trường thông tin')
    }
    const user = await User.findOneAndUpdate(
        {_id:req.userInfo.userID}, 
        req.body,
        {new:true,runValidators: true})
    // user.name = name
    // user.email = email
    // user.lastName = lastName
    // await user.save()
    const token = user.createJWT()
    attachCookie({res, token});
    res.status(StatusCodes.OK).json({user,lastName:user.lastName}); //thich thi bo vi lastName co san trong user roi, bo token luon
}
const getCurrentUser = async (req, res) => {
    const user = await User.findOne({_id:req.userInfo.userID})
    res.status(StatusCodes.OK).json({user,lastName:user.lastName}); //thich thi bo vi lastName co san trong user roi, bo token luon
}
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
      });
    res.status(StatusCodes.OK).json({msg:'user logged out'}); 
}
export { register, login, updateUser, getCurrentUser, logout }