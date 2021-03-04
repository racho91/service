<template>

    <div class="notification" v-if="type==='success'" style="background:#59CD90" > 
        <p>{{message}}</p>
        <i class="fas fa-times" @click.prevent="clearNotification" ></i>
    </div>
    <div class="notification" v-else-if="type==='dangerous'" style="background:#EE6352"  > 
        <p>{{message}}</p>
        <i class="fas fa-times" @click.prevent="clearNotification" ></i>
    </div>
    <div class="notification" v-else  style="background:#3FA7D6" > 
        <p>{{message}}</p>
        <i class="fas fa-times" @click.prevent="clearNotification"></i>
    </div>
</template>

<script>
import useNotifications from '../composition/useNotifications'
import{ reactive } from 'vue'
export default {
    name:'Notification',
    props:{
        message:{
            type:[String,Number],
            required:true
        },
        id:{
            type:[String,Number],
            required:true
        },
        type:{
            type:[String,Number],
            required:true
        }
    },
    setup(props){
        const {removeNotification}=useNotifications()

        const state= reactive({
            id:props.id
        })

        const clearNotification = ()=>{
            removeNotification(state.id)
        }

        
        return{
            clearNotification
        }
    }
}
</script>

<style>
.notification{
    opacity: .9;
    font-size: .9em;
  justify-content: space-between;
  display: flex;
  animation-name: disapiar;
  animation-duration: .5s;
  animation-timing-function: ease-in-out;
  padding: .5em;
  margin: .2em .7em ;
  border-radius: .3em;
  color:white;
}

.notification i {
  color: white;
  font-size: .9em;

}
@keyframes disapiar {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>