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
    
        const note = {
            id: Date.now(), 
            title: title, 
            content: content, 
            tags: tags, 
            createdAt: new Date(), 
            editedAt: null
        };

        notes.push(note);

        const noteList = document.getElementById("previousNoteList");
        addNoteToNoteList(note, noteList);

        for(const item of notes) {
            console.log(item);
        }

        form.reset();
    });
}

function addNoteToNoteList(note, noteList) {
    const li = document.createElement("li");
    li.textContent = note.title;
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
        .filter(tag => tag !== "");
}

// Remove a note
function removeNote(index, notes) {
    notes.splice(index, 1);
}

// Update (Edit) a note
/*async function updateNote(rl, index, notes) {
    console.log(`\nThis is the note to edit: ${notes[index].content}`)
    const newContent = (await rl.question("What would you like to add? ")).trim();
    notes[index].content += " " + newContent;
    notes[index].editedAt = new Date();
}*/

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

        for(const note of notesByTag) {
            console.log(note);
        }

        form.reset();
    });
}

function main() {
    console.log("In Main");
    const notes = [];
    createNote(notes);
    filterByTag(notes);

}

main();