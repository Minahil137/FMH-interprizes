const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express()
const passport=require('passport')
app.use(passport.initialize())
// const flash = require('connect-flash')
// app.use(flash())
// app.set('view-engine', 'ejs')
const userroutes=require('./routes/userroutes')
const sellerRoutes=require('./routes/sellerRoutes')
mongoose.connect(`mongodb://127.0.0.1:27017/finalproject`, {
  useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;
app.use(express.static('public'))
db.once('open', () => {
	console.log("Connected to MongoDB database...");
});
const port = 3000
app.use(express.static('public'));


app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.use(userroutes)



app.use(sellerRoutes)

