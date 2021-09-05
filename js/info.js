import { uiSelectors } from "./uiSelectors.js";


export class Info{
    constructor(){
        this.addListeners();
        this.isFading=false;
    }
    addListeners(){
        uiSelectors.closeInfoButton.addEventListener('click',()=>this.closeInfoDiv());
    }
    closeInfoDiv(){
        uiSelectors.infoDiv.style.display='none';
        clearInterval(this.interval);
    }
    showInfo(info){
        if(this.isFading===false){
            uiSelectors.infoSpan.textContent=info;
            uiSelectors.infoDiv.style.display='flex';
            uiSelectors.infoDiv.style.opacity='0.9';
        }
    }
}