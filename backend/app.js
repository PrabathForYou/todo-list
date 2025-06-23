const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());

const tasksRoutes = require('./src/routes/tasks');

app.use(express.json());
app.use('/tasks', tasksRoutes)

module.exports = app
