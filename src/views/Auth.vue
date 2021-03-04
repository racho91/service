<template>
  <div class="card">  
    <Input v-model:data="email" type="email" label="Email" name="email" id="email" v-model:inputError="errors.email" :chekForError="chekForError"/>
    <Input v-model:data="password" type="password" label="Парола" name="password" id="password" v-model:inputError="errors.password" :chekForError="chekForError"/>
    <Button @button-click="handleSignIn" title="Вход" color="green" type="normal" :disabled="buttonStatus" />  
  </div>
</template>

<script>
import Input from '../components/UI/Input.vue'
import Button from '../components/UI/Button.vue'
import { reactive, toRefs, watch } from 'vue'

import useAuth from '../composition/useAuth'
import useHelpers from '../composition/useHelpers'

export default {
  components:{
    Input,
    Button
  },
  setup(){

    const {singIn}=useAuth()
    const {fieldValidation} = useHelpers()
    let loginData= reactive({
      email:'',
      password:'',
      errors:{
        email:false,
        password:false
      },
      chekForError:false,
      buttonStatus:false
    })

    const handleSignIn = ()=>{
      
      loginData.chekForError=true
      loginData.buttonStatus = !fieldValidation(loginData.errors)
      singIn(loginData.email,loginData.password)
    }


    watch(
      ()=>loginData.errors,
      (errors)=>{
        loginData.buttonStatus = !fieldValidation(errors)
      },
      {deep:true}
    )

    

    return{
      ...toRefs(loginData),
      handleSignIn
    }
  }

}
</script>

<style>
.card{
  width: 60%;
  max-width: 700px;
  min-width: 400px;
  
  margin: auto;
  padding: 2em;
  border-radius: 3px;
  box-shadow:  0px 12px 13px -12px black;
  background:  #f3f3f3;
  text-align: center;
}

</style>