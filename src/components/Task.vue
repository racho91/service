<template>

    <div class="task">
        
        <div class="desc">
            <p class="info">
                <strong v-if="task.status==='returned'">!</strong>
                {{task.type}} -  <strong class="orange">{{task.owner}} </strong>
                <strong class="red" v-if="task.status==='returned'"> Върната</strong>
                <strong class="green" v-if="task.status==='active'"> Активна</strong>
                <strong class="blue" v-if="task.status==='aweiting'"> Чака вземане</strong>
                <strong class="gray" v-if="task.status==='complited'"> Завършена</strong>
           </p>
        </div>
        <div class="actions">
            <Button title="Преглед" color="blue" type="normal" @button-click="openCloseInfo"/>
            <Modal v-if="task.status==='active'||task.status==='returned'" openButtonName="Завърши" :isActive="activeMoadalActive" openButtonColor="red" @close-modal="openCloseModalActive" @open-modal="openCloseModalActive"> 
                <template v-slot:modal-header> 
                    <h4>завършен ремонт</h4>
                </template>
                <template v-slot:modal-content> 
                    <Input v-model:data="message" type="textarea" label="Описание на промените" name="desc" id="Desc"/>
                </template>
                <template v-slot:modal-actions> 
                <Button title="Завърши" color="red" type="reverse" @button-click="changeTaskStatus(task.id,'aweiting',task.history,message)"/>
                </template>
            </Modal>
            <Modal v-if="task.status==='aweiting'" openButtonName="Връщане на клиент" :isActive="activeMoadalAweiting" openButtonColor="green" @close-modal="openCloseModalAweiting" @open-modal="openCloseModalAweiting"> 
                <template v-slot:modal-header> 
                    <h4>Връщане на клиент</h4>
                </template>
                <template v-slot:modal-content> 
                    <p>
                        Задачата е завършена със следното съобщение:
                    </p>
                    <p>
                        {{task.history[task.history.length-1].message}}
                    </p>
                    <Input v-model:data="message" type="textarea" label="Описание на промените" name="desc" id="Desc"/>
                </template>
                <template v-slot:modal-actions> 
                <Button title="Връщане на клиент" color="green" type="reverse" @button-click="changeTaskStatus(task.id,'complited',task.history,message)" />
                </template>
            </Modal>
            <Modal v-if="task.status==='aweiting'||task.status==='complited'" openButtonName="Връщане в сервиза" :isActive="activeMoadalComplited" openButtonColor="blue" @close-modal="openCloseModalComplited" @open-modal="openCloseModalComplited"> 
                <template v-slot:modal-header> 
                    <h4>Връщане в сервиза</h4>
                </template>
                <template v-slot:modal-content> 
                    <Input v-model:data="message" type="textarea" label="Описание на промените" name="desc" id="Desc"/>
                </template>
                <template v-slot:modal-actions> 
                <Button title="Направи активна" color="blue" type="reverse" @button-click="changeTaskStatus(task.id,'returned',task.history,message)"/>  
                </template>
            </Modal>
        </div>
        <div v-if="info" class="info">
            <p>Описание:{{task.desc}}</p>
            <p>Тип:{{task.type}} || Състоние:{{task.condition}} ||  ИД:{{task.id}}</p>
            <p>История:</p>
            <p v-for="(state,index) in task.history" :key="index">{{index+1}} -- {{state.timeStamp}} -- {{state.from}} : {{state.message}} || Статус:{{handleStatusText(state.changetTo)}}</p>
            <!-- {{task}} -->

        </div>
    
    </div>
        

</template>

<script>
import Button from '../components/UI/Button'
import Modal from '../components/UI/Modal'
import Input from '../components/UI/Input'
import useTasks from'../composition/useTasks'
import { reactive, toRefs } from 'vue'
export default {
    components:{
        Button,
        Modal,
        Input
    },
    props:{
        task:Object,
    },
    dispatch:[
        'task-comlite','task-returned','task-renew'
    ],
    setup(){
        const {changeTaskStatus}=useTasks()

        const data= reactive({
            message:'',
            info:false,
            activeMoadalActive:false,
            activeMoadalAweiting:false,
            activeMoadalComplited:false,
        })

        const handleStatusText = (text)=>{
            if(text === 'active'){
                return 'Приет в сервиз'
            }
             if(text === 'aweiting'){
                return 'Чака взимане'
            }
             if(text === 'complited'){
                return 'Приключен'
            }
        }

        const openCloseInfo = ()=>{
            data.info = !data.info
        }

        const openCloseModalActive = ()=>{
            data.activeMoadalActive=!data.activeMoadalActive
        }
        const openCloseModalAweiting = ()=>{
            data.activeMoadalAweiting=!data.activeMoadalAweiting
        }
        const openCloseModalComplited = ()=>{
            data.activeMoadalComplited=!data.activeMoadalComplited
        }
        

        return {
            ...toRefs(data),
            handleStatusText,
            openCloseInfo,
            changeTaskStatus,
            openCloseModalActive,
            openCloseModalAweiting,
            openCloseModalComplited
        }
    }

}
</script>

<style>
.task{
    width: 80%;
    margin: auto;
    text-align: center;
    margin-bottom: 4px;
    border: 1px solid lightgrey;
    border-radius: 4px;
}
.task:nth-child(odd){
    background-color: lightgrey;
}
.desc{
    width: 64%;
    display: inline-block;
}
.actions{
    width: 35%;
    display: inline-block;
}
.info{
    text-align: left;
    font-size: 1em;
}
.red{
color:red
}
.green{
color:green
}
.blue{
color:blue
}
.gray{
    color:gray
}
.orange{
    color: orangered;
}
</style>