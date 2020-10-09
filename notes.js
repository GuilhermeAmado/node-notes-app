const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {        
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.black.bgGreen('New note added!'));
    } else {
        console.log(chalk.bgRed('Note title already exists!'));
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {        
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const removeNote = title => {
    let notes = loadNotes();
    
    if (notes.some(note => note.title.toLowerCase().includes(title.toLowerCase()))) {        
        notes = notes.filter(note => note.title.toLowerCase() !== title.toLowerCase());
        saveNotes(notes);
        console.log(chalk.black.bgGreen(`Removed note with the title "${title}"`));
    } else {
        console.log(chalk.bgRed(`Note with the title "${title}" not found!`));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse(`Here are your notes:`));
    
    notes.forEach(note => console.log(note.title));
}

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title.toLowerCase() === title.toLowerCase());
    if (note) {
        console.log(chalk.inverse(`Note title: ${note.title}`));
        console.log(note.body);
    } else {
        console.log(chalk.bgRed(`Note with the title "${title}" not found!`));
    }
}
module.exports = {addNote, removeNote, listNotes, readNote};