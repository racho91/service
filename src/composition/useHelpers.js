export  default function useHelpers(){

    //ROUND FUNCTION
    const round = (value, precision) => {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    const fillArrayWihtIndexPlusOne = (arr)=>{

        for(let i=0; i<arr.length ;i++){
            arr[i] = i+1;
        }
        return arr
    }

    const paginateArray = (arrayLength,pageSize)=>{
        if(pageSize<1){
            pageSize = 1
        }
        let pageCount = round(arrayLength/pageSize)
        let pagesArray= fillArrayWihtIndexPlusOne(new Array(pageCount))
        if (pagesArray.length<1){
            pagesArray=fillArrayWihtIndexPlusOne(new Array(1))
        }
        let itemsPerPageArray= fillArrayWihtIndexPlusOne(new Array(pageSize))

        console.log('al', arrayLength,'pc', pageCount,'pa',pagesArray,'ip',itemsPerPageArray)
        
        return {
            pageSize,
            pageCount,// broi stranici
            pagesArray, // masiv s stoinost ot 1 do n 
            itemsPerPageArray,//masiv s itemite za stranica ot 1 do n
        }

    }

    //check for true value in object
    const fieldValidation = (values)=>{
    let hasError = false
    let errors= []
    Object.entries(values).forEach(([key, value]) =>{
      
      console.log(`${key}: ${value}`)
        if (value){
          errors.push(true)
        }else{
          errors.push(false)
        }
      } 
    )
    errors.forEach(element => {
      if(element){
        hasError=true
        console.log('ima greshka')
      }
    })
    return !hasError

  }


    return{
        round,
        fillArrayWihtIndexPlusOne,
        paginateArray,
        fieldValidation
    }
}