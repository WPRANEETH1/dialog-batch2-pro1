var Express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Webtask = require('webtask-tools');
var app = Express();
var path = require('path');

// var Task = require('./models/Task');
// var User = require('./models/User');
// connect DB

app.use(require(path.resolve(__dirname, './middlewares/db')).connectDisconnect);

// mongoose.connect('mongodb://root:root@ds153577.mlab.com:53577/tasks');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    var name = req.query.name;
    res.send(`Hello ${name}`)
});

app.post('/task', (req, res) => {
    // create user
    var Task = req.TaskModel;
    var User = req.UserModel;
    var user = new User();
    user.username = req.body.user.username;
    user.email = req.body.user.email;

    user.save((err, user) => {
        if (err) {
            res.status(500).json(err);
        }

        var task = new Task({
            title: req.body.title,
            description: req.body.description,
            user: user.id
        });

        task.save((err, task) => {
            if (err) {
                res.status(500).json(err);
            }

            res.status(200).json({ user: user, task: task })
        })
    });
});

app.get('/tasks', (req, res) => {
    var Task = req.TaskModel;
    Task.find({}, (err, taskList) => {
        if (err) {
            res.status(500).json(err);
        }

        res.status(200).json(taskList);
    })
});


app.listen(3000, () => {
    console.log('App started at port 3000');
});
// module.exports = Webtask.fromExpress(app);