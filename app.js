const express = require('express')
const cors = require('cors')
const fs = require('fs')
const multer = require('multer')
const app = express()

const PORT = process.env.PORT || 5053
const appname = `http://localhost:${PORT}/`

const storage = multer({ dest: "store/" })
app.use(express.json())

app.use(cors())

app.get("/:id", async (req, res) => {
  const fileName = req.params.id
  const file = __dirname + "/store/" + fileName
  res.sendFile(file)
})

app.post("/upload", storage.any(), async (req, res) => {
  if (!req.files[0]) {
    return res.status(400).send("Please send at least one file")
  }

  const arrayFiles = []

  req.files.forEach(async file => {
    fs.rename(`store/${file.filename}`, `store/${file.originalname}`, (err) => {
      if (err) {
        res.status(400).send("Error occured uploading the image")
      } else {
        files.push(appname + file.originalname)
        arrayFiles.push(appname + file.originalname)
      }
    })
  })

  const files = req.files.map(file => appname + file.originalname)
  const response = files.length > 0? files[0] : "Image not uploaded"
  res.send(response)
})

app.listen(PORT, () => console.log(`Server listenting on *:${PORT}`))