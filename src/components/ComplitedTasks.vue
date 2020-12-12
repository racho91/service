<template>
  <p>Завършени задачи</p> 
    <Task v-for="task in complitedTasks" :key="task.id" :task="task" />
</template>

<script>
import Task from '../components/Task'

import useTask from '../composition/useTasks'

export default { 
  components:{
    Task
  },
  setup(){
    
    const {activeTasks,aweitingTasks,tasks,complitedTasks}=useTask()

    return {
      activeTasks,aweitingTasks,tasks,complitedTasks
    }
  }
} 
</script>

<style>

</style>