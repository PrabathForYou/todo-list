<template>
  <button class="task-input-button" @keyup.enter="addTask" @click="addTask">Add Task</button>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: '',
      editingTask: null,
    };
  },
  methods : {
      addTask() {
        if (this.$parent.newTask.trim() !== "") {
          this.$parent.tasks.push({
            name: this.$parent.newTask,
            completed: false
          });
        }
      }
    }
}
</script>

<style scoped>
.task-input-button {
  padding: 10px 15px;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  align-items: center;
}
</style>
