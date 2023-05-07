const user = require('../models/users.js')

module.exports = {
  checkUserEmail: async (data, callback) => {
    try {
      const result = await user.findOne(
        { email: data.email }
      )
      return callback(null, result)
    } catch (err) {
      return callback(err)
    }
  },
  insertUser: async (data, callback) => {
    try {
      const result = await user.insertMany({
        nama: data.nama,
        email: data.email,
        password: data.password
      })

      return callback(null, result)
    } catch (err) {
      return callback(err)
    }
  }
}
