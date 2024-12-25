const { RepositoryError } = require('../helper/error');

class NotesRepository {
  /**
   * @private
   */
  _data = []

  /**
   * @private
   */
  _index = 0

  /**
   * 
   * @param {{title: string, body: string, owner: string, archived: boolean, createdAt: string}} 
   */
  create({
    title, body, owner, archived, createdAt
  }) {
    if ([title, body, owner, archived, createdAt].some(it => it == null)) {
      throw new RepositoryError("title, body, owner, archived, and createdAt should exist")
    }

    const newData = {
      id: this._index,
      title,
      body,
      owner,
      archived,
      createdAt,
    }

    this._data.push(newData)

    this._index++

    return newData
  }

  /**
   * 
   * @param {number} userId
   * @returns {Array<{title: string, body: string, owner: string, archived: boolean, createdAt: string}>}
   */
  getAllNonArchived(userId) {
    return this._data.filter((it) => it.owner === userId && it.archived === false)
  }

  /**
   * 
   * @param {number} userId
   * @returns {Array<{title: string, body: string, owner: string, archived: boolean, createdAt: string}>}
   */
  getAllArchived(userId) {
    return this._data.filter((it) => it.owner === userId && it.archived === true)
  }

  /**
   * 
   * @param {number} noteId 
   * @returns {{id: string, name: string, email: string} | null} user object
   */
  getById(id) {
    return this._data.find((it) => it.id === id)
  }

  /**
   * 
   * @param {number} noteId 
   */
  archiveNote(id) {
    const note = this._data.find((it) => it.id === id)
    note.archived = true
  }

  /**
   * 
   * @param {number} noteId 
   */
  unarchiveNote(id) {
    const note = this._data.find((it) => it.id === id)
    note.archived = false
  }

  /**
   * 
   * @param {number} noteId 
   */
  deleteNote(id) {
    this._data = this._data.filter((it) => it.id !== id )
  }
}

const notesRepository = new NotesRepository()

module.exports = notesRepository;