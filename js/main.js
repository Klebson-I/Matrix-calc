const inputOperation=document.querySelector('[data-select-operation]');
const determineMatrixSizeDiv=document.querySelector('[data-determine-matrix-div]');
const determineMartix1Size=document.querySelector('[data-determine-matrix-1-size]');
const determineMartix2Size=document.querySelector('[data-determine-matrix-2-size]');
const matrix1RowsInput=document.querySelector('[data-determine-matrix-1-rows]');
const matrix1ColsInput=document.querySelector('[data-determine-matrix-1-cols]');
const matrix2RowsInput=document.querySelector('[data-determine-matrix-2-rows]');
const matrix2ColsInput=document.querySelector('[data-determine-matrix-2-cols]');
const choseMatrixValuesDiv=document.querySelector('[data-chose-matrix-values]');
const sendButton1=document.querySelector('[data-send-button-1]');
const sendButton2=document.querySelector('[data-send-button-2]');

let OPERATION='';
let matrix1cols=0;
let matrix1rows=0;
let matrix2cols=0;
let matrix2rows=0;

inputOperation.addEventListener('change',()=>{
    showDetermineMatrixSizeDiv(inputOperation.value);
})
inputOperation.addEventListener('click',()=>{
    showDetermineMatrixSizeDiv(inputOperation.value);
})
sendButton1.addEventListener('click',()=>{
    checkOperation();
})
sendButton2.addEventListener('click',()=>{
    getValuesToEvaluate(OPERATION);
})






function checkOperation(){
    if(OPERATION==='determinant'&&
    matrix1ColsInput.value==matrix1RowsInput.value){
        let number=matrix1ColsInput.value;
        matrix1rows=matrix1RowsInput.value;
        matrix1cols=matrix1ColsInput.value;
        createMatrix(number,number,1);
    }
    else if(OPERATION==='determinant'){
        alert('To evaluate determinant, number of columns and rows in matrix must equals !');
    }

    if(OPERATION==='add'
    &&matrix1ColsInput.value===matrix2ColsInput.value
    &&matrix1RowsInput.value===matrix2RowsInput.value){
        let numRow=matrix1RowsInput.value;
        let numCol=matrix1ColsInput.value;
        matrix2rows=matrix1RowsInput.value;
        matrix2cols=matrix1ColsInput.value;
        matrix1rows=matrix1RowsInput.value;
        matrix1cols=matrix1ColsInput.value;
        createMatrix(numRow,numCol,1);
        createMatrix(numRow,numCol,2);
    }
    else if(OPERATION==='add'){
        alert("Matrixis should have the same size");
    }
    if(OPERATION==='subtract'
    &&matrix1ColsInput.value===matrix2ColsInput.value
    &&matrix1RowsInput.value===matrix2RowsInput.value){
        let numRow=matrix1RowsInput.value;
        let numCol=matrix1ColsInput.value;
        matrix2rows=matrix1RowsInput.value;
        matrix2cols=matrix1ColsInput.value;
        matrix1rows=matrix1RowsInput.value;
        matrix1cols=matrix1ColsInput.value;
        createMatrix(numRow,numCol,1);
        createMatrix(numRow,numCol,2);
    }
    else if(OPERATION==='subtract'){
        alert("Matrixis should have the same size");
    }
    if(OPERATION==='transposition'){
        let cols=matrix1ColsInput.value;
        let rows=matrix1RowsInput.value;
        matrix1rows=matrix1RowsInput.value;
        matrix1cols=matrix1ColsInput.value;
        createMatrix(rows,cols,1);
    }

    if(OPERATION==='multiply'
    &&matrix1ColsInput.value===matrix2RowsInput.value){
        matrix1rows=matrix1RowsInput.value;
        matrix1cols=matrix1ColsInput.value;
        matrix2rows=matrix2RowsInput.value;
        matrix2cols=matrix2ColsInput.value;

        createMatrix(matrix1rows,matrix1cols,1);
        createMatrix(matrix2rows,matrix2cols,2);
    }
    else if(OPERATION==='multiply'){
        alert('Matrix 1 cols should be equal to Matrix 2 rows');
    }

}

