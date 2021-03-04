<template>
  <router-link :to="{ name: 'Dashboard' }"> Начало </router-link>
  <Input v-model:data="field" type="text" label="Имена на клиент" name="name" id="Name"/>
  <div class="client" v-for="client in filtredUsers" :key="client.id">
    <router-link :to="/user/+client.id"> <strong>{{client.name}} </strong> -- Телефон: {{client.phone}}</router-link>
  </div>
  
  <!-- {{field}}
  {{users}} -->
  <!-- <ClientsList clients="clients"/> -->
</template>

<script>
import  useClients from '../composition/useClients'
import Input from '../components/UI/Input'
import { toRefs, reactive, watch ,onMounted } from 'vue'


// import  ClientsList from '../components/ClientsList'

export default {
  // components:{
  //   ClientsList
  // },

  components:{
    Input
  },
  setup(){
    const {clients,autoUpdateClients} =useClients()
    autoUpdateClients()

 

      const state = reactive({
        field:'',
        users: clients.value,
        filtredUsers:{}
      })




    const filterUsers = (value)=>{
      // console.log(value,state.users,state.filtredUsers)
      if (value === ''){
        state.filtredUsers = state.users
      } else{
        state.filtredUsers = state.users.filter((user)=>{

          if (user.name.toLowerCase().includes(value.toLowerCase())||user.phone.toLowerCase().includes(value.toLowerCase())||user.email.toLowerCase().includes(value.toLowerCase())) {
              return {user}
          }  
      })
      }
       
    }

    watch(
      () => state.field,
      (value) => {
       filterUsers(value)
      }
    )

    onMounted(()=>{
      filterUsers('')
    })
   

    return {
      ...toRefs(state),
      clients,
    }
  }

}
</script>

<style>

</style>