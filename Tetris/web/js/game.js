/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var rectangles = [];
var rect = generateNewTet();
var flstyle = "#FF0000";
var colors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00"];   
var pause = false;
var position = new Array(120);
var pause = false;
var KEY     = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };


function start(){
    
    
    setInterval(drawCanvas, 500);
    document.addEventListener('keydown', keydown, false);
    
}


function drawCanvas(){
   
    var c=document.getElementById("can");
    var ctx=c.getContext("2d");
        ctx.fillStyle= flstyle;
    
    //check if the next square is occupied 
    if(!pause){
        if(isInOfBound(KEY.DOWN) && isEmpty()){


            move(KEY.DOWN);


        }else{
            var yPos = rect.y;
            var xPos = rect.x;
            var pos = (10 * (yPos/25)) + (xPos/25);
            position[pos] = true;
            //console.log('Position is occupied '+pos);

            //
            yPos = rect.y1;
            xPos = rect.x1;
            pos = (10 * (yPos/25)) + (xPos/25);
            position[pos] = true;
            //console.log('Position is occupied '+pos);

            //
            yPos = rect.y2;
            xPos = rect.x2;
            pos = (10 * (yPos/25)) + (xPos/25);
            position[pos] = true;
            //console.log('Position is occupied '+pos);


            //
            yPos = rect.y3;
            xPos = rect.x3;
            pos = (10 * (yPos/25)) + (xPos/25);
            position[pos] = true;
            //console.log('Position is occupied '+pos);


            findIfRowFilled();    
            //
            flstyle = colors[getRandom(4)];

            rect = generateNewTet();
        }
    }    
}

function getRandom(mux){
    num = Math.round(Math.random()*mux);
    return num;
}


function isEmpty(direction){
    var xC = 0;
    var yC = 0;
    switch(direction){
        case KEY.LEFT: 
            xC = -25;
            break;
            
        case KEY.RIGHT: 
            xC = 25;
            break;
            
        default:
            xC = 0;
            yC = 25;
            break;
    }
    var yPos = rect.y + yC;
    var xPos = rect.x + xC;
    
    var pos = (10 * (yPos/25)) + (xPos/25);
    
    yPos = rect.y1 + yC;
    xPos = rect.x1 + xC;
    
    var pos1 = (10 * (yPos/25)) + (xPos/25);
    
    yPos = rect.y2 + yC;
    xPos = rect.x2 + xC;
    
    var pos2 = (10 * (yPos/25)) + (xPos/25);
    
    
    yPos = rect.y3 + yC;
    xPos = rect.x3 + xC;
    
    var pos3 = (10 * (yPos/25)) + (xPos/25);

    if(position[pos] || position[pos1] || position[pos2] || position[pos3]){
        return false;
    }else{
        return true;
    }
}

function isInOfBound(direction){
    var res = false;
    switch(direction){
        case KEY.DOWN:
            if(rect.y < 274 && rect.y1 < 274 && rect.y2 < 274 && rect.y3 < 274)
                res = true;
            else
                res = false;
        break;
        case KEY.LEFT:
            if(rect.x > 24 && rect.x1 > 24 && rect.x2 > 24 && rect.x3 > 24)
                res = true;
            else
                res = false;
        break;
        case KEY.RIGHT:
            if(rect.x < 224 && rect.x1 < 224 && rect.x2 < 224 && rect.x3 < 224)
                res = true;
            else
                res = false;
        break;
        }   
        
        return res;
}

