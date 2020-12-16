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


    return{
        round,
        fillArrayWihtIndexPlusOne,
        paginateArray
    }
}