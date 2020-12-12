import html2pdf from 'html2pdf.js'

export default function useClients(){
    const getPDF =(element,name)=> {
        return new Promise((resolve)=>{
            let opt = {
            margin:       8,
            filename:     name +'.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 8 },
            jsPDF:        { unit: 'mm', format: 'A4', orientation: 'portrait' }
            };
            html2pdf().from(element).set(opt).save()
            resolve()
        })
        
    }
    return {
        getPDF
    }
}