function createMatrix(rows,cols,matrixNum){

    choseMatrixValuesDiv.style.display='flex';
    sendButton2.style.display='block';
    sendButton1.setAttribute('disabled','');


    const matrixDiv=document.createElement('div');
    const nameSpan=document.createElement('span');
    const matrixTable=document.createElement('table');
    matrixTable.classList.add('matrixTable');
    matrixDiv.classList.add('inputMatrixDiv');
    nameSpan.textContent=`Matrix ${matrixNum} = `;
    for(let i=1;i<=rows;i++){
        const row=document.createElement('tr');
        row.id=`${i}row`;
        row.classList.add('matrix_row');

        for(let j=1;j<=cols;j++){
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
    choseMatrixValuesDiv.append(matrixDiv);
}

function showDetermineMatrixSizeDiv(value){

    OPERATION=value;
    determineMartix1Size.style.display='none';
    determineMartix2Size.style.display='none';
    determineMatrixSizeDiv.style.display='flex';
    sendButton1.style.display='block';

    switch(value){
        case 'add':
            determineMartix1Size.style.display='flex';
            determineMartix2Size.style.display='flex';
            break;
        case 'subtract':
            determineMartix1Size.style.display='flex';
            determineMartix2Size.style.display='flex';
            break;
        case 'determinant':
            determineMartix1Size.style.display='flex';
            break;
        case 'transposition':
            determineMartix1Size.style.display='flex';
            break;
        case 'multiply':
            determineMartix1Size.style.display='flex';
            determineMartix2Size.style.display='flex';
            break;
        default:break;
    }
}

function getValuesToEvaluate(operation){
    if(operation==='determinant')getValuesFrom1Matrix();
    if(operation==='add')getValuesFrom2Matrix();
    if(operation==='subtract')getValuesFrom2Matrix();
    if(operation==='transposition')getValuesFrom1Matrix();
    if(operation==='multiply')getValuesFrom2Matrix();
}

function getValuesFrom1Matrix(){
    const inputsArr=document.querySelectorAll('.matrix_input_1');
    let rowsNum=matrix1rows;
    let colsNum=matrix1cols;
    var matrixArr=[];
    for(let i=1;i<=rowsNum;i++){
        let miniArr=[];
        for(let j=1;j<=colsNum;j++){
            
            inputsArr.forEach((element)=>{
                if(element.id==`${i}-${j}`){
                    miniArr[j-1]=element.value;
                }
            })
        }
        matrixArr[i-1]=miniArr;
    }
    evaluate1Matrix(matrixArr);
}















function getValuesFrom2Matrix(){
    const inputsArr=document.querySelectorAll('.matrix_input_1');
    let rowsNum=matrix1rows;
    let colsNum=matrix1cols;
    let matrixArr1=[];
    for(let i=1;i<=rowsNum;i++){
        let miniArr=[];
        for(let j=1;j<=colsNum;j++){
            
            inputsArr.forEach((element)=>{
                if(element.id==`${i}-${j}`){
                    miniArr[j-1]=element.value;
                }
            })
        }
        matrixArr1[i-1]=miniArr;
    }
    const inputsArr2=document.querySelectorAll('.matrix_input_2');
    let rowsNum2=matrix2rows;
    let colsNum2=matrix2cols;
    let matrixArr2=[];
    for(let i=1;i<=rowsNum2;i++){
        let miniArr=[];
        for(let j=1;j<=colsNum2;j++){
            
            inputsArr2.forEach((element)=>{
                if(element.id==`${i}-${j}`){
                    miniArr[j-1]=element.value;
                }
            })
        }
        matrixArr2[i-1]=miniArr;
    }
    evaluate2Matrix(matrixArr1,matrixArr2);
}























function evaluate1Matrix(matrix){
    if(OPERATION==='determinant'&&matrix1rows==3) {
        let determinant = evaluateDeterminantOf3x3(matrix);
        console.log(determinant);
    }
    else if(OPERATION==='determinant'&&matrix1rows>=4){
        let determinant=evaluateDeterminantOf4x4(matrix);
        console.log(determinant);
    }
    if(OPERATION==='transposition'){
        let transpositionMatrix=evaluateTransposition(matrix);
        console.log(transpositionMatrix);
    }
}

function evaluate2Matrix(matrix1,matrix2){
    if(OPERATION==='add'){
        let sum=sumMatrices(matrix1,matrix2);
        console.log(sum);
    }
    if(OPERATION==='subtract'){
        let subtract=subtractMatrices(matrix1,matrix2);
        console.log(subtract);
    }
    if(OPERATION==='multiply'){
        console.log('zacznij');
        let multiply=multiplyMatrices(matrix1,matrix2);
        console.log(multiply);
    }
}


function sumMatrices(matrix1,matrix2){
    let finalMatrix=[];
    for(let i=0;i<matrix1rows;i++){
        let miniArr=[];
        for(let j=0;j<matrix1cols;j++){
            let x=parseFloat(matrix1[i][j])+parseFloat(matrix2[i][j]);
            miniArr.push(x);
        }
        finalMatrix.push(miniArr);
    }
    return finalMatrix;
}

function subtractMatrices(matrix1,matrix2){
    let finalMatrix=[];
    for(let i=0;i<matrix1rows;i++){
        let miniArr=[];
        for(let j=0;j<matrix1cols;j++){
            let x=parseFloat(matrix1[i][j])-parseFloat(matrix2[i][j]);
            miniArr.push(x);
        }
        finalMatrix.push(miniArr);
    }
    return finalMatrix;
}










































//działa tylko w jedną strone a mnożenie macierzy nie jest przemienne !!! trzeba poprawic
function multiplyMatrices(matrix11,matrix22){
    let matrix1=matrix11.map(elem=>elem.slice());
    let matrix2=matrix22.map(elem=>elem.slice());

    const multiplyIfColsOverRows=()=>{
        let whichMatrixCols = [];
        for (let i = 0; i < matrix2cols; i++) {
            let miniArr = [];
            for (let j = 0; j < matrix2rows; j++) {
                miniArr.push(matrix2[j][i]);
            }
            whichMatrixCols.push(miniArr);
        }
        let finalMatrix = [];
        console.log(matrix1);
        console.log(matrix2);
        console.log(whichMatrixCols);

        for (let i = 0; i < matrix1.length; i++) {
            let miniArr = [];
            for (let j = 0; j < whichMatrixCols.length; j++) {
                let miniMiniArr = [];
                for (let k = 0; k < matrix1[0].length; k++) {
                    let x = matrix1[i][k] * whichMatrixCols[j][k];
                    miniMiniArr.push(x);
                    console.log(x);
                }
                let z = miniMiniArr.reduce((a, b) => a + b);
                miniArr.push(z);
            }
            finalMatrix.push(miniArr);
        }

        console.log(finalMatrix)
    }

    const multiplyIfRowsOverCols=()=>{
        let whichMatrixCols = [];
        for (let i = 0; i < matrix1cols; i++) {
            let miniArr = [];
            for (let j = 0; j < matrix1rows; j++) {
                miniArr.push(matrix1[j][i]);
            }
            whichMatrixCols.push(miniArr);
        }
        let finalMatrix = [];
        for (let i = 0; i < whichMatrixCols.length; i++) {
            let miniArr = [];
            for (let j = 0; j < matrix2.length; j++) {
                let miniMiniArr = [];
                for (let k = 0; k < whichMatrixCols[0].length; k++) {
                    let x = matrix2[i][k] * whichMatrixCols[j][k];
                    miniMiniArr.push(x);
                    console.log(x);
                }
                let z = miniMiniArr.reduce((a, b) => a + b);
                miniArr.push(z);
            }
            finalMatrix.push(miniArr);
        }

        console.log(finalMatrix)
    }
    
    if(matrix1cols>matrix1rows){
        multiplyIfColsOverRows();
    }
    else{
        multiplyIfRowsOverCols();
    }

}











function evaluateTransposition(matrix){
    let finalMatrix=[];
    
    for(let i=0;i<matrix1cols;i++){
        let miniArr=[];
        for(let j=0;j<matrix1rows;j++){
            miniArr.push(matrix[j][i]);
        }
        finalMatrix.push(miniArr);
    }

    return finalMatrix;
}






















function evaluateDeterminantOf3x3(MATRIX){
    //przepisuje na 1 wymiarową
    let matrix=MATRIX.flat();
    let length=matrix.length;
    let rowNum=Math.sqrt(length);

    let leftBrakePoints=[];
    let rightBrakePoints=[];
    let downBrakePoints=[];
    let startLeftBrakePoints=0;
    let startRightBrakePoints=rowNum-1;
    let startDownBrakePoints=length-rowNum+1;


    for(let i=0;i<rowNum-1;i++){
        leftBrakePoints.push(startLeftBrakePoints);
        startLeftBrakePoints+=rowNum;
    }
    for(let i=0;i<rowNum-1;i++){
        rightBrakePoints.push(startRightBrakePoints);
        startRightBrakePoints+=rowNum;
    }
    for(let i=0;i<rowNum;i++){
        downBrakePoints.push(startDownBrakePoints);
        startDownBrakePoints++;
    }

    
    let sumPLus=0;
    let sumMinus=0;

    //liczymy na plus
    for(let i=0;i<rowNum;i++){

        let temporarySum=[];
        let ind=i;

        for(let j=0;j<rowNum;j++){
            temporarySum.push(parseInt(matrix[ind]));
            if(rightBrakePoints.includes(ind)){
                ind++;
            }
            else{
                ind+=rowNum+1;
            }
        }
        
        let x=0;
        x = temporarySum.reduce((a,b) => a*b);
        sumPLus+=x;
    }
    
    let colNum=[];
    let x=rowNum-1;
    for(let i=0;i<rowNum;i++){
        colNum.push(x);
        x+=rowNum;
    }
    
    for(let i of colNum){

        let temporarySum=[];
        let ind=i;

        for(let j=0;j<rowNum;j++){
            temporarySum.push(parseInt(matrix[ind]));
            if(downBrakePoints.includes(ind)){
                ind-=(rowNum*rowNum)-rowNum+1;
            }
            else{
                ind+=rowNum-1;
            }
        }
        
        let x=0;
        x = temporarySum.reduce((a,b) => a*b);
        sumMinus+=x;
    }
    let determinant=sumPLus-sumMinus;
    return determinant;
}





















//TABLIC 2 wymiarowych nie można kopiować przez SPREAD!!!!!
function evaluateDeterminantOf4x4(mat){

    const MATRIX=mat.map(element=>element.slice());
    const maxZeroArr=[];
    let zeroCounter=0;
    let determinant=0;

    //znalezienie wiersza z największą liczbą zer
    MATRIX.forEach((matrixArr)=>{
        matrixArr.forEach((element)=>{
            if(element==0){
                zeroCounter++;
            };
        });
        maxZeroArr.push(zeroCounter);
        zeroCounter=0;
    });

    // pierwysz wiersz z najwieksza liczba zer

    const choosenRow=maxZeroArr.indexOf(Math.max(...maxZeroArr));
    
    for(let i=0;i<MATRIX.length;i++){

        let miniMatrix=MATRIX.map(element=>element.slice());
        let determinantComponent=0;
        
        let algebraicComplement=parseFloat(parseFloat(MATRIX[choosenRow][i]))*((-1)**((choosenRow+1)+(i+1)));
        if(algebraicComplement===-0)algebraicComplement=0;

        
        for(let j=0;j<MATRIX.length;j++){
            miniMatrix[j].splice(i,1);
        }

        miniMatrix[choosenRow].splice(0,MATRIX.length);
        let finalMatrix=miniMatrix.filter(element=>element.length!=0);

        if(finalMatrix.length==3){
            if(algebraicComplement!=0){
                let final3x3MatrixDeterminant=evaluateDeterminantOf3x3(finalMatrix);
            determinantComponent=algebraicComplement*final3x3MatrixDeterminant;
            console.log(determinantComponent);
            determinant+=determinantComponent;
            }
            else{
                determinantComponent=0;
                determinant+=determinantComponent;
            }
        
        }
        else{
            if(algebraicComplement!=0){
                let finalMatrixDeterminant=evaluateDeterminantOf4x4(finalMatrix);
                determinantComponent=algebraicComplement*finalMatrixDeterminant;
                console.log(determinantComponent);
                determinant+=determinantComponent;
            }
            else{
                determinantComponent=0;
                determinant+=determinantComponent;
                }
            
        }
        
    }
    return determinant;
};























function evaluateDeterminantOf5x5(mat){

    const MATRIX=mat.map(element=>element.slice());
    const maxZeroArr=[];
    let zeroCounter=0;
    let determinant=0;

    //znalezienie wiersza z największą liczbą zer
    MATRIX.forEach((matrixArr)=>{
        matrixArr.forEach((element)=>{
            if(element==0){
                zeroCounter++;
            };
        });
        maxZeroArr.push(zeroCounter);
        zeroCounter=0;
    });

    // pierwysz wiersz z najwieksza liczba zer

    const choosenRow=maxZeroArr.indexOf(Math.max(...maxZeroArr));
    
    for(let i=0;i<MATRIX.length;i++){

        let miniMatrix=MATRIX.map(element=>element.slice());
        let determinantComponent=0;
        
        let algebraicComplement=parseFloat(parseFloat(MATRIX[choosenRow][i]))*((-1)**((choosenRow+1)+(i+1)));
        if(algebraicComplement===-0)algebraicComplement=0;

        
        for(let j=0;j<MATRIX.length;j++){
            miniMatrix[j].splice(i,1);
        }

        miniMatrix[choosenRow].splice(0,MATRIX.length);
        let finalMatrix=miniMatrix.filter(element=>element.length!=0);

        
        let finalMartixDeterminant=evaluateDeterminantOf4x4(finalMatrix);
        determinantComponent=algebraicComplement*finalMartixDeterminant;
        console.log(determinantComponent);
        determinant+=determinantComponent;
    }
    return determinant;
};