<template>
  <Notifications/>
  <div class="main-navigation"></div>
  <div class="content">
      <router-view/>
  </div>
  
</template>

<script>
import {onMounted} from 'vue'

import Notifications from './components/Notifications'
import useUiState from'./composition/useUiState'
import useAuth from './composition/useAuth'
// import useTasks from './composition/useTasks'
export default {
  name:'App',
  components:{
    Notifications
  },
  setup(){  
    let {isUser}=useAuth()
    // let {autoUpdateTasks}=useTasks() 
    let {isLoading,toggleMenu,isMenuOpen}=useUiState()
    onMounted(()=>{
      isUser()
      // autoUpdateTasks()
    })
    return {isLoading,toggleMenu,isMenuOpen}
  }
}
</script>

<style>
*{
  font-family: 'Exo 2', sans-serif;
}
</style>
