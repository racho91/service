<template>
  <p>Home</p>
 
  <AutoCompliteInput v-model:data="selected.value" label="Phone"  name="as" id="as" :options="options"  :isDisabled="isDisabled" />
  <p class="center"  @click="clearSelected">Clear</p>
  <Button title="Clear" color="black" />
  <Input v-model:data="selected.name" type="text" label="Name" name="name" id="Name"/>
  <Input v-model:data="description" type="textarea" label="description" name="desc" id="Desc"/>
  <p class="center" @click="downloadPdf">Download</p>
  <div class="hide">
    <div id="to-pdf" class="avoid-all">
      <PDFHeader/>
      <div class="pdf-content">
        <p>Клиент:<strong>{{selected.name}}</strong> / телефон:{{selected.value}} </p>
        <p>{{description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
//import from vue 
import { reactive, toRefs, watch  } from 'vue'
//import UI elemnts 
import Input from '../components/UI/Input.vue'
import AutoCompliteInput from '../components/UI/AutoComliteInput'
import PDFHeader from '../components/UI/PDF/PDFHeader.vue'
import Button from '../components/UI/Button'
//import composition functions
import useToPdf from '../composition/useToPdf'

export default {
  name: 'Home',
  components:{
    Input,
    AutoCompliteInput,
    PDFHeader,
    Button
  },
  setup(){
    const {getPDF} = useToPdf()

    let data = reactive({
        user:{
          email:'',
          passsword:''
        },
        options:[
          {
            name:'Петьо Пенков',
            id:'1',
            value:'0883410249'
          },
          {
            name:'Светлозар Найденов',
            id:'2',
            value:'0883676459'
          },
          {
            name:'Александра Гавраилова',
            id:'3',
            value:'0885623487'
          }
        ],
        selected:{
          name:'',
          id:'',
          value:''
        },
        description:'',
        isDisabled:false
    })

    const downloadPdf = ()=>{
        let element = document.getElementById('to-pdf');
        getPDF(element,data.selected.value)
    }

    const clearSelected = ()=>{
      data.selected= {
          name:'',
          id:'',
          value:''
        }
      data.isDisabled=false
    }

    watch( ()=>data.selected.value,()=>{
      data.options.forEach(element => {
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
    // const setSelected =()=>{
    //   data.options.forEach(element => {
    //     if (element.value === data.selected.value) {
    //       data.selected = element

    //     }
    //   })
    // }
    

    return{
      ...toRefs(data),
      downloadPdf,
      clearSelected
      // setSelected
    }
  }
}
</script>

<style>
.center{
  text-align: center;
  width: 100%;
}
.hide{
  visibility: hidden;
}
#to-pdf{
  width: 100%;
  text-align: center;
}

</style>
