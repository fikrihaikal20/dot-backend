const {
  checkUserEmail,
  insertUser
} = require('../services/auth')
const { ERROR, SUCCESS } = require('../utils/constant')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { payloadCheck } = require('../middlewares/payload')

const secret = process.env.JWT_SECRET;
let payload
const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

module.exports = {
  signup: async (req, res) => {
    try {
      payload = {
        nama: '',
        email: '',
        password: '',
      }

      const verify = payloadCheck(req.body, payload, ['nama', 'email', 'password'])
      if (!verify.status) return ERROR(res, 502, false, verify.message)

      if (!req.body.email.match(pattern)) return ERROR(res, 400, false, 'Email is not valid')

      const encryptedPassword = await bcrypt.hash(req.body.password, 10)
      req.body.password = encryptedPassword

      checkUserEmail(req.body, (error, result) => {
        if (error) return ERROR(res, 500, false, error.message)

        if (result) return ERROR(res, 409, false, 'email sudah terdaftar')

        insertUser(req.body, (error, result) => {
          if (error) return ERROR(res, 500, false, error.message)

          const responseData = {
            _id: result[0]._id,
            nama: result[0].nama,
            email: result[0].email,
          }

          return SUCCESS(res, 200, true, 'berhasil register', responseData)
        })
      })
    } catch (err) {
      console.log(err)
      return ERROR(res, 500, false, err.message)
    }
  },

  signin: async (req, res) => {
    try {
      payload = {
        email: '',
        password: '',
      }

      const verify = payloadCheck(req.body, payload, ['email', 'password'])
      if (!verify.status) return ERROR(res, 502, false, verify.message)

      checkUserEmail({ email: req.body.email }, (error, result) => {
        if (error) return ERROR(res, 500, false, error.message)

        if (result) {
          const checkPassword = bcrypt.compareSync(req.body.password, result.password)
          if (checkPassword) {
            const token = jwt.sign({
              user: {
                id: result._id,
                email: result.email,
                nama: result.nama,
              }
            }, secret, { expiresIn: '1h' })
            return SUCCESS(res, 200, true, 'berhasil login', token)
          } else {
            return ERROR(res, 403, false, 'password yang anda masukan salah')
          }
        } else {
          return ERROR(res, 404, false, 'email tidak ditemukan')
        }
      })
    } catch (err) {
      console.log(err)
      return ERROR(res, 500, false, 'internal server error')
    }
  }
}
