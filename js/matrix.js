import { uiSelectors } from "./uiSelectors.js";
import {app} from './main.js';

export class Matrix{
    constructor(rows,colums){
        this.colums=colums;
        this.rows=rows;
        this.valuesMatrix=[];
        this.matrixNumber=null;
    }
    createMatrix(matrixNum){
        this.matrixNumber=matrixNum;
        uiSelectors.choseMatrixValuesDiv.style.display='flex';
        uiSelectors.sendButton2.style.display='block';
        uiSelectors.resetButton.style.display='block';
        uiSelectors.sendButton1.setAttribute('disabled','');
    
    
        const matrixDiv=document.createElement('div');
        const nameSpan=document.createElement('span');
        const matrixTable=document.createElement('table');

        matrixTable.classList.add('matrixTable');
        matrixDiv.classList.add('inputMatrixDiv');
        nameSpan.textContent=`Matrix ${matrixNum} = `;
        for(let i=1;i<=this.rows;i++){
            const row=document.createElement('tr');
            row.id=`${i}row`;
            row.classList.add('matrix_row');
    
            for(let j=1;j<=this.colums;j++){
                const col=document.createElement('td');
                const input=document.createElement('input');
                col.classList.add('matrix_col');
                input.classList.add(`matrix_input_${matrixNum}`);
                input.classList.add(`matrix_input`);
                col.id=`${j}col`;
                input.id=`${i}-${j}`;
                input.placeholder="0";
                col.append(input);
                row.append(col);
            }
            matrixTable.append(row);
        }
    
        matrixDiv.append(nameSpan);
        matrixDiv.append(matrixTable);
        uiSelectors.choseMatrixValuesDiv.append(matrixDiv);
    }

    setMatrix(){
        const inputsArr = document.querySelectorAll(`.matrix_input_${this.matrixNumber}`);
        for (let i = 1; i <= this.rows; i++) {
            let miniArr = [];
            for (let j = 1; j <= this.colums; j++) {

                inputsArr.forEach((element) => {
                    if (element.id == `${i}-${j}`) {
                        if(Number.isNaN(Number(element.value))||element.value.length===0){
                            app.removeMatrixValues();
                            throw new Error('not all of cells are numbers');
                        }
                        else{
                            miniArr[j - 1] = element.value;
                        }
                    }
                })
            }
            this.valuesMatrix.push(miniArr);
        }
    }
}