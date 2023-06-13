import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

mongoose.set('strictQuery', false);

const ItemSchema = new mongoose.Schema({
    itemName: {
      type: String,
      required: [true, 'Vui lòng nhập tên'],
      trim: true,
      maxlength: 100,
    },
    author: {
        type: String,
        required: [true, 'Vui lòng nhập tác giả/dịch giả'],
        trim: true,
        maxlength: 50,
    },
    price: {
      type: Number,
      trim: true,
      maxlength: 50,
    },
    seller: {
      type: String,
      required: [true, 'Vui lòng nhập nhà bán hàng/kênh mua hàng'],
      trim: true,
      maxlength: 50,
    },
    genres: {
      type: String,
      enum:['văn học','phi hư cấu','kịch','thơ','truyện dân gian' ],
      default: 'văn học',
    },
    status: {
        type: String,
        enum:['chưa đọc','đang đọc','đã đọc'],
        default: 'chưa đọc',
    },
    purpose: {
        type: String,
        enum:['tăng kiến thức','giải trí','giáo dục','sưu tầm'],
        default: 'tăng kiến thức',
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,'Please provide user']
    }
},
{timestamps: true}
)

export default mongoose.model('Item', ItemSchema)