function generateNewTet(){
    //I 
    x = Math.round(Math.random()*5) *25;
    var I = {x:x, y:25, h:25, w: 25, x1:(x+25), y1:25, h1:25, w1: 25, 
            x2:(x+50), y2:25, h2:25, w2: 25, x3:(x+75), y3:25, h3:25, w3: 25};
            
    //L        
    x = Math.round(Math.random()*8) *25;
    var L = {x:x, y:25, h:25, w: 25, x1:(x), y1:50, h1:25, w1: 25, 
            x2:(x), y2:75, h2:25, w2: 25, x3:(x+25), y3:75, h3:25, w3: 25};

    //T
    x = Math.round(Math.random()*7) *25;
    var T = {x:x, y:25, h:25, w: 25, x1:(x+25), y1:25, h1:25, w1: 25, 
            x2:(x+50), y2:25, h2:25, w2: 25, x3:(x+25), y3:50, h3:25, w3: 25};
    //box
    x = Math.round(Math.random()*5) *25;
    var B = {x:x, y:25, h:25, w: 25, x1:(x+25), y1:25, h1:25, w1: 25, 
            x2:x, y2:50, h2:25, w2: 25, x3:(x+25), y3:50, h3:25, w3: 25};
            

    var TETS = [I, L, T, B];
    num = Math.round((Math.random()*3));
    //console.log("0:I, 1:L, 2:T, 3:B");
    //console.log("Next tet is "+num);
    return TETS[num];
    
}


function keydown(ev) {
    
    switch(ev.keyCode) {
      case KEY.LEFT: move(KEY.LEFT); break;
      case KEY.RIGHT: move(KEY.RIGHT);break;
      case KEY.UP: alert("up");break;
      case KEY.DOWN: move(KEY.DOWN);break;
      case KEY.SPACE: move(KEY.SPACE);break;
      case KEY.ESC: move(KEY.SPACE);break;

    }
    
}


function move(direction){
    console.log('moving things');
    
    
    var yC = 0;
    var xC = 0;
    switch(direction){
        case KEY.LEFT: 
            if(isEmpty(KEY.LEFT) && isInOfBound(KEY.LEFT)){
                console.log('moving left');
                xC = -25;
                yC = 0;
            }else{
                console.log('No left');
            }
            break;

        case KEY.RIGHT: 

            if(isEmpty(KEY.RIGHT) && isInOfBound(KEY.RIGHT)){
                console.log('moving right');
                xC = 25;
                yC = 0;
            }else{
                console.log('No right');
            }
            break;

        case KEY.SPACE: 
            console.log("PAUSE! press ESC or SPACE bar to start");
            pause = !pause;
            break;

        case KEY.DOWN:
            if(isEmpty(KEY.DOWN) && isInOfBound(KEY.DOWN)){
                console.log('moving down');
                yC = 25;
                xC = 0;
            }else{
                console.log('No down');
            }
            break;

    }

    if(!pause){

        var c=document.getElementById("can");
        var ctx=c.getContext("2d");
            ctx.fillStyle= flstyle;

            ctx.clearRect(rect.x, rect.y, 
                    rect.h, rect.w);        

            ctx.clearRect(rect.x1, rect.y1, 
                    rect.h1, rect.w1);        

            ctx.clearRect(rect.x2, rect.y2, 
                    rect.h2, rect.w2);        

            ctx.clearRect(rect.x3, rect.y3, 
                    rect.h3, rect.w3);        

        rect.y  = rect.y + yC;
        rect.x  = rect.x + xC;

            ctx.fillRect(rect.x, rect.y, 
                    rect.h, rect.w);        
                    ctx.stroke();
        
        rect.y1  = rect.y1 + yC;
        rect.x1  = rect.x1 + xC;
            ctx.fillRect(rect.x1, rect.y1, 
                    rect.h1, rect.w1);
                    ctx.stroke();

        rect.y2  = rect.y2 + yC;
        rect.x2  = rect.x2 + xC;

            ctx.fillRect(rect.x2, rect.y2, 
                    rect.h2, rect.w2);
                    ctx.stroke();

        rect.y3 = rect.y3 + yC;
        rect.x3  = rect.x3+ xC;

            ctx.rect(rect.x3, rect.y3, 
                    rect.h3, rect.w3);
                    ctx.stroke();
                    ctx.fil();

    }    
}


function findIfRowFilled(){
    
}