import { reactive, computed } from 'vue'

const state=reactive({
    notifications:[]
})

const createNotification = (message,type,time)=>{
    
    console.log('syzdavane na izvestie ',message)
    let date = new Date()
    let timeOut = parseInt(time)
    let id= date.toISOString()+Math.random()
    state.notifications.push({message,id,type}) 
    setTimeout(()=>{
        state.notifications.forEach((element,index) => {
                if(element.id === id){
                    state.notifications.splice(index,1)
                }
            });
        },timeOut)
}

export default function useNotifications(){

    const addNotification= (message,type,time)=>{
        console.log('add notification',state.notifications)
        if (state.notifications.length>0){
            console.log(message,state.notifications[length-1])
            if (message === state.notifications[length-1]){
                createNotification(message,type,time)
            }

        }
        else{
            createNotification(message,type,time)
        }
    }   

    const removeNotification = (id)=>{
        state.notifications.forEach((element,index) => {
            if(element.id === id){
                state.notifications.splice(index,1)
            }
        });
    }
    

    return{
        notifications:computed(()=>state.notifications),
        addNotification,
        removeNotification
    }
}