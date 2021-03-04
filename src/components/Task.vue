<template>

    <div class="task">
        
        <div class="desc">
            <!-- <p @click="removeTask(task.id)">Изтрий</p> -->
            <p class="info">
                <strong v-if="task.status==='returned'">!</strong>
                {{task.type}} - <router-link :to="/user/+task.client"> <strong class="orange">{{task.owner}} </strong></router-link>
                <strong class="red" v-if="task.status==='returned'"> Върната</strong>
                <strong class="green" v-if="task.status==='active'"> Активна</strong>
                <strong class="blue" v-if="task.status==='aweiting'"> Чака вземане</strong>
                <strong class="gray" v-if="task.status==='complited'"> Завършена</strong>
                <span class="date">{{handleTime(task.createdAt)}}</span> 
                <span v-if="task.status!='active'" class="date-updated">{{handleTime(task.updatedAt)}}</span> 
           </p>
        </div>
        <div class="actions">
            <!-- <Button title="Преглед" color="blue" type="normal" @button-click="openCloseInfo"/> -->
            <i class="fas fa-eye blue"  @click="openCloseInfo" ></i>
            <Modal v-if="task.status==='active'||task.status==='returned'" modalType="icon" openButtonName="fa-check" :isActive="activeMoadalActive" openButtonColor="#FAC05E" @close-modal="openCloseModalActive" @open-modal="openCloseModalActive"> 
                <template v-slot:modal-header> 
                    <h4>завършен ремонт</h4>
                </template>
                <template v-slot:modal-content> 
                    <h5>Извършени деиствия</h5>
                    <AutoCompliteInput v-for="(action,index) in actions" v-model:data="actions[index]" :label="index+1+' действие'"  :name="'action' + index" :id="action+index" :options="allServicesList"  :key="index" />
                    <Button title="Добави действие" color="red" type="reverse" @button-click="addAction"/>
                    <hr>
                    <h5>Вложени компоненти</h5>
                    <AutoCompliteInput v-for="(component,index) in components" v-model:data="components[index]" :label="index+1+' конпонент'"  :name="component + index" :id="component+index" :options="clientOptions"  :key="index" />
                    <Button title="Добави действие" color="red" type="reverse" @button-click="addComponent"/>
                    <hr>
                    <Input v-model:data="message" type="textarea" label="Описание на промените" name="desc" id="Desc"/>
                </template>
                <template v-slot:modal-actions> 
                <Button title="Завърши" color="red" type="reverse" @button-click="changeTaskStatus(task.id,'aweiting',task.history,message);closeAllModals();clearMessage()"/>
                
                </template>
            </Modal>
            <Modal v-if="task.status==='aweiting'" modalType="icon" openButtonName="fa-check-circle" :isActive="activeMoadalAweiting" openButtonColor="#59CD90" @close-modal="openCloseModalAweiting" @open-modal="openCloseModalAweiting"> 
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
                <Button title="Връщане на клиент" color="green" type="reverse" @button-click="changeTaskStatus(task.id,'complited',task.history,message);closeAllModals()" />
                <p @click="removeTask(task.id)">D</p> 
                </template>
            </Modal>
            <Modal v-if="task.status==='aweiting'||task.status==='complited'" modalType="icon" openButtonName="fa-undo" :isActive="activeMoadalComplited" openButtonColor="#F79D84" @close-modal="openCloseModalComplited" @open-modal="openCloseModalComplited"> 
                <template v-slot:modal-header> 
                    <h4>Връщане в сервиза</h4>
                </template>
                <template v-slot:modal-content> 
                    <Input v-model:data="message" type="textarea" label="Описание на промените" name="desc" id="Desc"/>
                </template>
                <template v-slot:modal-actions> 
                <Button title="Направи активна" color="blue" type="reverse" @button-click="changeTaskStatus(task.id,'returned',task.history,message);closeAllModals()"/>  
                </template>
            </Modal>
            
        </div>
        <div v-if="info" class="info">
            <p>Описание:{{task.desc}}</p>
            <p>Тип:{{task.type}} || Състоние:{{task.condition}} ||  ИД:{{task.id}}</p>
            <p>Дата на създаване: {{handleTime(task.createdAt)}}  || Дата на послено действие: {{handleTime(task.updatedAt)}}</p>
            <p>История:</p>
            <p v-for="(state,index) in task.history" :key="index">{{index+1}} -- {{ handleTime(state.timeStamp)}} -- {{state.from}} : {{state.message}} || Статус:{{handleStatusText(state.changetTo)}}</p>
            <!-- {{task}} -->
            <!-- <i class="fas fa-trash-alt" @click="removeTask(task.id)"></i> -->

        </div>
    
    </div>
        

