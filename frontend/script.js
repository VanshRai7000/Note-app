// This script handles the frontend logic for the note-taking application.
// It includes functions to submit a new note and load existing notes from the server.

    const form = document.getElementById('noteForm');
    const notesList = document.getElementById('notesList');  
    const deletion = document.getElementById('deletion');
    

form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      await fetch('/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      loadNotes();
    });

    deletion.addEventListener('click', async (e) => {
  

    })


    async function loadNotes() {
        const res = await fetch('/notes');
        const notes = await res.json();
        notesList.innerHTML = notes.map(note => `
            <li>
                <strong>${note.title}</strong>: ${note.content}
                <button onclick="deleteNote(${note.id})" class="delete-btn">Delete</button>
            </li>
        `).join('');
    }

    async function deleteNote(id) {
        try {
            const response = await fetch(`/notes/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                await loadNotes(); // Reload the notes after deletion
            } else {
                console.error('Failed to delete note');
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    loadNotes();