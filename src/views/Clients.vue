<template>
  <p>{{clients}} 22 {{clients2}}</p>
 
  <ClientsList clients="clients"/>
</template>

<script>
import  useClients from '../composition/useClients'

import  ClientsList from '../components/ClientsList'

export default {
  components:{
    ClientsList
  },
  setup(){
    const {clients,clients2} =useClients()
    
    return {
      clients,
      clients2
    }
  }

}
</script>

<style>

</style>