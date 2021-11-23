document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let bombAmount = 20;
    let squares = [];

    //creating board
    function createBoard(){
        //get shuffled array with random bombs
        //creating array that will store bomb
        const bombsArray = Array(bombAmount).fill('bomb');
        //creating empty array that has no bomb
        const emptyArray = Array(width*width-bombAmount).fill('valid');
        //concatenating empty and bomb array
        const gameArray = emptyArray.concat(bombsArray);
        //shuffling gameArray to get random position for bomb and valid array element
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

        //dividing grid into width*width grid element
        for(let i=0;i<width*width;i++){
            const square = document.createElement('div');
            square.setAttribute('id',i);
            //adding class name in shuffledArray to corresponding new made grid element
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);

            //normal click
            square.addEventListener('click',function(e){
                click(square);
            })
            
        }

        //add number
        for(let i=0;i<squares.length;i++){
            let total = 0;
            const isLeftEdge = (i%width===0);
            const isRightEdge = (i%width === width-1);

            if(squares[i].classList.contains('valid')){
                if(i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')){
                    total++;
                }
                if(i>9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')){
                    total++;
                }
                if(i>10 && squares[i-width].classList.contains('bomb')){
                    total++;
                }
                if(i>11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')){
                    total++; 
                }
                if(i<98 && !isRightEdge && squares[i+1].classList.contains('bomb')){
                    total++;
                }
                if(i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')){
                    total++;
                }
                if(i<88 && !isRightEdge && squares[i+1+width].classList.contains('bombs')){
                    total++;
                }
                if(i<89 && squares[i+width].classList.contains('bomb')){
                    total++;
                }
            }
            squares[i].setAttribute('data',total);
            console.log(squares[i]);
            
        }








    }

    createBoard();

    // click on square action
    function click(square){
        if(square.classList.contains('bomb')){
            console.log('Game Over');
        }else{
            let total = square.getAttribute('data');
            if(total!=0){
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }

            square.classList.add('checked');
        }
    }
})

