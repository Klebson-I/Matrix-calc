
export class Calculator{
    sumMatrices(matrix1,matrix2){
        let finalMatrix=[];
        for(let i=0;i<matrix1.rows;i++){
            let miniArr=[];
            for(let j=0;j<matrix1.colums;j++){
                let x=parseFloat(matrix1.valuesMatrix[i][j])+parseFloat(matrix2.valuesMatrix[i][j]);
                miniArr.push(x);
            }
            finalMatrix.push(miniArr);
        }
        return finalMatrix;
    }
    subtractMatrices(matrix1,matrix2){
        let finalMatrix=[];
        for(let i=0;i<matrix1.rows;i++){
            let miniArr=[];
            for(let j=0;j<matrix1.colums;j++){
                let x=parseFloat(matrix1.valuesMatrix[i][j])-parseFloat(matrix2.valuesMatrix[i][j]);
                miniArr.push(x);
            }
            finalMatrix.push(miniArr);
        }
        return finalMatrix;
    }
    multiplyMatrices(matrix11,matrix22){
        let matrix1=matrix11.valuesMatrix.map(elem=>elem.slice());
        let matrix2=matrix22.valuesMatrix.map(elem=>elem.slice());
        let finalMatrix;
    
        const multiplyIfColsOverRows=()=>{
            let whichMatrixCols = [];
            for (let i = 0; i < matrix22.colums; i++) {
                let miniArr = [];
                for (let j = 0; j < matrix22.rows; j++) {
                    miniArr.push(matrix2[j][i]);
                }
                whichMatrixCols.push(miniArr);
            }
            finalMatrix = [];
    
            for (let i = 0; i < matrix1.length; i++) {
                let miniArr = [];
                for (let j = 0; j < whichMatrixCols.length; j++) {
                    let miniMiniArr = [];
                    for (let k = 0; k < matrix1[0].length; k++) {
                        let x = matrix1[i][k] * whichMatrixCols[j][k];
                        miniMiniArr.push(x);
                    }
                    let z = miniMiniArr.reduce((a, b) => a + b);
                    miniArr.push(z);
                }
                finalMatrix.push(miniArr);
            }
        }
        //naprawić !!!!
        const multiplyIfRowsOverCols=()=>{
            debugger;
            let whichMatrixCols = [];
            for (let i = 0; i < matrix22.colums; i++) {
                let miniArr = [];
                for (let j = 0; j < matrix22.rows; j++) {
                    miniArr.push(matrix2[j][i]);
                }
                whichMatrixCols.push(miniArr);
            }
            finalMatrix = [];
            for (let i = 0; i < whichMatrixCols.length; i++) {
                let miniArr = [];
                for (let j = 0; j < matrix1.length; j++) {
                    let miniMiniArr = [];
                    for (let k = 0; k < whichMatrixCols[0].length; k++) {
                        let x = matrix1[i][k] * whichMatrixCols[j][k];
                        miniMiniArr.push(x);
                    }
                    let z = miniMiniArr.reduce((a, b) => a + b);
                    miniArr.push(z);
                }
                finalMatrix.push(miniArr);
            }
            
        }
        
        if(matrix11.colums>=matrix11.rows){
            multiplyIfColsOverRows();
        }
        else{
            multiplyIfRowsOverCols();
        }
        return finalMatrix;
    }
    evaluateTransposition(matrix){
        let finalMatrix=[];
        
        for(let i=0;i<matrix.colums;i++){
            let miniArr=[];
            for(let j=0;j<matrix.rows;j++){
                miniArr.push(matrix.valuesMatrix[j][i]);
            }
            finalMatrix.push(miniArr);
        }
        return finalMatrix;
    }
    evaluateDeterminantOf3x3(MATRIX,key=0){
        
        let matrix;
        //przepisuje na 1 wymiarową
        if(key===0){
            matrix=MATRIX.valuesMatrix.flat();
        }
        else{
            matrix=MATRIX.flat();
        }
        
        let rowNum=3;
    
        let leftBrakePoints=[0,3];
        let rightBrakePoints=[2,5];
        let downBrakePoints=[6,7,8];
        
        
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
    evaluateDeterminantOfNxN(mat,key=0){
        let MATRIX;
        if(key===0){
            const values=Object.values(mat.valuesMatrix);
            MATRIX=values.map(element=>element.slice());
        }
        else{
            MATRIX=mat.map(element=>element.slice());
        }
        

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
                    let final3x3MatrixDeterminant=this.evaluateDeterminantOf3x3(finalMatrix,1);
                determinantComponent=algebraicComplement*final3x3MatrixDeterminant;
                determinant+=determinantComponent;
                }
                else{
                    determinantComponent=0;
                    determinant+=determinantComponent;
                }
            
            }
            else{
                if(algebraicComplement!=0){
                    let finalMatrixDeterminant=this.evaluateDeterminantOfNxN(finalMatrix,1);
                    determinantComponent=algebraicComplement*finalMatrixDeterminant;
                    determinant+=determinantComponent;
                }
                else{
                    determinantComponent=0;
                    determinant+=determinantComponent;
                    }
                
            }
            
        }
        return determinant;
    }
}
