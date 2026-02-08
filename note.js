//import readline from "readline/promises";

// Create a new note from user input (title, content, and tags)
async function createNote(rl) {
    const title = (await rl.question("\nWhat is the note's title? ")).trim();
    const content = (await rl.question("Please write your note: ")).trim();
    const tags = []
    while (true) {
        let tag = (await rl.question("Enter a tag. Leave blank to skip. ")).trim();
        if (!tag) break;
        tags.push(tag);
    } 
    
    return {
        id: Date.now(), 
        title: title, 
        content: content, 
        tags: tags, 
        createdAt: new Date(), 
        editedAt: null
    };
}

// Remove a note
function removeNote(index, notes) {
    notes.splice(index, 1);
}

// Update (Edit) a note
async function updateNote(rl, index, notes) {
    console.log(`\nThis is the note to edit: ${notes[index].content}`)
    const newContent = (await rl.question("What would you like to add? ")).trim();
    notes[index].content += " " + newContent;
    notes[index].editedAt = new Date();
}

// Filter notes by tag
async function filterByTag(rl, notes) {
    const searchTags = [];
    const notesByTag = [];
    while(true) {
        let tag = (await rl.question("\nWhat tag(s) would you like to search for? ")).trim();
        if(!tag) break;
        searchTags.push(tag);
    }

    for (let i = 0; i < notes.length; i++) {
        for (let j = 0; j < searchTags.length; j++) {
            if(notes[i].tags.includes(searchTags[j])) {
                notesByTag.push(notes[i]);
                break
            }
        }
    }

    return notesByTag;
}

async function main() {
    const notes = [];

    // Create user input interface
    const readline = require("readline/promises");
    const rl = readline.createInterface({
        input: process.stdin, 
        output: process.stdout
        });

    // Push several notes and print notes
    notes.push(await createNote(rl));
    notes.push(await createNote(rl));
    notes.push(await createNote(rl));
    console.log("\nNotes: ", notes);

    // Update a notes content and print notes
    await updateNote(rl, 1, notes)
    console.log("\nUpdated Notes: ", notes);

    // Filter notes by tag and print filtered notes
    const filteredNotes = await filterByTag(rl, notes);
    console.log("\nFiltered Notes: ", filteredNotes);

    // Close user input interface
    rl.close();

    // Remove a note and print notes
    removeNote(0, notes);
    console.log("\nRemoved Notes: ", notes);
}

main();