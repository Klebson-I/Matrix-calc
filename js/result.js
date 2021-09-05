import { uiSelectors } from "./uiSelectors.js";


export class Result{
    constructor(result,width=1,height=1){
        this.width=width;
        this.height=height;
        this.result=result;
        this.createResult();
    }
    createResult(){

        const span=document.createElement('span');
        const result=document.createElement('div');

        const size=30;


        result.style.height=`${this.height*size} px`;
        result.style.width=`${this.width*size} px`;
        result.classList.add('resultMatrix');

        span.textContent='Result = ';

        if(this.height!=1||this.width!=1){
            for(const row of this.result){
                
                if(typeof row==='object'){
                    const evaluateWidth=()=>{
                        const size=20;
                        const arr=Object.values(this.result).flat();
                        const nums=arr.map(elem=>String(elem).length);
                        const max=Math.max(...nums);
                        return max*size;
                    }
                    const spanWidth=evaluateWidth();

                    const arr=Object.values(row);
                    const miniArr=document.createElement('span');
                    miniArr.classList.add('resultsMiniArr');
                    miniArr.style.width=`${this.width*spanWidth}px`;

                    for(const elem of arr){
                        const span1=document.createElement('span');
                        span1.classList.add('oneNum');
                        span1.textContent=elem;
                        miniArr.append(span1);
                    }
                    result.append(miniArr);
                }
                
            }
        }
        else{
            result.textContent=this.result;
        }

        uiSelectors.resultDiv.append(span);
        uiSelectors.resultDiv.append(result);

        this.scrollDown();
    }

    scrollDown(){
        window.scrollTo({
            top:1110,
            left:0,
            behavior:"smooth"
        })
    }
}