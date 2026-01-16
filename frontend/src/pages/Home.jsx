import React, { useEffect, useState } from 'react'
import NoteModal from '../components/NoteModal'
import { Navbar } from '../components/Navbar'
import axios from 'axios'
import NoteCard from '../components/NoteCard'
import { toast } from 'react-toastify'

const Home = () => {
  const [isModelOpen, setModalOpen] = useState(false)
  const [filterNotes, setFilterNotes] = useState([])   // ✅ FIXED
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)
  const [query, setQuery] = useState('')

  // ✅ FETCH NOTES ONLY IF TOKEN EXISTS
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return   // ⛔ stop if not logged in
    fetchNotes()
  }, [])

  // ✅ SEARCH FILTER
  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.description.toLowerCase().includes(query.toLowerCase())
    )
    setFilterNotes(filtered)
  }, [query, notes])

  // ✅ API CALL
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/note",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      setNotes(data.notes)
    } catch (error) {
      console.log("FETCH NOTES ERROR:", error.response?.data || error)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const onEdit = (note) => {
    setCurrentNote(note)
    setModalOpen(true)
  }

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      )

      if (response.data.success) {
        fetchNotes()
        closeModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmDelete) return; // ❌ stop delete

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/note/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );

    if (response.data.success) {
      fetchNotes();
      toast.success("Note deleted successfully");
    }
  } catch (error) {
    toast.error("Failed to delete note");
    console.log(error);
  }
};

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      )

      if (response.data.success) {
        fetchNotes()
        closeModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery={setQuery} />

      <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {filterNotes.length > 0 ? (
          filterNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => onEdit(note)}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <p>No Notes</p>
        )}
      </div>

      <button
  onClick={() => {
    setCurrentNote(null);   // ✅ clear edit state
    setModalOpen(true);
  }}
  className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'
>
  +
</button>


      {isModelOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  )
}

export default Home
