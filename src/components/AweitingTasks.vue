<template>
  <p>Чакащи взимане</p> 
    <Task v-for="task in aweitingTasks" :key="task.id" :task="task" />
</template>

<script>
import Task from '../components/Task'

import useTask from '../composition/useTasks'

export default { 
  components:{
    Task
  },
  setup(){
    
    const {activeTasks,aweitingTasks,tasks}=useTask()

    return {
      activeTasks,aweitingTasks,tasks
    }
  }
} 
</script>

<style>

</style>