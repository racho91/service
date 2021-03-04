<template>
<div class="notifications">
    <Notification 
        v-for="notification in notifications" 
        :key="notification.id" 
        :id="notification.id" 
        :message="notification.message" 
        :type="notification.type"  />
    </div>  
</template>

<script>
import Notification from './Notification'
import useNotifications from '../composition/useNotifications'
export default {
    name:'Notifications',
    components:{
        Notification
    },
    setup(){
        let {notifications}=useNotifications()
        
        return{
            notifications
        }
    }
}
</script>

<style>
.notifications{
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  width: 20em;
  /* height: 100vh; */
  flex-flow: column;
}


</style>