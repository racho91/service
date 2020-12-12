<template>
  <!-- <Notifications/> -->
  <div class="main-navigation"></div>
  <div class="content">
      <router-view/>
  </div>
  
</template>

<script>
// import {onMounted} from 'vue'

// import Notifications from './components/Notifications'
// import useUiState from'./comp-functions/useUiState'
// import useAuth from './comp-functions/useAuth'
// import useTasks from './comp-functions/useTasks'
export default {
  name:'App',
  components:{
    // Notifications
  }
  // setup(){  
  //   let {isUser}=useAuth()
  //   // let {autoUpdateTasks}=useTasks() 
  //   let {isLoading,toggleMenu,isMenuOpen}=useUiState()
  //   onMounted(()=>{
  //     isUser()
  //     // autoUpdateTasks()
  //   })
  //   return {isLoading,toggleMenu,isMenuOpen}
  // }
}
</script>

<style>
</style>
