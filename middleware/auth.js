import { UnAuthenticatedError } from "../errors/index.js"
import jwt from 'jsonwebtoken'
const auth = async (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.token
    if (!token) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }
    //------start of checking for request headers.authorization------
    // const authHeader = req.headers.authorization
    // if(!authHeader || !authHeader.startsWith('Bearer ')) {
    //     throw new UnAuthenticatedError('Authentication Invalid')
    // }
    // const token = authHeader.split(' ')[1]
    //------end of checking for request headers.authorization------
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userInfo = payload //send this user ID to next middleware (items/jobs routes...)
        //req.userInfo = {userID : payload.userID}
        const testUser = payload.userID === '648984e4e8f824bc1ca16da7'
        payload.testUser = testUser
        next()
    } catch (err) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }
}
export default auth