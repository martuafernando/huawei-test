const notesRepository = require('../../repository/notes')
const { successResponse, failedResponse } = require('../../helper/response')

function createNote(req, res) {
  const { title, body } = req.body
  const user = req.user

  if (!title || !body) {
    return res
      .status(400)
      .json(failedResponse('title and body must exists'))
  }

  const data = notesRepository.create({
    title,
    body,
    owner: user.id,
    archived: false,
    createdAt: new Date().toISOString()
  })

  return res.json(successResponse('Note Created', data))
}

function getNonArchivedNote(req, res) {
  const user = req.user
  const data = notesRepository.getAllNonArchived(user.id)

  return res.json(successResponse('Note retrieved', data))
}

function getArchivedNote(req, res) {
  const user = req.user
  const data = notesRepository.getAllArchived(user.id)

  return res.json(successResponse('Note retrieved', data))
}

function getNote(req, res) {
  const noteId = req.params.id
  const user = req.user
  
  const note = notesRepository.getById(Number(noteId))

  if (!note) {
    return res
      .status(400)
      .json(failedResponse("Note not found"))
  }

  if (note.owner !== user.id) {
    return res
      .status(403)
      .json(failedResponse('forbidden'))
  }

  return res.json(successResponse('Note retrieved', note))
}

function archiveNote(req, res) {
  const noteId = req.params.id
  const user = req.user
  
  const note = notesRepository.getById(Number(noteId))

  if (!note) {
    return res
      .status(400)
      .json(failedResponse("Note not found"))
  }

  if (note.owner !== user.id) {
    return res
      .status(403)
      .json(failedResponse('forbidden'))
  }

  notesRepository.archiveNote(note.id)

  return res.json(successResponse('Note archived', note))
}

function unarchiveNote(req, res) {
  const noteId = req.params.id
  const user = req.user
  
  const note = notesRepository.getById(Number(noteId))

  if (!note) {
    return res
      .status(400)
      .json(failedResponse("Note not found"))
  }

  if (note.owner !== user.id) {
    return res
      .status(403)
      .json(failedResponse('forbidden'))
  }

  notesRepository.unarchiveNote(note.id)

  return res.json(successResponse('Note unarchived', note))
}

function deleteNote(req, res) {
  const noteId = req.params.id
  const user = req.user
  
  const note = notesRepository.getById(Number(noteId))

  if (!note) {
    return res
      .status(400)
      .json(failedResponse("Note not found"))
  }

  if (note.owner !== user.id) {
    return res
      .status(403)
      .json(failedResponse('forbidden'))
  }

  notesRepository.deleteNote(note.id)

  return res.json(successResponse('Note deleted', note))
}

module.exports = {
  createNote,
  getNonArchivedNote,
  getArchivedNote,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
}