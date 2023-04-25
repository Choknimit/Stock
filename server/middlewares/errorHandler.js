module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    return res.status(statusCode).json({
        error: {
            status_code: statusCode,
            message: err.message,
            validation: err.validation
        }
    })
}

// ? เป็น error กลางถ้าเมื่อไหร่ที่ catch error ได้จะวิ่งมาที่นี่
// ? ประกาศตัวแปร statusCode มาเก็บ err.StatusCode ที่ส่งจะส่งมาแบบ poperty ถ้ามีการส่ง status 400 มาตัว err.statusCode จะเอาค่าไปเก็บไว้ที่ ตัวแปร statusCode แล้วก็เอาตัวแปร statusCode มาแทนตรง res.status() <-- ตรงนี้ เพื่อจะได้เป็น status_code ตามที่ส่งมาจาก catch