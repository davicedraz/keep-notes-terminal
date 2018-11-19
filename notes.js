const fs = require('fs');
const _ = require('lodash');

const fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return notes = JSON.parse(notesString);
    } catch (error) {
        console.log("Creating a new notes database...");
        return [];
    }
};

const findMatchsNote = (notes, title) => {
    var matches = notes.filter((note) => {
        return note.title === title;
    });
    return matches;
};

const writeDataNote = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};



const addNote = (title, body) => {

    var notes = fetchNotes();

    var note = {
        title,
        body
    };

    var duplicateNotes = findMatchsNote(notes, title);

    if (title) {
        if (duplicateNotes.length === 0 || duplicateNotes === undefined) {
            notes.push(note);
           
            writeDataNote(notes);

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

    var notes = fetchNotes();
    var noteToBeRemoved = findMatchsNote(notes, title)[0];
    _.pull(notes, noteToBeRemoved); //lodash remove function

    console.log("note removed!");

    writeDataNote(notes);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};