import { reactive, toRefs } from 'vue';
// import router from '../router/index'
import {db} from '../firebase'
// import useUiState from './useUiState'
import useNotifications from './useNotifications' 
// import useClients from './useClients'
import useAuth from './useAuth'

// let {loadingStart,loadingEnd}=useUiState()
let {addNotification}= useNotifications()
// let {addClient}=useClients()
let {user}=useAuth()

const state = reactive({
    tasks:[],
    activeTasks:[],
    aweitingTasks:[],
    complitedTasks:[],
    curentTask:{}
});


const addData = ()=>{return Math.floor(Date.now() / 1000)} 


const createTask= (newTask,clientId)=>{
    
 
    console.log('eha',newTask,clientId)
    let taskData ={
        ...newTask,
        client:clientId,
        createdAt: addData(),
        updatedAt: addData(),
        history:[
            {
                changetTo:'active',
                from:user.value.name,
                message:'Приемане за ремонт в сервиз',
                timeStamp: addData()
            }
        ]
    }
    // console.log('newTask', taskData)
    return new Promise((resolve, reject)=>{
        db.collection('tasks').add({
            ...taskData
        }).then((doc)=>{
            doc.get().then((task)=>{
                state.curentTask=task
                addNotification('Успешно добавена задача!','success',7000)
                resolve(task)
            })
            
        }).catch((error)=>{
            addNotification(error.message,'dangerous',7000)
            reject()
        })

    })
    
}


export default function useTasks(){
    const addTask =(newTask,client)=>{
        state.curentTask={}
        return createTask(newTask,client.id)     
    }

    // //to fix date stamps    

    // const setDataStamp = (task)=>{
    //     db.collection('tasks').doc(task.id).update({
    //         ...task,
    //         createdAt: '1606780800',
    //         updatedAt:'1606780800'
    //     })
    // }

    const updateTask = (task)=>{
        let updatedTask={
            name : task.name,
            desc : task.desc,
            state : task.state,
            owner : task.owner,

        }
        db.collection('tasks').doc(task.id).update({
            ...updatedTask
        })
        .then(()=>{
            addNotification('Успешно обновена задача!','success',7000)
        }).catch((error)=>{
            addNotification(error.message,'dangerous',7000)
        })
    }

    const changeTaskStatus = (taskId,status,history,message)=>{
        console.log(taskId,status)
        // let localDate = addData
        // localDate = localDate.toLocaleString()
        let  task = db.collection('tasks').doc(taskId)
        task.update({
            status:status,
            updatedAt:addData(),
            history:[
                ...history,
                {
                    changetTo:status,
                    from:user.value.name,
                    message:message,
                    timeStamp: addData()
                }
            ] 
        })
        .then(()=>{
            // console.log('status updated')
            if(status === 'active'){
                status = 'Приета задача'
            }
            if(status === 'aweiting'){
                status = 'Задачата чака взимане'
            }
            if(status === 'complited'){
                status = 'Задачатра е върната на лиента'
            }
            if(status === 'returned'){
                status = 'задачата е върната в сервиза'
            }
            if (message){
                addNotification(status+' - '+message,'info',7000)
            }else{
                addNotification(status,'info',7000)
            }
            
        })
        .catch((err)=>{
            addNotification(err.message,'dangerous',7000)
            // console.log(err)
        })
    }

    const autoUpdateTasks = ()=>{
        console.log('task sub')
        db.collection("tasks")
        .onSnapshot((result)=>{
            state.tasks=[],
            state.activeTasks=[],
            state.aweitingTasks=[],
            state.complitedTasks=[],
            result.forEach((doc)=> {
                let data = doc.data()
                if(data.status === 'active'|| data.status === 'returned'){
                    state.activeTasks.push({
                        id:doc.id,
                        ...data
                    })
                    // console.log('active task')
                }
                if(data.status === 'aweiting'){
                    state.aweitingTasks.push({
                        id:doc.id,
                        ...data
                    })
                    // console.log('aweiting task')
                }
                if(data.status === 'complited'){
                    state.complitedTasks.push({
                        id:doc.id,
                        ...data
                    })
                    // console.log('complited task')
                }
                state.tasks.push({
                    id:doc.id,
                    ...data
                })
                // console.log('all task')
            })

            // myList.sort(function(x, y){
            //     return x.timestamp - y.timestamp;
            // })
            state.tasks.sort((x,y)=>y.createdAt - x.createdAt)
            state.activeTasks.sort((x,y)=>y.createdAt - x.createdAt)
            state.aweitingTasks.sort((x,y)=>y.createdAt - x.createdAt)
            state.complitedTasks.sort((x,y)=>y.createdAt - x.createdAt)
            // addNotification('Задачите са заредени или е променено е съдържание в задачите !','info',7000)
        })
    }

    const removeTask =(id)=>{
        db.collection('tasks').doc(id).delete().then(()=>{
            addNotification('Успешно премахната задача!','success',7000)
        }).catch((error)=>{
            addNotification(error.message,'dangerous',7000)
        })
    }

    const clearTasks = ()=>{
        state.task = []
    }

    const getTaskByClient = (id)=>{
        return new Promise ((resolve,reject)=>{
            let tasks = []
            db.collection('tasks').where('client','==',id).get()
            .then((result)=> {
                result.forEach((doc)=>{
                    tasks.push({
                    id:doc.id,
                    ...doc.data()
                })
            }) 
            tasks.sort((x,y)=>y.createdAt - x.createdAt)
            resolve (tasks)
            })
            .catch((err)=>{
                console.log('getTaskByClient',err.message)
                reject
            })
    
        })
    }


    return { 
        // tasks: computed(()=>state.tasks),
        // activeTasks: computed(()=>state.activeTasks),
        // aweitingTasks: computed(()=>state.aweitingTasks),
        // curentTask:computed(()=>state.curentTask),
        ...toRefs(state),
        addTask,
        removeTask,
        updateTask,
        clearTasks,
        autoUpdateTasks,
        changeTaskStatus,
        getTaskByClient,
        // setDataStamp
    }
}
