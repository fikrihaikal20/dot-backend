const user = require('../models/users.js')

module.exports = {
  checkUserId: async (data, callback) => {
    try {
      const result = await user.findOne(
        { _id: data.id },
        { nama: 1, email: 1, phone: 1, alamat: 1 }
      )

      return callback(null, result)
    } catch (err) {
      return callback(err)
    }
  },
  updateUser: async (data, callback) => {
    try {
      const result = await user.findOneAndUpdate(
        { _id: data.id },
        {
          nama: data.nama,
          alamat: data.alamat,
          email: data.email,
          phone: data.phone
        }
      ).select('nama email phone alamat')

      return callback(null, result)
    } catch (err) {
      return callback(err)
    }
  },
  deleteUser: async (data, callback) => {
    try {
      const result = await user.deleteOne({ _id: data.id })
      return callback(null, result)
    } catch (err) {
      return callback(err)
    }
  }
}
