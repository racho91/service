<template>
<div class="dashboard">
  <p><router-link :to="{ name: 'Clients' }"> Клиенти </router-link>  <router-link :to="{ name: 'Prices' }"> Цени </router-link> </p>
  <CreateTask  />
  <Button @button-click="handleActive('showActiveTasks')" title="Активни" color="#FAC05E" type="normal" />  
  <Button @button-click="handleActive('showAweitingTasks')" title="Чакащи взимане" color="#59CD90" type="normal" />  
  <Button @button-click="handleActive('showComplitedTasks')" title="Завършени" color="#3FA7D6" type="normal" />  
  <Button @button-click="handleActive('showAllTasks')" title="Всички" color="#3FA7D6" type="reverse" />  
  <Button @button-click="signOut()" title="Изход" color="#EE6352" type="normal" />
  <ActiveTasks v-if="showActiveTasks"/>
  <AweitingTasks v-if="showAweitingTasks" />
  <ComplitedTasks v-if="showComplitedTasks"/>
  <AllTasks v-if="showAllTasks" />
  
    
</div>
  
</template>

<script>
import {ref, reactive, toRefs } from 'vue'
//ui imports
import Button from '../components/UI/Button'
// import Modal from '../components/UI/Modal'
import CreateTask from '../components/CreateTask'
import ActiveTasks from '../components/ActiveTaskas'
import AweitingTasks from '../components/AweitingTasks'
import ComplitedTasks from '../components/ComplitedTasks'
import AllTasks from '../components/AllTasks'
//composible impors 
import useAuth from '../composition/useAuth'
// import useTask from '../composition/useTasks'



export default {
  components:{
    Button,
    CreateTask,
    ActiveTasks,
    AweitingTasks,
    ComplitedTasks,
    AllTasks
  },
  setup(){
    const {signOut} = useAuth()
    // const {autoUpdateTasks} = useTask()

    const  data = reactive({
      showActiveTasks:true,
      showAweitingTasks:false,
      showComplitedTasks:false,
      showAllTasks:false,
    })

    // onMounted(()=>{
    //   isUser()
    //   // autoUpdateTasks()
    // })
  
    let showCreateTask = ref(false)

    const handleActive= (active)=>{
        if (active === 'showActiveTasks' ){
          data.showActiveTasks=true,
          data.showAweitingTasks=false,
          data.showComplitedTasks=false,
          data.showAllTasks=false
        }
        if (active === 'showAweitingTasks' ){
          data.showActiveTasks=false,
          data.showAweitingTasks=true,
          data.showComplitedTasks=false,
          data.showAllTasks=false
        }
        if (active === 'showComplitedTasks' ){
          data.showActiveTasks=false,
          data.showAweitingTasks=false,
          data.showComplitedTasks=true,
          data.showAllTasks=false
        }
        if (active === 'showAllTasks' ){
          data.showActiveTasks=false,
          data.showAweitingTasks=false,
          data.showComplitedTasks=false,
          data.showAllTasks=true
        }
    }

    return{
      ...toRefs(data),
      signOut,
      showCreateTask,
      handleActive
    }
  }
}
</script>

<style>
.dashboard{
  text-align: center;
}

</style>