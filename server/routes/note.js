import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js'

const router = express.Router()

// ✅ ADD NOTE
router.post('/add', middleware, async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      })
    }

    const newNote = new Note({
      title,
      description,
      userId: req.user.id
    })

    await newNote.save()

    return res.status(200).json({
      success: true,
      message: "Note Created Successfully",
      note: newNote
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in adding note"
    })
  }
})

// ✅ GET ALL NOTES
router.get('/', middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id })
    return res.status(200).json({ success: true, notes })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Can't retrieve notes"
    })
  }
})

// ✅ EDIT NOTE
router.put('/:id', middleware, async (req, res) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // ownership check
      { title, description },
      { new: true }
    )

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Can't update note"
    })
  }
})

// ✅ DELETE NOTE
router.delete('/:id', middleware, async (req, res) => {
  try {
    const { id } = req.params

    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: req.user.id
    })

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Can't delete note"
    })
  }
})

export default router
