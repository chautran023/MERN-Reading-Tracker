import { BadRequestError } from "../errors/index.js";

const testUser = (req, res, next) => {
    if (req.userInfo.testUser) {
        throw new BadRequestError('Đây Là Tài Khoản Demo. Chỉ Để Xem!')
    }
    next()
}
export default testUser