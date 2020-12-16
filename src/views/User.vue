<template>
    <div class="user">
        <!-- {{userId}}{{client}} -->
        <router-link :to="{ name: 'Dashboard' }"> Начало </router-link>
        <h1> {{client.name}}</h1>
        <p>Телефон: {{client.phone}}</p>
        <p>Email: {{client.email}}</p>
        <p>ИД: {{userId}}</p>
        <Task v-for="task in tasks" :key="task.id" :task="task" />

    </div>
</template>

<script>
import useClients from '../composition/useClients'
import useTasks from '../composition/useTasks'

import Task from '../components/Task'

import { reactive, toRefs } from 'vue'
export default {
    components:{
        Task
    },
    props:{
        userId:String
    },
    setup(props){
        const {getClientById,}=useClients()
        const {getTaskByClient}=useTasks()
        const state = reactive({
            client:'',
            tasks:''
        })
        getClientById(props.userId).then(value=>state.client=value)
        getTaskByClient(props.userId).then(value=>state.tasks=value)
       
        return {
            ...toRefs(state)

        }
    }

}
</script>

<style>
*{
    text-align: center;
}

</style>