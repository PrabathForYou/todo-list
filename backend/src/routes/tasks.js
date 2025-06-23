const express = require('express');
const router = express.Router();
const tasksQueries = require('../queries/TasksQueries'); 

router.get('/', function (req,res) {
    tasksQueries.getTasks((error, results) => {
        if (error) {
            return res.json({ error: "Failed to fetch tasks" });
        }
        res.json(results);
    });
})

router.get('/:id',function (req,res) {
    const taskId = req.params.id;

    tasksQueries.getTaskbyId(taskId,(error,result) => {
        if (error) {
            return res.status.status.json({ error : "Failed to fetch task" })
        }        

        return res.json(result)
    })
})

router.post('/', function (req,res) {
    tasksQueries.storeTask(req.body,(error,results) => {
        if (error) {
            return res.status(500).json({ error: "Failed to store task" });
        }

        res.json({ response : "stored succsessfully" })
    })
})

router.put('/:id', function (req,res) {
    const id = req.params.id;
    const task = req.body.task

    const updateObj = {
        "id" : id,
        "task" : task
    }

    tasksQueries.updateTask(updateObj, (error,result) => {
        if (error) {
            return res.status(500).json({ error : "Failed to update task" })
        }

        res.json(result)
    })
})

router.put('/update-status/:id', (req,res) => {
    const id = req.params.id
    const status = req.body.status

    const updateObj = {
        "id" : id,
        "status" : status
    }

    tasksQueries.updateTaskStatus(updateObj, (error,result) => {
        if (error) {
            throw error
        }

        res.json(result)
    })
})

router.delete('/:id',(req,res) => {
    const id = req.params.id;

    tasksQueries.deleteTask(id,(error,result) => {
        if (error) {
            throw error
        }

        res.json(result)
    })
})



module.exports = router



