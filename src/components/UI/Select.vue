<template>
    <label for="name">
        {{label}}
        <select name="name" id="name" >
            <option v-for="(option,index) in options" :key="index" value="option">Volvo</option>
        </select>
    </label>
    
</template>

<script>
export default {
    name: 'Selct',
    props:{
        options:Array,
        label:String,
        data:String,
        name:{
            type:String,
            default:''
        },
    }

}
</script>

<style>

</style>