const { RepositoryError } = require('../helper/error');

class UsersRepository {
  /**
   * @private
   */
  _data = []

  /**
   * @private
   */
  _index = 0

  create({
    name, email, password, salt
  }) {
    if (!name || !email || !password || !salt) {
      throw new RepositoryError("name, email, password, and salt should exist")
    }

    this._data.push({
      id: this._index,
      name,
      email,
      password,
      salt
    })

    this._index++
  }

  /**
   * 
   * @param {string} email 
   * @returns {boolean}
   */
  isUserExists(email) {
    return this._data.some((it) => it.email === email)
  }

  /**
   * 
   * @param {string} email 
   * @returns {{id: string, name: string, email: string} | null} user object
   */
  getByEmail(email) {
    return this._data.find((it) => it.email === email) ?? null
  }

  /**
   * 
   * @param {number} email 
   * @returns {{id: string, name: string, email: string} | null} user object
   */
  getById(id) {
    return this._data.find((it) => it.id === id)
  }
}

const userRepository = new UsersRepository()

module.exports = userRepository;