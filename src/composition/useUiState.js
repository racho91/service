import { reactive, computed } from 'vue'

const state= reactive({
    isLoading:false,
    isMenuOpen:false
})

export default function useUiState(){
    const loadingStart =()=>{
        state.isLoading = true
    }
    const loadingEnd =()=>{
        state.isLoading = false
    }
    const toggleMenu = ()=>{
        state.isMenuOpen = !state.isMenuOpen
    }
    return {
        isLoading: computed(()=>state.isLoading),
        loadingStart,
        loadingEnd,
        isMenuOpen: computed(()=>state.isMenuOpen),
        toggleMenu
    }
}