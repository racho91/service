<template>

  <Modal openButtonName="Създаване на задача" :isActive="activeModal" openButtonColor="#59CD90" @close-modal="closeModal" @open-modal="openModal"> 
    <template v-slot:modal-header> 
        <h4>Създаване на задача</h4>
    </template>
    <template v-slot:modal-content> 
      <AutoCompliteInput v-model:data="selected.value" label="Телефон на клиент"  name="phone" id="phone" :options="clientOptions"  v-model:inputError="errors.phone" :isDisabled="isDisabled" :chekForError="chekForError" />
      <Input v-model:data="selected.name" type="text" label="Имена на клиент" name="name" id="Name"  v-model:inputError="errors.name" :chekForError="chekForError" />
      <AutoCompliteInput v-model:data="type" label="Тип на устройство"  name="as" id="type" :options="typeOptions"  v-model:inputError="errors.type" :chekForError="chekForError" />
      <AutoCompliteInput v-model:data="condition" label="Състояние"  name="condition" id="as" :options="conditionOptions"  v-model:inputError="errors.condition" :chekForError="chekForError" />
      <Input v-model:data="description" type="textarea" label="Описание" name="desc" id="Desc"  v-model:inputError="errors.description" :chekForError="chekForError"  />
    </template>
    <template v-slot:modal-actions> 
      <Button @button-click="clearSelected" title="Изчисти" color="#FAC05E" type="normal" />  
      <Button @button-click="createTask" title="Запиши" color="#59CD90" type="normal" :disabled="buttonStatus" /> 
    </template>
  </Modal>

  <div class="hide">
    <div id="to-pdf" class="avoid-all">
      <PDFHeader/>
      <div class="pdf-content">
        <br>
        <p>Клиент:<strong>{{selected.name}}</strong> / телефон:{{selected.value}} </p>
        <p>Идентикафиционен номер на заявката:{{taskId}}</p>
        <p>Тип:{{type}}  / Състояние:{{condition}}</p>
        <p>Описание на проблема:<br>{{description}}</p>
        
        
        <div class="inform">
          <div class="left">
            <p >Приел: ...........</p>
            <p>({{user.name}})</p>
          </div>
          <div class="right">
            <p>Клиент: ...........</p>
            <p >({{selected.name}})</p>
          </div>
        </div>
        <div class="warning">
            <p><strong>"ССН Консулт" ЕООД не носи отговорност за нелицензиран  софтуер!</strong></p>
            <p><strong>"ССН Консулт" ЕООД не носи отговорност за непотърсени, отремонтирани устройства след изминали 14 дни от датата на уведомяване за приключен ремонт!</strong></p>
        </div>
        <br>
      </div>
      <hr>
      <PDFHeader/>
      <div class="pdf-content">
        <br>
        <p>Клиент:<strong>{{selected.name}}</strong> / телефон:{{selected.value}} </p>
        <p>Идентикафиционен номер на заявката:{{taskId}}</p>
        <p>Тип:{{type}}  / Състояние:{{condition}}</p>
        <p>Описание на проблема:<br>{{description}}</p>
        
        <div class="inform">
          <div class="left">
            <p >Приел: ...........</p>
            <p>({{user.name}})</p>
          </div>
          <div class="right">
            <p>Клиент: ...........</p>
            <p >({{selected.name}})</p>
          </div>
        </div>
        
        <div class="warning">
            <p><strong>"ССН Консулт" ЕООД не носи отговорност за нелицензиран  софтуер!</strong></p>
            <p><strong>"ССН Консулт" ЕООД не носи отговорност за непотърсени, отремонтирани устройства след изминали 14 дни от датата на уведомяване за приключен ремонт!</strong></p>
        </div>
        <br>
      </div>
    </div>
  </div>

  
</template>

<script>
//import from vue 
import { reactive, toRefs, watch, onMounted, computed } from 'vue'
//import UI elemnts 
import Input from '../components/UI/Input.vue'
import AutoCompliteInput from '../components/UI/AutoComliteInput'
import PDFHeader from '../components/UI/PDF/PDFHeader.vue'
import Button from '../components/UI/Button'
import Modal from '../components/UI/Modal'
//import composition functions
import useToPdf from '../composition/useToPdf'
import useTasks from '../composition/useTasks'
import useClients from '../composition/useClients'
import useAuth from '../composition/useAuth'
import useHelpers from '../composition/useHelpers'


