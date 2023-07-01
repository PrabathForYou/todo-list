<template>
  <button class="task-input-button" @click='deleteAllTasks'>Delete All tasks</button>
</template>

<script>

export default {
  methods : {
    deleteAllTasks() {
      this.tasks = []
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
