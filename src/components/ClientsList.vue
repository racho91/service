<template>
    
  <div v-if="clients">
    <p v-for="client in clients" :key="client.id">{{client.name}}{{client.phone}}</p>
  </div>
  <div v-else>
      <p>Няма данни за клиентите!!! </p>
  </div>
</template>

<script>
export default {
    props:{
        'clients':Array
    }

}
</script>

<style>

</style>