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
    checkIfDetermined();
})
sendButton2.addEventListener('click',()=>{
    getValuesToEvaluate(OPERATION);
})


function checkIfDetermined(){
    if(OPERATION==='determinant'&&
    matrix1ColsInput.value==matrix1RowsInput.value){
        let number=matrix1ColsInput.value;
        matrix1rows=matrix1RowsInput.value;
        matrix1cols=matrix1ColsInput.value;
        createMatrix(number,number,1);
    }
    else{
        alert('To evaluate determinant, number of columns and rows in matrix must equals !');
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
            input.classList.add('matrix_input');
            col.id=`${j}col`;
            input.id=`${i}-${j}`;
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
}

function getValuesFrom1Matrix(){
    const inputsArr=document.querySelectorAll('.matrix_input');
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

let determinant;

function evaluate1Matrix(matrix){
    if(OPERATION==='determinant'&&matrix1rows==3) {
        determinant = evaluateDeterminantOf3x3(matrix);
        console.log(determinant);
    }
    else if(OPERATION==='determinant'&&matrix1rows==4){
        determinant=evaluateDeterminantOf4x4(matrix);
    }
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
        maxZero=Arr.push(zeroCounter);
        zeroCounter=0;
    });

    // pierwysz wiersz z najwieksza liczba zer

    const choosenRow=maxZeroArr.indexOf(Math.max(...maxZeroArr));
    
    for(let i=0;i<4;i++){

        let miniMatrix=MATRIX.map(element=>element.slice());
        let determinantComponent=0;
        
        let algebraicComplement=parseFloat(parseFloat(MATRIX[choosenRow][i]))*((-1)**((choosenRow+1)+(i+1)));
        if(algebraicComplement===-0)algebraicComplement=0;

        
        for(let j=0;j<MATRIX.length;j++){
            miniMatrix[j].splice(i,1);
        }

        miniMatrix[choosenRow].splice(0,MATRIX.length);
        let finalMatrix=miniMatrix.filter(element=>element.length!=0);
        let final3x3MatrixDeterminant=evaluateDeterminantOf3x3(finalMatrix);
        determinantComponent=algebraicComplement*final3x3MatrixDeterminant;
        console.log(determinantComponent);
        determinant+=determinantComponent;
    }
    console.log(determinant);
};
