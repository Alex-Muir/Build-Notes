let currentNoteId = null;

// Create a new note from user input (title, content, and tags)
function createNote(notes) {
    const form = document.getElementById("noteForm");
    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");
    const tagInput = document.getElementById("tagInput");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = titleInput.value;
        const content = contentInput.value;
        const tagString = tagInput.value;

        const tags = formatTags(tagString);

        let note = null;

        for(const item of notes) {
            if(item.id == currentNoteId)
                note = item; 
        }

        if(note) {
            note.title = title;
            note.content = content;
            note.tags = tags;
            note.editedAt = new Date().toString();
        } else {

            let note = {
            id: Date.now().toString(), 
            title: title, 
            content: content, 
            tags: tags, 
            createdAt: new Date().toString(), 
            editedAt: null
            };

            notes.push(note);
        }
    
        saveNotes(notes);
        renderNoteList(notes)

        console.log("Current List");
        for(const item of notes) {
            console.log(item);
        }

        if(note) 
            viewMode(note);
        else
            form.reset();
    });
}

// Adds the title of a note to the Previous Notes List
function addNoteToNoteList(note, noteList) {
    const li = document.createElement("li");
    li.textContent = note.title;

    li.addEventListener("click", () => {
        currentNoteId = note.id;
        viewMode(note);
    });
    noteList.appendChild(li);
}

// Helper function for createNote() and filterByTag().
// Separates tags and removes whitespace and empty strings. 
function formatTags(tagString) {

    if(!tagString) 
        return []

    return tagString
        .split(",")
        .map(tag => tag.trim())
        .map(tag => tag.toLowerCase())
        .filter(tag => tag !== "");
}

// Remove a note
function removeNote(index, notes) {
    notes.splice(index, 1);
}

// Update (Edit) a note
function editNoteSetup(notes) {
    const editBtn = document.getElementById("editNoteButton");

    editBtn.addEventListener("click", () => {
        let note = null;

        for(const item of notes) {
            if(item.id == currentNoteId)
                note = item; 
        }

        editMode(note);
    });

    if(notes.length < 1) 
        return;
}

// Filter notes by tag
function filterByTag(notes) {

    const form = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const searchFor = searchInput.value;
        const searchTags = formatTags(searchFor);
        const notesByTag = [];

        for (let i = 0; i < notes.length; i++) {
            for (let j = 0; j < searchTags.length; j++) {
                if(notes[i].tags.includes(searchTags[j])) {
                    notesByTag.push(notes[i]);
                    break
                }
            }
        }

        console.log(`${notesByTag.length} note(s) found`);
        for(const note of notesByTag) {
            console.log(note);
        }

        form.reset();
    });
}

function displayPreviousNotes(notes) {
    if(notes && notes.length > 0) {
        const noteList = document.getElementById("previousNoteList");
        for(const note of notes) {
            addNoteToNoteList(note, noteList);
        }
    }   
}

function loadNotes() {
    console.log("Loading notes...")
    const notes = localStorage.getItem("notes");

    if(!notes) 
        return [];

    return JSON.parse(notes);
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function viewMode(note) {
    document.getElementById("createNoteSection").hidden = true;
    document.getElementById("viewNoteSection").hidden = false;

    document.getElementById("noteTitleView").textContent = note.title;
    document.getElementById("dateCreatedView").textContent = note.createdAt.toString();
    document.getElementById("noteContentView").textContent = note.content;
    document.getElementById("tagsView").textContent = note.tags.join(", ");
}

function editMode(note) {
    document.getElementById("viewNoteSection").hidden = true;
    document.getElementById("createNoteButtons").hidden = true;
    document.getElementById("modeTitle").textContent = "Edit Note";
    document.getElementById("titleInput").value = note.title;
    document.getElementById("contentInput").value = note.content;
    document.getElementById("tagInput").value = note.tags.join(", ");
    document.getElementById("createNoteSection").hidden = false;
    document.getElementById("editNoteButtons").hidden = false;
}

function createMode() {
    currentNoteId = null;
    document.getElementById("createNoteSection").hidden = false;
    document.getElementById("viewNoteSection").hidden = true;
}

function createNewNote() {
    const newNoteBtn = document.getElementById("createNewNoteButton");

    newNoteBtn.addEventListener("click", () => {
        createMode();
    });

}

function cancelEditSetup(notes) {
    cancelBtn = document.getElementById("cancelButton");

    cancelBtn.addEventListener("click", () => {
        let note = null;

        for(const item of notes) {
            if(item.id == currentNoteId)
                note = item; 
        }
        viewMode(note);
    });
}

function resetNoteForm() {
    window.addEventListener("DOMContentLoaded", () => {
        document.getElementById("noteForm").reset();
    });
}

function renderNoteList(notes) {
  const noteList = document.getElementById("previousNoteList");
  noteList.innerHTML = "";

  for (const note of notes) {
    addNoteToNoteList(note, noteList);
  }
}

function main() {
    console.log("In Main");
    resetNoteForm();
    const notes = loadNotes();
    displayPreviousNotes(notes);
    createNote(notes);
    filterByTag(notes);
    editNoteSetup(notes)
    cancelEditSetup(notes);
    createNewNote();
    //localStorage.clear();
}

main();