export default {
  name: 'CreateTask',
  emits:['action-done'],
  components:{
    Input,
    AutoCompliteInput,
    PDFHeader,
    Button,
    Modal
  },
  setup(){
    const {getPDF} = useToPdf()
    const {addTask,curentTask} = useTasks()
    const {addClient,autoSelectClients,autoUpdateClients}=useClients()
    const {user}=useAuth()
    const {fieldValidation}=useHelpers()
    // const {u} = usePromise()
    let data = reactive({
        user:{
          email:'',
          passsword:''
        },
        clientOptions: computed(()=>autoSelectClients()) ,
        conditionOptions:[
          {name:'',value:'Работещ'},
          {name:'',value:'Неработещ'}
        ],
        condition:'',
        typeOptions:[
          {name:'',value:'Лаптоп'},
          {name:'',value:'Телефон'}
        ],
        type:'',
        selected:{
          name:'',
          id:'',
          value:''
        },
        description:'',
        isDisabled:false,
        taskId:'',
        activeModal:false,
        chekForError:false,
        buttonStatus:false,
        errors:{
          name:false,
          phone:false,
          type:false,
          condition:false,
          description:false
        }
        
    })

    onMounted(()=>{
        autoUpdateClients()
        console.log('Klientite sa zaredeni')
    })

    
   

    const createTask = ()=>{
      data.chekForError=true
      data.buttonStatus = !fieldValidation(data.errors) 
      console.log(data.buttonStatus)
      setTimeout(
        ()=>{
          if (!data.buttonStatus){
        let newTask = {
          desc:data.description,
          type:data.type,
          condition:data.condition,
          status:'active',
          owner:data.selected.name,
          ownerPhone:data.selected.value
        }
        if(data.selected.id ===''){
          let newClient = {
            name:data.selected.name,
            phone:data.selected.value,
            email:''
          }
          addClient(newClient).then((clientId)=>{
            data.selected.id=clientId
            addTask(newTask,data.selected)
            .then((result)=>{
              console.log(result)
              data.taskId=result.id,
              downloadPdf()
            })
            .catch((err)=>{
              console.log('err',err)
            })
          })
          }else{
            addTask(newTask,data.selected).then((result)=>{
              console.log(result)
              data.taskId=result.id,
              downloadPdf()
            }).catch((err)=>{
              console.log('err',err)
            })
          }
        }
      },600)

 
    }

    const downloadPdf = ()=>{
          let element = document.getElementById('to-pdf');
          getPDF(element,data.selected.value).then(()=>{
            data.activeModal=false
            clearSelected()
            })  
    }

    const clearSelected = ()=>{
      data.selected= {
          name:'',
          id:'',
          value:''
        }
      data.description='',
      data.taskId='',
      data.type='',
      data.condition='',
      data.isDisabled=false,
      data.errors={
        name:false,
        phone:false,
        type:false,
        condition:false,
        description:false
      },
      data.buttonStatus=false
    }

    

    watch( ()=>data.selected.value,()=>{
     
      data.clientOptions.forEach(element => {
        if (element.value === data.selected.value) {
          data.selected = element
          data.isDisabled = true
          console.log('selected', data.selected)
        }
        if (data.selected.value === '') {
         clearSelected()

        }
      })
    })
    watch(
      ()=>data.errors,
      (errors)=>{
        data.buttonStatus = !fieldValidation(errors)
      },
      {deep:true}
    )


    const openModal = ()=>{
      data.activeModal=true
    }
    const closeModal = ()=>{
      data.activeModal=false
      clearSelected()
    }
   
   

    return{
      ...toRefs(data),
      downloadPdf,
      clearSelected,
      createTask,
      autoSelectClients,
      curentTask,
      openModal,
      closeModal,
      user
    }
  }
}
</script>

<style>
.center
.create-task{
  text-align: center;
  width: 100%;
}
.hide{
  visibility: hidden;
  position: absolute;
  top: 0;
  left:0;
  z-index: -99;
}
#to-pdf{
  margin: 0;
  padding: 0;
  width:194mm;
  text-align: center;
}

.pdf-content p {
  margin-bottom: 1mm;
  line-height: 1.2em;
  margin-top:2mm ;
}
.inform{
  margin: auto;
  width: 90%;
   padding: 5mm;
   margin-bottom: 15mm;
}
.warning{
  margin: auto;
  width: 90%;
  padding: 3mm;
  border:1mm solid red;
  }

.left, .right {
  display: inline-block;
  /* margin: 30mm; */
  margin-top: 0;
 
}
.left{
  float: left;
  
}
/* .left .omm{
  margin-left: -30px;
} */

.right{
  float: right;
  /* margin-right: 80px; */
}

/* .right .omm{
   margin-right: 80px; 
} */

</style>
