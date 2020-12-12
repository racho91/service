import { reactive,  toRefs , computed} from 'vue';
// import router from '../router/index'
import {db} from '../firebase'
// import useUiState from './useUiState'
import useNotifications from './useNotifications' 

// let {loadingStart,loadingEnd}=useUiState()
let {addNotification}= useNotifications()

const state = reactive({
    clients:[],
    curentClient:{
        id:''
    }

});

export default function useClients(){
    
    const addClient = (newClient)=>{
        return new Promise((resolve, reject)=>{
            db.collection('clients').add({
                name:newClient.name,
                phone:newClient.phone,
                email:newClient.email
            })
            .then((doc)=>{ 
                addNotification('Успешно добавена клиент!','success',7000)
                resolve(doc.id)
                
            })
            .catch((error)=>{
                addNotification(error.message,'dangerous',7000)
                reject()
            })
        })
        
    }
   
    const updateClient = (client)=>{
        let updateClient={
            name : client.name,
            phone : client.phone,
            email : client.email
        }
        db.collection('clients').doc(client.id).update({
            ...updateClient
        })
        .then(()=>{
            addNotification('Успешно обновена редактиран клиент!','success',7000)
        }).catch((error)=>{
            addNotification(error.message,'dangerous',7000)
        })
    }

    const autoUpdateClients = ()=>{
        db.collection("clients")
        .onSnapshot((result)=>{
            state.clients=[]
            result.forEach((doc)=> {
                let data = doc.data()
                state.clients.push({
                    ...data,
                    id:doc.id
                })
            })
            addNotification('Клиентите са заредени или е променено е съдържание в Клиентите !','info',2000)
        })
    }

    const removeClient =(id)=>{
        db.collection('clients').doc(id).delete().then(()=>{
            addNotification('Успешно премахнат клиент!','success',7000)
        }).catch((error)=>{
            addNotification(error.message,'dangerous',7000)
        })
    }

    const clearClients = ()=>{
        state.clients = []
    }

    const autoSelectClients = ()=>{
        let omm=[]
        state.clients.forEach((element)=>{
            omm.push({
                name:element.name,
                value:element.phone,
                id:element.id
            })
        })
        return omm
    }


    const clearCurentClient = ()=>{
        state.curentClient.id= ''
    }


    return { 
        ...toRefs(state),
        clients2:computed(state.clients),
        addClient,
        removeClient,
        updateClient,
        clearClients,
        autoUpdateClients,
        clearCurentClient,
        autoSelectClients
    }
}
