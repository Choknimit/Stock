const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, index: true },
    password: { type: String, required: true, trim: true, minlength: 6 },
    role: { type: String, default: 'member'}
}, {
    timestamps: true,
    collection: 'users',
})

// สามารถทำ function อะไรต่างๆเพื่อมาเรียกใช้ได้ โดยใช้ตัว userSchema แล่วตามด้วย function อะไรกได้
//จะส่ง parameter password ที่ทำการกรอกเข้ามาเอามาเข้ารหัสก่อนจะ return password ที่เข้ารหัสแล้วนำไป save ลงฐานข้อมูล
userSchema.methods.encryptPassword = async function (password) { // <--
    // อย่างแรกต้อง gen salt ก่อน ประกาศตัวแปรมาเก็บ genSalt(number ยิ่งเลขมากยิ่งปลอดภัยแต่จะทำให้ช้าลง)
    const salt = await bcrypt.genSalt(10) // ganSalt ขึ้นมา 10 หลักเพื่อเอาไปผสมกับ password
    // ประกาศตัวแปร passwordHash มาเก็บค่า bcrypt.hash(password) <-- เอา password ที่ยังไม่ได้เข้ารหัสจากข้างบนมาทำการ hash แล้วใส่ตัวแปร salt ที่ได้ทำการ generate random มาใส่ แล้วเก็บค่าไว้ใน passwordHash
    const passwordHash = await bcrypt.hash(password, salt)
    // เสร็จแล้สก็ return passwordHash ออกไปเพื่อเอาไป save ลงฐานข้อมูลต่อไป
    return passwordHash
}


const user = mongoose.model('User', userSchema)
module.exports = user;

// trim ตัดช่องว่างซ้ายขวา
// minlength ความยาวต้องมากกว่า 3 ตัวขึ้นไป
// unique ไม่ให้ซ้ำกันเช่น ไม่ให้อีเมลซ้ำกัน