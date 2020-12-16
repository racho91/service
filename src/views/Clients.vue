<template>
  <router-link :to="{ name: 'Dashboard' }"> Начало </router-link>
  <div class="client" v-for="client in clients" :key="client.id">
    <router-link :to="/user/+client.id"> <strong>{{client.name}} </strong> -- Телефон: {{client.phone}}</router-link>
  </div>
 
  <!-- <ClientsList clients="clients"/> -->
</template>

<script>
import  useClients from '../composition/useClients'

// import  ClientsList from '../components/ClientsList'

export default {
  // components:{
  //   ClientsList
  // },
  setup(){
    const {clients,autoUpdateClients} =useClients()
    autoUpdateClients()
    return {
      clients,
    }
  }

}
</script>

<style>

</style>