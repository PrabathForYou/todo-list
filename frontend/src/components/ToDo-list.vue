<script>
import api from "../services/api.js"
import miniToastr from 'mini-toastr'

export default {
  data() {
    return {
      tasks: [],
      newTask: '',
      editingTask: null,
      incompleteTaskCount: 0
    };
  },
  completed : {
    defaultConfig() {
       return {
        types: TYPES,
        animation: fadeOut,
        timeout: 3000,
        appendTarget: document.body,
        node: document.createElement('div'),
        style: {
          //Styles
        }
      }
    } 
  },
  created : function () {
    api.getTasks().then(response => {
      this.tasks = response.data

     this.updateIncompleteCount();
    });
  },
  mounted : function () {
    miniToastr.init(this.defaultConfig)
  },
  methods: {
    updateIncompleteCount() {
      this.incompleteTaskCount = this.tasks.filter(task => task.status === "not completed").length;
    },
    addTask() {
      try {
        if (this.newTask.trim() !== '') {
          this.tasks.push({
            task: this.newTask,
            completed: false
          });

          api.storeTask({"task" : this.newTask})
          this.newTask = '';
          miniToastr.success('Success', 'Task added Successfully', 2000)
        }
      } catch (error) {
        miniToastr.error('error', `error adding task ${error}`, 2000)
      }

    },
    removeTask(index,id) {
      api.deleteTask(id);
      this.tasks.splice(index, 1);
    },
    editTask(task) {
      this.editingTask = task;
      this.newTask = task.task;
    },
    saveTask() {
      if (this.newTask.trim() !== '') {
        this.editingTask.task = this.newTask;
        api.updateTask(this.editingTask.id,{ "task" : this.editingTask.task })

        this.cancelEditing();
      }
    },
    cancelEditing() {
      this.editingTask = null;
      this.newTask = '';
    },
    toggleTaskStatus(task) {
      task.status = task.status === 'completed' ? 'not completed' : 'completed';

      const statusPayload = task.status === 'completed' ? 1 : 0;
      
      api.updateStatus(task.id, { status: statusPayload   })
        .then(() => console.log('Status updated successfully'))
        .catch(error => console.error('Error updating status:', error));
      
      this.updateIncompleteCount();
    }
  }
};
</script>

<template>
  <div class="task-app">
    <h1>Task Management System</h1>
    <div class="task-input">
      <input
          v-model="newTask"
          type="text" placeholder="Enter a new task"
      >
      <button :disabled="editingTask !== null" @click="addTask">Add Task</button>
    </div>
    <p class="task-count">{{ incompleteTaskCount }} tasks remaining</p>
    <ol class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <div class="task-content">
        <input 
          type="checkbox" 
          :checked="task.status === 'completed'"
          @change="toggleTaskStatus(task)"
        >
          <span :class="{ completed: task.status == 'completed'  }">{{ task.task }}</span>
        </div>
        <div class="task-actions">
      <span v-if="editingTask === task">
        <button @click="saveTask">Save</button>
        <button @click="cancelEditing">Cancel</button>
      </span>
          <span v-else>
        <button @click="editTask(task)">Edit</button>
      </span>
          <button @click="removeTask(index,task.id)">Delete</button>
        </div>
      </li>
    </ol>
    
  </div>
</template>

<style>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.task-app {
  width: 145%;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
}

.task-content {
  color: black;
  flex: 1;
}

.task-input input[type="text"] {
  background-color: #f9f9f9;
  flex: 02;
  padding: 10px;
  border: 3px solid #ccc;
  border-radius: 3px;
  width: 700px;
}

.task-input button {
  padding: 10px 15px;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  align-items: center;
}

.task-list {
  background-color: #f9f9f9;
  flex: 10;
  padding: 35px;
  width: 800px;
  align-items: center;}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  background-color:rgb(250, 245, 245);
  border-radius: 6px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  word-break: break-word;
}

.task-item input[type="checkbox"] {
  margin-right: 10px;
}

.completed {
  text-decoration: line-through;
  color: #4caf50;
}

.task-actions {
  display: flex;
  align-items: center;
}

.task-item button {
  padding: 5px 10px;
  background-color: #f44336;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
}

.task-count {
  margin-top: 10px;
  font-size: medium;
}
</style>
