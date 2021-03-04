import { reactive, computed } from 'vue';
import router from '../router/index'
import {auth} from '../firebase'
import useUiState from './useUiState'
import useNotifications from './useNotifications' 
import useTasks from './useTasks'
import useClients from './useClients'
import usePrices from './usePrices'

let {loadingStart,loadingEnd}=useUiState()
let {addNotification}= useNotifications()
let {clearTasks,autoUpdateTasks}=useTasks()
let {autoUpdateClients}=useClients()
let {subServices}=usePrices()

const state = reactive({
    user:{
        id:'',
        email:'',
        role:'',
        name:''
    },
});

export default function useAuth(){
 const singIn = (email,password)=>{ 
    if (!email||!password){
        addNotification('Моля попълнете полетата за вход !','dangerous',7000)
    }
    else{ 
        loadingStart() 
        auth.signInWithEmailAndPassword(email,password)
        .then((result)=>{
            let name=''
            if(result.user.email === 'petyopenkov@hotmail.com'){
                name='Петьо Пенков'
             }
             if(result.user.email === 'ssn@ssn.bg'){
                name='Светлозар Найденов'
             }
             if(result.user.email === 'sales@ssn.bg'){
                name='Александрина Гавраилова'
             }
            state.user={
                id:result.user.uid,
                email:result.user.email,
                name:name
            }
            state.email=''
            state.password='' 
            isAdmin()
            loadingEnd()
            addNotification(`Успешен вход !  `+state.user.email,'success',7000)
            router.push({path:'/dashboard'})
        })
        .catch((error)=>{
            addNotification(error.message,'dangerous',7000)
            router.push({path:'/'})
            loadingEnd()
        })
    }
  }

  const singUp = (email,password)=>{ 
    if (!email||!password){
        addNotification('Моля попълнете полетата за вход !','dangerous',7000)
    }
    else{ 
        loadingStart() 
        auth.createUserWithEmailAndPassword(email,password)
        .then((result)=>{
            let name=''
            if(result.user.email === 'petyopenkov@hotmail.com'){
                name='Петьо Пенков'
             }
             if(result.user.email === 'ssn@ssn.bg'){
                name='Светлозар Найденов'
             }
             if(result.user.email === 'sales@ssn.bg'){
                name='Александрина Гавраилова'
             }
            state.user={
                id:result.user.uid,
                email:result.user.email,
                name:name
            }
            state.email=''
            state.password='' 
            loadingEnd()
            addNotification(`Успешен вход !  `+state.user.email,'success',7000)
            console.log(result)
            router.push({path:'/dashboard'})
        })
        .catch((error)=>{
            addNotification(error.message,'dangerous',7000)
            router.push({path:'/'})
            loadingEnd()
        })
    }
  }
  
  const signOut = ()=>{
    loadingStart()
    auth.signOut()
    .then(()=> {
        addNotification('Успешен изход !','info',7000)
        state.user.email=''
        state.user.id=''
        router.push({path:'/'})
        clearTasks()
        clearUser()
        loadingEnd() 
    })
    .catch((error)=>{
        addNotification(error.message,'dangerous',7000)
        clearTasks()
        router.push({path:'/'})
        loadingEnd() 
    });
  }

  const isAdmin =()=>{
    auth.currentUser.getIdTokenResult()
    .then((idTokenResult) => {
       if (idTokenResult.claims.isAdmin ) {
            state.user.role='administrator'
            autoUpdateClients()
            autoUpdateTasks()
            subServices()
       } else {
            state.user.role='user'
       }
    })
    .catch((error) => {
        addNotification(error.message,'info',7000)
    });
  }

  const clearUser = ()=>{
      state.user = {id:'',email:'',role:''}
  }

  const isUser=()=>{
    loadingStart()
    auth.onAuthStateChanged((user)=>{
        if(user){
            let name=''
            if(user.email === 'petyopenkov@hotmail.com'){
               name='Петьо Пенков'
            } 
            if(user.email === 'ssn@ssn.bg'){
                name='Светлозар Найденов'
             }
             if(user.email === 'sales@ssn.bg'){
                name='Александрина Гавраилова'
             }
            state.user={
                id:user.uid,
                email:user.email,
                name:name
            } 
            isAdmin()
            router.push('dashboard')
            loadingEnd()
        }else{
            clearTasks()
            loadingEnd()
        }
      })
  }

  const user = computed(()=>state.user)

  return {user,singIn,singUp,signOut,isUser}
}
