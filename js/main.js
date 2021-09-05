import { Calculator } from './calculator.js';
import { Matrix } from './matrix.js';
import {uiSelectors} from './uiSelectors.js';
import {Result} from './result.js';
import { Info } from './info.js';
class App{
    constructor(){
        this.operation=null;
        this.matrix1=null;
        this.matrix2=null;
        this.calculator=new Calculator();
        this.info=new Info();
        this.addListeners();
    }
    addListeners(){
        uiSelectors.inputOperation.addEventListener('change',()=>{
            this.showDetermineMatrixSizeDiv(uiSelectors.inputOperation.value);
        })
        uiSelectors.inputOperation.addEventListener('click',()=>{
            this.showDetermineMatrixSizeDiv(uiSelectors.inputOperation.value);
        })
        uiSelectors.sendButton1.addEventListener('click',()=>{
            this.checkOperation();
        })
        uiSelectors.sendButton2.addEventListener('click',()=>{
            this.getValuesToEvaluate();
        })
        uiSelectors.resetButton.addEventListener('click',(e)=>{
            this.resetSettings(e);
        })
    } 
    resetSettings(e){
        uiSelectors.sendButton2.style.display='none';
        uiSelectors.sendButton1.style.display='none';
        e.target.style.display='none';
        uiSelectors.sendButton1.removeAttribute('disabled');
        uiSelectors.determineMatrixSizeDiv.style.display='none';
        uiSelectors.choseMatrixValuesDiv.style.display='none';

        uiSelectors.determineMatrixSizeDiv.querySelectorAll('input')
        .forEach(element=>element.value="");

        while(uiSelectors.choseMatrixValuesDiv.firstChild){
            uiSelectors.choseMatrixValuesDiv.lastChild.remove();
        }
        while(uiSelectors.resultDiv.firstChild){
            uiSelectors.resultDiv.lastChild.remove();
        }
    }
    showDetermineMatrixSizeDiv(value) {
         
        this.operation=value;
        uiSelectors.determineMartix1Size.style.display = 'none';
        uiSelectors.determineMartix2Size.style.display = 'none';
        uiSelectors.determineMatrixSizeDiv.style.display = 'flex';
        uiSelectors.sendButton1.style.display = 'block';
        

        switch (value) {
            case 'add':
                uiSelectors.determineMartix1Size.style.display = 'flex';
                uiSelectors.determineMartix2Size.style.display = 'flex';
                break;
            case 'subtract':
                uiSelectors.determineMartix1Size.style.display = 'flex';
                uiSelectors.determineMartix2Size.style.display = 'flex';
                break;
            case 'determinant':
                uiSelectors.determineMartix1Size.style.display = 'flex';
                break;
            case 'transposition':
                uiSelectors.determineMartix1Size.style.display = 'flex';
                break;
            case 'multiply':
                uiSelectors.determineMartix1Size.style.display = 'flex';
                uiSelectors.determineMartix2Size.style.display = 'flex';
                break;
            default: break;
        }

    }
    //maksymalne macierze do 15?
    checkOperation(){
        if(isNaN(Number(uiSelectors.matrix1RowsInput.value))===false&&
        isNaN(Number(uiSelectors.matrix1ColsInput.value))===false&&
        isNaN(Number(uiSelectors.matrix2RowsInput.value))===false&&
        isNaN(Number(uiSelectors.matrix2ColsInput.value))===false&&
        Number(uiSelectors.matrix1RowsInput.value)>0&&
        Number(uiSelectors.matrix2RowsInput.value)>0&&
        Number(uiSelectors.matrix1ColsInput.value)>0&&
        Number(uiSelectors.matrix2ColsInput.value)>0
       ){
        if( Number(uiSelectors.matrix1RowsInput.value)>15||
        Number(uiSelectors.matrix2RowsInput.value)>15||
        Number(uiSelectors.matrix1ColsInput.value)>15||
        Number(uiSelectors.matrix2ColsInput.value)>15){
            this.info.showInfo('max size of matrix is 15x15');
            return;
        }
           
        
            if(this.operation==='add'
            &&uiSelectors.matrix1ColsInput.value===uiSelectors.matrix2ColsInput.value
            &&uiSelectors.matrix1RowsInput.value===uiSelectors.matrix2RowsInput.value){
                const numRow=uiSelectors.matrix1RowsInput.value;
                const numCol=uiSelectors.matrix1ColsInput.value;
                this.matrix1=new Matrix(numRow,numCol);
                this.matrix2=new Matrix(numRow,numCol);
                this.matrix1.createMatrix(1);
                this.matrix2.createMatrix(2);
            }
            else if(this.operation==='add'){
                this.info.showInfo("Matrixis should have the same size");
            }

            if(this.operation==='subtract'
            &&uiSelectors.matrix1ColsInput.value===uiSelectors.matrix2ColsInput.value
            &&uiSelectors.matrix1RowsInput.value===uiSelectors.matrix2RowsInput.value){
                const numRow=uiSelectors.matrix1RowsInput.value;
                const numCol=uiSelectors.matrix1ColsInput.value;
                this.matrix1=new Matrix(numRow,numCol);
                this.matrix2=new Matrix(numRow,numCol);
                this.matrix1.createMatrix(1);
                this.matrix2.createMatrix(2);
            }
            else if(this.operation==='subtract'){
                this.info.showInfo("Matrixis should have the same size");
            }
            if(this.operation==='multiply'
            &&uiSelectors.matrix1ColsInput.value===uiSelectors.matrix2RowsInput.value){
                const matrix1rows=uiSelectors.matrix1RowsInput.value;
                const matrix1cols=uiSelectors.matrix1ColsInput.value;
                const matrix2rows=uiSelectors.matrix2RowsInput.value;
                const matrix2cols=uiSelectors.matrix2ColsInput.value;
                this.matrix1=new Matrix(matrix1rows,matrix1cols);
                this.matrix2=new Matrix(matrix2rows,matrix2cols);
                this.matrix1.createMatrix(1);
                this.matrix2.createMatrix(2);
            }
            else if(this.operation==='multiply'){
                this.info.showInfo('Matrix 1 cols should be equal to Matrix 2 rows');
            }
        }
        else if((this.operation==='determinant'||this.operation==='transposition')&&
        isNaN(Number(uiSelectors.matrix1RowsInput.value))===false&&
        isNaN(Number(uiSelectors.matrix1ColsInput.value))===false&&
        Number(uiSelectors.matrix1RowsInput.value)>0&&
        Number(uiSelectors.matrix1ColsInput.value)>0){

            if( Number(uiSelectors.matrix1RowsInput.value)>15||
            Number(uiSelectors.matrix1ColsInput.value)>15){
            this.info.showInfo('max size of matrix is 15x15');
            return;
        }

            if(this.operation==='determinant'&&
            uiSelectors.matrix1ColsInput.value===uiSelectors.matrix1RowsInput.value){
                const number=uiSelectors.matrix1ColsInput.value;
                this.matrix1=new Matrix(number,number);
                this.matrix1.createMatrix(1);
            }
            else if(this.operation==='determinant'){
                this.info.showInfo('To evaluate determinant, number of columns and rows in matrix must equals !');
            }

            if(this.operation==='transposition'){
                const numCol=uiSelectors.matrix1ColsInput.value;
                const numRow=uiSelectors.matrix1RowsInput.value;
                this.matrix1=new Matrix(numRow,numCol);
                this.matrix1.createMatrix(1);
            }
        }
        else{
            this.info.showInfo('Inputs must be a numbers, and bigger than 0');
        }
    }
    getValuesToEvaluate(){
        this.removeMatrixValues();
        if(this.operation==='determinant'
        ||this.operation==='transposition'){
            this.matrix1.setMatrix();
            this.evaluate1Matrix();
        }
        if(this.operation==='add'||
        this.operation==='subtract'||
        this.operation==='multiply'){
            this.matrix1.setMatrix();
            this.matrix2.setMatrix();
            this.evaluate2Matrix();
        }
    }
    evaluate1Matrix(){
        if(this.operation==='determinant'&&this.matrix1.rows==3) {
            let determinant=null;
            determinant = this.calculator.evaluateDeterminantOf3x3(this.matrix1);
            
            this.createResultsDiv(determinant);
        }
        else if(this.operation==='determinant'&&this.matrix1.rows>=4){
            let determinant=null;
            determinant=this.calculator.evaluateDeterminantOfNxN(this.matrix1);
            this.createResultsDiv(determinant);
        }
        if(this.operation==='transposition'){
            let transpositionMatrix=null;
            transpositionMatrix=this.calculator.evaluateTransposition(this.matrix1);
            this.createResultsDiv(transpositionMatrix);
        }
    }
    evaluate2Matrix(){
        if(this.operation==='add'){
            let sum=null;
            sum=this.calculator.sumMatrices(this.matrix1,this.matrix2);
            
            this.createResultsDiv(sum);
        }
        if(this.operation==='subtract'){
            let subtract=null;
            subtract=this.calculator.subtractMatrices(this.matrix1,this.matrix2);
            this.createResultsDiv(subtract);
        }
        if(this.operation==='multiply'){
            let multiply=null;
            multiply=this.calculator.multiplyMatrices(this.matrix1,this.matrix2);
            this.createResultsDiv(multiply);
        }
    }
    removeMatrixValues(){
        try{
            this.matrix1.valuesMatrix=[];
            this.matrix2.valuesMatrix=[];
        }
        catch(e){
            console.log('Jedna z macierzy nie istnieje');
        }
    }
    createResultsDiv(matrix){
        //while działa tyle że niżej matrix powiększa się 2krotnie 
        console.log(matrix);
        while(uiSelectors.resultDiv.firstChild){
            uiSelectors.resultDiv.lastChild.remove();
        }
        
        if(typeof matrix==='number'){
            const result=new Result(matrix);
        }
        else{
            const width=matrix[0].length;
            const height=matrix.length;
            const result=new Result(matrix,width,height);
        }
    }
}

export const app=new App();




















































