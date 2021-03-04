import { reactive, toRefs } from 'vue';
// import router from '../router/index'
import {db} from '../firebase'
// import useUiState from './useUiState'
// import useNotifications from './useNotifications' 
// import useClients from './useClients'
// import useAuth from './useAuth'


const state = reactive({
    curentService:'',
    allServices:[],
    allServicesList:[]

});

const createNewService  = (serviceData)=>{
    return new Promise((resolve, reject)=>{
        db.collection('services').add({
            ...serviceData
        }).then((doc)=>{
            doc.get().then((service)=>{
                state.curentService=service
                // addNotification('Успешно добавена задача!','success',7000)
                resolve(service)
            })
            
        }).catch((error)=>{
            // addNotification(error.message,'dangerous',7000)
            reject(error)
        })

    })
}

export default function usePrices(){

    const createService = (serviceData)=>{
        createNewService(serviceData)
        .then(console.log('omm'))
        .catch(console.log('off'))
    }

    const subServices = ()=>{
        db.collection("services")
        .onSnapshot((result)=>{
            state.allServices=[]
            state.allServicesList=[]
            result.forEach( (doc)=>{
                let data = doc.data()
                state.allServices.push({
                    id:doc.id,
                    ...data
                }),
                state.allServicesList.push({
                    name:'',
                    value:data.name +' - '+ data.price
                })
            })
        })
        console.log('services sub')
    }

    const removeService =(id)=>{
        db.collection('services').doc(id).delete().then(()=>{
            console.log('успешно премахната услуга')
        }).catch((error)=>{
            console.log('грешка при премахане на услугата',error)
        })
    }

    // const allPricesList = ()=>{
    //     return state.allPricesList
    // }

    // const autoUpdateTasks = ()=>{
    //     console.log('task sub')
    //     db.collection("tasks")
    //     .onSnapshot((result)=>{
    //         state.tasks=[],
    //         state.activeTasks=[],
    //         state.aweitingTasks=[],
    //         state.complitedTasks=[],
    //         result.forEach((doc)=> {
    //             let data = doc.data()
    //             if(data.status === 'active'|| data.status === 'returned'){
    //                 state.activeTasks.push({
    //                     id:doc.id,
    //                     ...data
    //                 })
    //                 // console.log('active task')
    //             }
    //             if(data.status === 'aweiting'){
    //                 state.aweitingTasks.push({
    //                     id:doc.id,
    //                     ...data
    //                 })
    //                 // console.log('aweiting task')
    //             }
    //             if(data.status === 'complited'){
    //                 state.complitedTasks.push({
    //                     id:doc.id,
    //                     ...data
    //                 })
    //                 // console.log('complited task')
    //             }
    //             state.tasks.push({
    //                 id:doc.id,
    //                 ...data
    //             })
    //             // console.log('all task')
    //         })

    //         // myList.sort(function(x, y){
    //         //     return x.timestamp - y.timestamp;
    //         // })
    //         state.tasks.sort((x,y)=>y.createdAt - x.createdAt)
    //         state.activeTasks.sort((x,y)=>y.createdAt - x.createdAt)
    //         state.aweitingTasks.sort((x,y)=>y.createdAt - x.createdAt)
    //         state.complitedTasks.sort((x,y)=>y.createdAt - x.createdAt)
    //         // addNotification('Задачите са заредени или е променено е съдържание в задачите !','info',7000)
    //     })
    // }
    
    // const editService = ()=>{
        
    // }
    // const deleteService = ()=>{
        
    // }
    // const updateService = ()=>{
        
    // }

    return{
        ...toRefs(state),
        createService,
        subServices,
        removeService
    }
}