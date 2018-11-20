const fs = require('fs');
const _ = require('lodash');

const fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return notes = JSON.parse(notesString);
    } catch (error) {
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
    if (title) {
        var notes = fetchNotes();

        var note = {
            title,
            body
        };

        var duplicateNotes = findMatchsNote(notes, title);

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
        console.log("This command require the title of the note with --title");
    }
};

const getAll = () => {
    var notes = fetchNotes();
    if(notes.length > 0){
        notes.map((note) => {
            console.log(`Title: ${note.title}`);
            console.log("---");
            console.log(`Note body: ${note.body}`);
            console.log("    ");
        });
    }else{
        console.log('Notes database is empty.');
    }   
};

const getNote = (title) => {

    if (title) {
        var notes = fetchNotes();
        var note = findMatchsNote(notes, title)[0];

        if (note) {
            console.log(`Title: ${note.title}`);
            console.log("---");
            console.log(`Note body: ${note.body}`);
        }
        else {
            console.log("Any notes found with this title");
        }
    }
    else {
        console.log("This command require the title of the note with --title");
    }
};

const removeNote = (title) => {
    if (title) {
        var notes = fetchNotes();
        var noteToBeRemoved = findMatchsNote(notes, title)[0];

        if (noteToBeRemoved) {
            _.pull(notes, noteToBeRemoved); //lodash remove function
            writeDataNote(notes);
            if (findMatchsNote(notes, title).length > 0) {
                console.log("Error")
            }
            else {
                console.log("Note removed!");
            }
        }
        else {
            console.log("Any notes found with this title");
        }
    }
    else {
        console.log("This command require the title of the note with --title");
    }
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};