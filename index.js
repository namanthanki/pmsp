const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.routes');
const calendarRouter = require('./routes/calendar.routes');
const { requireAuth, checkUser } = require('./middlewares/auth.middleware');

require('dotenv').config();
require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', userRouter);
app.use('/', calendarRouter);

app.get('*', checkUser);

// Example of Securing Paths
// app.get('/somepath', requireAuth, (req, res) => res.render('page'));

const PORT = process.env.SERVER_PORT; 
app.listen(PORT, () => {
    console.log(`Server is Up and Listening on PORT: ${PORT}`);
});