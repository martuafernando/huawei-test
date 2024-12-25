const { createNote, getNonArchivedNote, getArchivedNote, getNote, archiveNote, unarchiveNote, deleteNote } = require("./handler");

const router = require("express").Router();

router.post("/", createNote);
router.get("/", getNonArchivedNote);
router.get("/archived", getArchivedNote);
router.get("/:id", getNote);
router.post("/:id/archive", archiveNote,);
router.post("/:id/unarchive", unarchiveNote);
router.delete("/:id", deleteNote);

module.exports = router;