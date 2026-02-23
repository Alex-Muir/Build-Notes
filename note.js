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

        // Check if note already exists
        for(const item of notes) {
            if(item.id == currentNoteId)
                note = item; 
        }

        // If the note already exists update the contents after edit
        if(note) {
            note.title = title;
            note.content = content;
            note.tags = tags;
            note.editedAt = new Date().toString();
        } else {
            // If the note does not exist create the note and add it to notes
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
    
        // save the notes and render the list
        saveNotes(notes);
        renderNoteList(notes)

        console.log("Current List");
        for(const item of notes) {
            console.log(item);
        }

        // If the note was edited view it in viewMode
        // otherwise reset the form for createMode
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

// Helper function for createNote() and filterByTag(). Separates tags, 
// removes whitespace and empty strings, and converts tags lower case. 
function formatTags(tagString) {

    if(!tagString) 
        return []

    return tagString
        .split(",")
        .map(tag => tag.trim())
        .map(tag => tag.toLowerCase())
        .filter(tag => tag !== "");
}

// Remove a note from the note list
function removeNoteSetup(notes) {
    const deleteBtn = document.getElementById("removeNoteButton");
    
    deleteBtn.addEventListener("click", () => {
        let index = -1;

        // Find the index of the current note
        for(let i = 0; i < notes.length; i++) {
            if(notes[i].id == currentNoteId) {
                index = i;
                // Remove the current note
                notes.splice(i, 1);
                break;
            }
        }

        // Re-render the list
        renderNoteList(notes);

        // Enter createMode
        createMode();
    })
}

// Listener for the editNoteButton. When clicked calls editMode
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

// Filter notes by tags entered into the search bar. (Currently console logs the relevant notes)
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

// If there are notes to display, display the in the 'Previous Notes' list
function displayPreviousNotes(notes) {
    if(notes && notes.length > 0) {
        const noteList = document.getElementById("previousNoteList");
        for(const note of notes) {
            addNoteToNoteList(note, noteList);
        }
    }   
}

// Get notes from local storage. If notes doesn't exist return an empty array
function loadNotes() {
    console.log("Loading notes...")
    const notes = localStorage.getItem("notes");

    if(!notes) 
        return [];

    return JSON.parse(notes);
}

// Saves notes to local storage
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// sets up viewMode
function viewMode(note) {
    document.getElementById("createNoteSection").hidden = true;
    document.getElementById("viewNoteSection").hidden = false;
    document.getElementById("noteTitleView").textContent = note.title;
    document.getElementById("dateCreatedView").textContent = note.createdAt;

    const editDate = document.getElementById("editDateExists");
    const editDateContent = document.getElementById("dateEditedView");

    if(note.editedAt) {
        editDateContent.textContent = note.editedAt;
        editDate.hidden = false;
    } else {
        editDateContent.textContent = "";
        editDate.hidden = true;
    }

    document.getElementById("noteContentView").textContent = note.content;
    document.getElementById("tagsView").textContent = note.tags.join(", ");
}

// sets up editMode. editMode uses the same form as createMode, but different buttons
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

// retores create mode
function createMode() {
    currentNoteId = null;
    document.getElementById("modeTitle").textContent = "New Note";
    document.getElementById("createNoteSection").hidden = false;
    document.getElementById("createNoteButtons").hidden = false;
    document.getElementById("titleInput").value = "";
    document.getElementById("contentInput").value = "";
    document.getElementById("tagInput").value = "";
    document.getElementById("editNoteButtons").hidden = true;
    document.getElementById("viewNoteSection").hidden = true;
}

// returns user from view mode to create mode when createNewNoteButton is clicked
function createNewNote() {
    const newNoteBtn = document.getElementById("createNewNoteButton");

    newNoteBtn.addEventListener("click", () => {
        createMode();
    });

}

// Cancels the edit mode process and returns user to view mode when the cancelButton is clicked
function cancelEditSetup(notes) {
    cancelBtn = document.getElementById("cancelButton");

    cancelBtn.addEventListener("click", () => {
        let note = null;

        // find the note that was being edited and view it in viewMode
        for(const item of notes) {
            if(item.id == currentNoteId)
                note = item; 
        }
        viewMode(note);
    });
}

// Reset the note form after reload for text inputs
function resetNoteForm() {
    window.addEventListener("DOMContentLoaded", () => {
        document.getElementById("noteForm").reset();
    });
}

// Renders note list whenever there is an addition or edit
function renderNoteList(notes) {
    // Reset the previousNote List to be empty
    const noteList = document.getElementById("previousNoteList");
    noteList.innerHTML = "";

    // Add (or re-add) all the notes to the list
    for (const note of notes) {
        addNoteToNoteList(note, noteList);
    }
}

// On confim, Clears local storage, empties the notes array, 
// and clears previous notes on screen
function clearLocalStorage(notes) {
    deleteAllBtn = document.getElementById("clearAllDataButton");

    deleteAllBtn.addEventListener("click", () => {
        if(window.confirm("You are about to delete all data. Do you want to proceed?")) {
            localStorage.clear()
            notes.length = 0;
            renderNoteList(notes);
            createMode();
            console.log(notes);
        } else {
            return
        }
    });
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
    removeNoteSetup(notes);
    createNewNote();
    clearLocalStorage(notes);
}

main();