<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: '',
      editingTask: null
    };
  },
  computed: {
    getIncompleteTaskCount() {
      return this.tasks.filter(task => !task.completed).length;
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({
          name: this.newTask,
          completed: false
        });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    editTask(task) {
      this.editingTask = task;
      this.newTask = task.name;
    },
    saveTask() {
      if (this.newTask.trim() !== '') {
        this.editingTask.name = this.newTask;
        this.cancelEditing();
      }
    },
    cancelEditing() {
      this.editingTask = null;
      this.newTask = '';
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
      <button @click="addTask">Add Task</button>
    </div>
    <p class="task-count">{{ getIncompleteTaskCount }} tasks remaining</p>
    <ol class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <div class="task-content">
          <input type="checkbox" v-model="task.completed">
          <span :class="{ completed: task.completed }">{{ task.name }}</span>
        </div>
        <div class="task-actions">
      <span v-if="editingTask === task">
        <button @click="saveTask">Save</button>
        <button @click="cancelEditing">Cancel</button>
      </span>
          <span v-else>
        <button @click="editTask(task)">Edit</button>
      </span>
          <button @click="removeTask(index)">Delete</button>
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
  background-color: #f9f9f9;
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
