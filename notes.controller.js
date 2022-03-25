const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
	const notes = await getNotes()
	const note = {
		title,
		id: Date.now().toString(),
	}

	notes.push(note)
	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
	const notes = await getNotes()

	console.log(chalk.bgBlue('Here is the list of notes:'))
	notes.forEach((note) => {
		console.log(chalk.blue(note.id), ' ', chalk.blue(note.title))
	})
}

async function removeNote(id) {
	const notes = await getNotes()
	const filteredNotes = notes.filter((note) => note.id !== id)

	await fs.writeFile(notesPath, JSON.stringify(filteredNotes))
	console.log(chalk.bgRed('Note removed!'))
}

async function editNote(id, title) {
	const notes = await getNotes()
	const changedNotes = notes.map((note) => {
		if (note.id === id) {
			return { id, title }
		}

		return note
	})

	await fs.writeFile(notesPath, JSON.stringify(changedNotes))
	console.log(chalk.bgYellow('Note changed!'))
}

module.exports = {
	addNote,
	printNotes,
	removeNote,
	editNote,
}
