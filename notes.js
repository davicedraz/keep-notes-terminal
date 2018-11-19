const fs = require('fs');

const fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return notes = JSON.parse(notesString);
    } catch (error) {
        console.log("Creating a new notes database...");
        return [];
    }
};

const addNote = (title, body) => {

    var notes = fetchNotes();

    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });

    if (title) {
        if (duplicateNotes.length === 0) {
            notes.push(note);
            fs.writeFileSync('notes-data.json', JSON.stringify(notes));
            console.log("Note keeped!");
            console.log("---");
            console.log(`Title: ${note.title}`);
            console.log(`Note body: ${note.body}`);
        }
        else {
            console.log("Already exists " + duplicateNotes.length + " notes with this title.");
        }
    }
    else {
        console.log("Insert the title of the note with --title command");
    }
};


const getAll = () => {
    console.log('Listing all notes');
};

const getNote = (title) => {
    console.log('Reading note', title);
};

const removeNote = (title) => {
    console.log('Removing note', title);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};