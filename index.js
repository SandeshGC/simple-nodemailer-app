const express = require("express")
const app = express()
const morgan = require("morgan")
const nodemailer = require("nodemailer")

const constants = require("./constants")
const { HOST, PORT, EMAIL_SENDER_ID, EMAIL_SENDER_PASSWORD } = constants

app.set("view-engine", "ejs")
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.redirect("/form")
})

app.get("/form", (req, res) => {
  res.render("form.ejs")
})

app.post("/submit", (req, res) => {
  const { subject, message, receiver } = req.body

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: EMAIL_SENDER_ID,
      pass: EMAIL_SENDER_PASSWORD,
    },
  })

  async function sendEmail() {
    const info = await transporter.sendMail({
      from: EMAIL_SENDER_ID,
      to: receiver,
      subject: subject,
      text: message,
      // html: ""  You can write and render HTML here to display in the email.
    })

    console.log("Email sent:", info.messageId)
  }

  sendEmail().catch(console.error)

  res.render("submit.ejs", { subject, message, receiver })
})

app.listen(PORT, () => {
  console.log("SERVER URL:" + `\nhttp://${HOST}:${PORT}`)
})
