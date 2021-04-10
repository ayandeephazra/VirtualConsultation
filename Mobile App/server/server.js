
const { response } = require('express');
const express = require('express');
const app = express()
const mongoose = require("mongoose");
const port = 3000
//5e8d7c96-a3b4-4e0b-8aef-2c2a66afd85c
async function connectDB() {
  // TODO add database with your own API Key
  // mongodb+srv://Auth:Alpha@cluster0.bc2pl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  await mongoose.connect("", { useNewUrlParser: true , useUnifiedTopology: true })
  console.log("yes we connected");
}
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello Wddorld!')
});

// signup route
app.post('/signup', async (req, res) => {
  const { name, email, gender, phonenumber, password } = req.body;
  // TEST.HTTP SYNTAX MUST HAVE A BLANK LINE AT LINE 3
  /*
  console.log(name);
  console.log(email);
  console.log(gender);
  console.log(phonenumber);
  console.log(password);
  */
  
  var schema = new mongoose.Schema({ name: "string", email: "string", gender: "string", phonenumber: "string", password: "string" });
  var User = mongoose.model("User", schema);
  module.exports = mongoose.model('users', schema);      

  let user = new User({
    name, email, gender, phonenumber, password,
  });
  console.log(user);

  await user.save();

  res.json({token: "1234567890"});
  // check database for email and email is taken, then say it is taken
  //res.send('SignUp API Route')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`)
});