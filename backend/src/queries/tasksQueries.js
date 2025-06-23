const db = require('../config/db')
const moment =  require('moment')

function getTasks(callback) {
    db.query('SELECT * FROM tasks ORDER BY id DESC', (error,result) => {
        if(error) {
            callback(error,null)
        }

    const transformedResults = result.map(task => ({
            id: task.id,
            task: task.task, 
            status: task.status === 1 ? 'completed' : 'not completed',
            addedDate: task.addeddate
        }));

        callback(null,transformedResults);
    })
}

function getTaskbyId(id,callback) {
    const query = "SELECT * FROM tasks WHERE id = ?"
    const conditionValue = id;

    db.query(query,[conditionValue], (error,result) => {
        if(error) {
            return callback(error,null)
        }
        
        const transformedResults = result.map(task => ({
            id: task.id,
            task: task.task, 
            status: task.status === 1 ? 'completed' : 'not completed',
            addedDate: task.addeddate
        }));
        
        callback(null,transformedResults[0])
    })
}

function storeTask(req, callback) {
    const query = "INSERT INTO tasks (task, addeddate) VALUES (?, ?)";
    const values = [req.task, moment().format('YYYY-MM-DD HH:mm:ss')]; 
    
    db.query(query, values, (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result);
    });
}

function updateTask(req,callback) {
    const query = "UPDATE tasks SET task = ? WHERE id = ?"
    const value = [req.task,req.id]

    db.query(query,value, (error,result) => {
        if (error) {
            throw error
        } 

        callback(null,result)
    });
}

function updateTaskStatus (req,callback) {
    const query = "UPDATE tasks SET status = ? WHERE id = ?"
    const values = [req.status,req.id]

    db.query(query,values , function(error,result){
        if (error) {
            throw error
        }

        callback(null,result)
    })
}

function deleteTask(id,callback) {
    const query = "DELETE FROM tasks WHERE id = ?"

    db.query(query,[id], (error,result) => {
        if (error) {
            throw error
        }

        callback(null,result)
    });
}

module.exports = {
    getTasks,
    storeTask,
    getTaskbyId,
    updateTask,
    deleteTask,
    updateTaskStatus   
}