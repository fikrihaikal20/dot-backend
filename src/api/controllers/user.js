const {
  checkUserId,
  updateUser,
  deleteUser
} = require('../services/user')
const { ERROR, SUCCESS } = require('../utils/constant')

module.exports = {
  updateUserProfile: async (req, res) => {
    try {
      const { id } = req.user.user
      req.body.id = id
      updateUser(req.body, (error, result) => {
        if (error) return ERROR(res, 500, false, error.message)

        if (!result) return ERROR(res, 404, false, 'user tidak ditemukan')

        return SUCCESS(res, 200, true, 'berhasil update profile', result)
      })
    } catch (err) {
      console.log(err)
      return ERROR(res, 500, false, err.message)
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const { id } = req.user.user
      checkUserId({ id: id }, (error, result) => {
        if (error) return ERROR(res, 500, false, error.message)

        if (!result) return ERROR(res, 404, false, 'user tidak ditemukan')

        return SUCCESS(res, 200, true, 'berhasil get profile', result)
      })
    } catch (err) {
      console.log(err)
      return ERROR(res, 500, false, err.message)
    }
  },
  deleteUserProfile: async (req, res) => {
    try {
      const { id } = req.user.user

      deleteUser({ id: id }, (error, result) => {
        if (error) return ERROR(res, 500, false, error.message)

        if (result.deletedCount == 0) return ERROR(res, 404, false, 'user tidak ditemukan')

        return SUCCESS(res, 200, true, 'berhasil delete profile', result)
      })
    } catch (err) {
      console.log(err)
      return ERROR(res, 500, false, err.message)
    }
  }
}