</template>

<script>
import Button from '../components/UI/Button'
import Modal from '../components/UI/Modal'
import Input from '../components/UI/Input'
import useTasks from'../composition/useTasks'
import AutoCompliteInput from '../components/UI/AutoComliteInput'
import { reactive, toRefs } from 'vue'
import usePrices from '../composition/usePrices'
export default {
    components:{
        Button,
        Modal,
        Input,
        AutoCompliteInput
    },
    props:{
        task:Object,
    },
    dispatch:[
        'task-comlite','task-returned','task-renew'
    ],
    setup(){
        const {changeTaskStatus,removeTask}=useTasks()
        const {allServicesList}=usePrices()

        const data= reactive({
            message:'',
            info:false,
            activeMoadalActive:false,
            activeMoadalAweiting:false,
            activeMoadalComplited:false,
            actions:[
                '',
            ],
            components:[]
        })

        const handleTime = (text)=>{
            let textToInt = Math.round(text)*1000
            let data = new Date(textToInt).toLocaleString("bg-BG")
            return data
        }

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
            if(text === 'returned'){
                return 'Върнат в сервиза'
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

        const closeAllModals = ()=>{
            data.activeMoadalComplited=false
            data.activeMoadalAweiting=false
            data.activeMoadalActive=
            console.log('yes be')
        }

        const clearMessage = ()=>{
            data.message = ''
        }

        const addAction = ()=>{
            data.actions.push('')
            console.log(data.actions)
        }
        const addComponent = ()=>{
            data.components.push('')
            console.log(data.components)
        }
        

        return {
            ...toRefs(data),
            handleStatusText,
            openCloseInfo,
            changeTaskStatus,
            openCloseModalActive,
            openCloseModalAweiting,
            openCloseModalComplited,
            closeAllModals,
            handleTime,
            removeTask,
            clearMessage,
            addAction,
            addComponent,
            allServicesList
        }
    }

}
</script>

<style>
a{
    text-decoration: none;
    cursor:pointer;
}
.task{
    position: relative;
    z-index: 1;
    width: 90%;
    margin: auto;
    text-align: center;
    margin-bottom: 0px;
    border: 1px solid lightgrey;
    border-radius: 1px;
    transition: all 0.3s ease-in-out;
    background: #f3f3f3;
    /* box-shadow: rgba(0, 0, 0, 0.5) 3px 6px 10px; */
}
/* .task:nth-child(odd){
    background-color: lightgrey;
} */
/* .task::hover{
    
} */
.task:hover{
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.5) 3px 5px 11px;
    background: #fff;
    transform: scale(1.01);

}
.desc{
    
    width: 64%;
    display: inline-block;
}
.actions{
    padding-top: 3px;
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
.fas{
    font-size: 1.5em;
}
.blue{
    color: #3FA7D6;
}
.gray{
    color:gray
}
.orange{
    color: orangered;
}
span{
    font-size: 0.7em;
    padding: 2px;
    border-radius: 6px;
    margin-left: 10px;
}
.date{
    background: #FAC05E;
}
.date-updated{
    background: #3FA7D6;
}
</style>