<template>
    
  <div v-if="clients">
    <p v-for="client in clients" :key="client.id">{{client.name}}{{client.phone}}</p>
  </div>
  {{users}}test
  <div v-else>
      <p>Няма данни за клиентите!!! </p>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
    props:{
        'clients':Array
    },
    stup(props){

      const state = reactive({
        users: props.clients
      })


      return{
        ...toRefs(state)
      }
    }

}
</script>

<style>

</style>