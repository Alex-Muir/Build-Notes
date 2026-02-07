//import readline from "readline/promises";

// Create a new note from user input (title, content, and tags)
async function createNote(rl) {
    const title = (await rl.question("What is the note's title? ")).trim();
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
        createdAt: new Date()
    };

}

// Remove a note
function removeNote(index, notes) {
    notes.splice(index, 1);
}

async function main() {
    const notes = [];

    // Create user input interface
    const readline = require("readline/promises");
    const rl = readline.createInterface({
        input: process.stdin, 
        output: process.stdout
        });

    note = await createNote(rl);
    notes.push(note)
    rl.close();
    console.log(notes);
    removeNote(0, notes);
    console.log(notes);

}

main();