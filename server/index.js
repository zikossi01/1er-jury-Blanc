const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProjectController = require('./controllers/ProjectControllers');
const TaskController = require('./controllers/TasksControllers')
const ResourceController = require('./controllers/ResourcesControllers')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', ProjectController)
app.use('/', TaskController)
app.use('/', ResourceController)

mongoose.connect('mongodb://127.0.0.1:27017/juryblan')
.then(() => console.log('connected to mongodb !'))
.catch((error) => console.error('failed to connect to mongodb', error));

const port = 3000;
app.listen(port, () => {
    console.log(`app run on port : ${port}`);
}) 