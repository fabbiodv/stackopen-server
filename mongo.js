const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  // `mongodb+srv://fullstack:passwordmongo@cluster0-ostce.mongodb.net/test?retryWrites=true` 
  `mongodb+srv://fabbiodv:${password}@cluster0.9v6dhnr.mongodb.net/note-app?retryWrites=true&w=majority` 

mongoose.connect(url)

// El esquema le dice a Mongoose cómo se almacenarán los objetos de nota en la base de datos.
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })


Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})