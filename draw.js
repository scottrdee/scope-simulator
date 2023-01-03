/* 
    Welcome to the core code for [Scope Simulator, Ver 1.0].

    1. Define Working Area (ln. 30)
        canvas, context
    2. Define Basic Dimensions and Properties (ln. 35)
        canvas size, screen radius, gamestate, screen locations, magnification, background size
    3. Blur and Adjustment Change (ln. 93)
        blur and adjustment buttons, value change functions (ln. 78)
    4. Drawing the Viewport (ln. 142)
        functions defined: draw black rect, add titles for button regions, clear circular space, draw reticle
    5. Button Arrays - Target, Zoom, Holdover (ln. 207)
        arrays: target positions, target & zoom button locations
    6. Button Constructors (ln. 446)
        constructors: all buttons except focus and adjustment value
    7. Shot Array (ln. 572)
        mouse position listener, button listener, shot counter
    8. Drawing Buttons and Counter - Functions (ln. 614)
        functions: utilize arrays and constructors to draw each group of buttons, draw adjustment counter
    9. Movement and Adjustment Steps (ln. 665)
        background position, intended target, adjustment steps, function to change steps - for smooth movement
    10. String Conversion - Adjustments (ln. 696)
        functions: convert to and from string, for use at end of animate function
    11. Draw Buttons and Crosshairs (ln. 710)
        call button and crosshair draw functions
    12. Animation (ln. 720)
        animation function: draw overlay, draw adjustment counter, move smoothly
*/

/* ----- DEFINE WORKING AREA ----- */

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); 

/* ----- DEFINE BASIC DIMENSIONS AND PROPERTIES ----- */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Sight Radius & Screen Size
let radiusScreen = 0; 
if (canvas.height <= canvas.width) {
    radiusScreen = canvas.height/2;
} else {
    radiusScreen = canvas.width/2;
}

// General Factors
let gameState = {
    magnification: 4,
    adjustmentFactor: 4,
    focus: "all"
}; // Will move more variables here eventually

// Scope Reticle Positions - 12,3,6,9 o'clock. For later positioning of other elements
const locations = {
    centerX: canvas.width/2,
    centerY: canvas.height/2,
    top: {
        x: canvas.width/2,
        y: canvas.height/2 - radiusScreen
    },
    bottom: {
        x: canvas.width/2,
        y: canvas.height/2 + radiusScreen
    },
    left: {
        x: canvas.width/2 - radiusScreen,
        y: canvas.height/2
    },
    right: {
        x: canvas.width/2 + radiusScreen,
        y: canvas.height/2
    }
}; 

// Magnification and Background Size (plus 'new' for smooth movement in the animate function)
let magnification = 4;

const backgroundSize = {
    x: radiusScreen * magnification / 0.19,
    y: radiusScreen * magnification / 0.2375 
};

const backgroundSizeNew = {
    x: backgroundSize.x,
    y: backgroundSize.y
}; 

let adjustmentValue = (backgroundSize.x * 1/12000); // the amount moved per 'click', based on canvas width
    // 1px is 1/4" at 100 yards

/* ----- BLUR AND ADJUSTMENT CHANGE ----- */

let adjustValueButton = document.createElement('button');
adjustValueButton.style.position = 'absolute';
adjustValueButton.style.zIndex = '3';
adjustValueButton.style.width = "80px";
adjustValueButton.style.height = "50px";
adjustValueButton.style.top = (window.innerHeight / 2 - 25) + "px";
adjustValueButton.style.right = "50px";
adjustValueButton.innerHTML = "1/4 MOA";

document.body.appendChild(adjustValueButton);

adjustValueButton.onclick = function() {
    if (gameState.adjustmentFactor === 4) {
        adjustValueButton.innerHTML = "1 MOA";
        adjustmentValue = (backgroundSize.x * 1/3000);
        gameState.adjustmentFactor = 1;
    } else if (gameState.adjustmentFactor === 1) {
        adjustValueButton.innerHTML = "1/4 MOA";
        adjustmentValue = (backgroundSize.x * 1/12000);
        gameState.adjustmentFactor = 4;
    }
    console.log(gameState.adjustmentFactor)
}

let blurButtonOne = document.createElement('button');
blurButtonOne.style.position = 'absolute';
blurButtonOne.style.zIndex = '3';
blurButtonOne.style.width = "90px";
blurButtonOne.style.height = "50px";
blurButtonOne.style.top = (window.innerHeight / 2 - 25) + "px";
blurButtonOne.style.left = "50px";
blurButtonOne.innerHTML = "All";

document.body.appendChild(blurButtonOne);

blurButtonOne.onclick = function() {
    if (gameState.focus === "all") {
        gameState.focus = "target";
        reticle.classList.add('blurry');
        blurButtonOne.innerHTML = "Target";
    } else if (gameState.focus === "target") {
        gameState.focus = "all";
        reticle.classList.remove('blurry');
        blurButtonOne.innerHTML = "All";
    }
}

/* ----- DRAWING THE VIEWPORT ----- */

// step 1 - draw and fill a black rectangle across the screen
function drawOverlay() {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height); 

    // Add names to the button regions
    c.font = "20px Arial";
    c.fillStyle = 'white';
    c.textAlign = 'center';

    c.fillText('Holdovers', canvas.width - 135, 25);
    c.fillText('Targets', 100, 25);
    c.fillText(`Magnification: ${gameState.magnification}X`, 85, canvas.height - 225);
    c.fillText('Adjustments', canvas.width - 135, canvas.height - 190);

    c.font = "15px Arial";
    c.fillStyle = 'white';
    c.textAlign = 'left';

    c.fillText('100', 20, 75);
    c.fillText('200', 20, 125);
    c.fillText('300', 20, 175);
    c.fillText('600', 20, 225);

    c.font = "12px Arial";
    c.fillStyle = 'white';
    c.textAlign = 'center';

    c.fillText('"Space Bar" to place shot', canvas.width - 135, canvas.height - 175);
    c.fillText('"X" to clear all shots', canvas.width - 135, canvas.height - 160);

    c.font = "15px Arial";
    c.fillStyle = 'white';
    c.textAlign = 'center';

    c.fillText('Adjustment amt.', canvas.width - 90, canvas.height / 2 - 40);
    c.fillText('Focus', 90, canvas.height / 2 - 40);
};

// Step 2 - define a clear viewing space (circle)
function clearSightPicture () {
    c.save();
    c.globalCompositeOperation = 'destination-out';
    c.beginPath();
    c.arc(locations.centerX, locations.centerY, radiusScreen, 0, Math.PI * 2, true);
    c.fill();
    c.restore();
    //c.lineWidth = 3;
    //c.strokeStyle = 'hsla(0, 0%, 20%, 0.8)';
    //c.stroke();
};

// Place crosshairs on screen
function drawCrosshairs() {
    let reticle = document.getElementById('reticle');

    reticle.style.width = radiusScreen*2 + "px";
    reticle.style.height = radiusScreen*2 + "px";
    reticle.style.top = locations.top.y + "px";
    reticle.style.left = locations.left.x + "px";
}; 


/* ----- BUTTON ARAYS - TARGET, ZOOM, HOLDOVER ----- */

// Target positions on the BG
const powerFactors = [{
    name: "100 deer",
    x:0.672,
    y:0.7375
}, {
    name: "200 deer",
    x:0.7723,
    y:0.7262
}, {
    name: "300 deer",
    x: 0.646,
    y: 0.7107
}, {
    name: "600 deer",
    x: 0.7642,
    y: 0.6997
}, {
    name: "100 man",
    x:0.3043,
    y:0.7824
}, {
    name: "200 man",
    x:0.2607,
    y:0.7566
}, {
    name: "300 man",
    x: 0.3715,
    y: 0.755
}, {
    name: "600 man",
    x: 0.3443,
    y: 0.7275
}, {
    name: "200 CMP",
    x: 0.4832,
    y: 0.3275
}, {
    name: "300 CMP",
    x: 0.4750,
    y: 0.2800
}, {
    name: "600 CMP",
    x: 0.5338,
    y: 0.2672
}]

// Target Button placement and values
const buttonValuesArray = [{
    target: 'Deer',
    buttonXStart: 60,
    buttonYStart: 50,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[0].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[0].y)
}, {
    target: 'Deer',
    buttonXStart: 60,
    buttonYStart: 100,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[1].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[1].y)
}, {
    target: 'Deer',
    buttonXStart: 60,
    buttonYStart: 150,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[2].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[2].y)
}, {
    target: 'Deer',
    buttonXStart: 60,
    buttonYStart: 200,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[3].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[3].y)
}, {
    target: 'Man',
    buttonXStart: 150,
    buttonYStart: 50,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[4].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[4].y)
}, {
    target: 'Man',
    buttonXStart: 150,
    buttonYStart: 100,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[5].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[5].y)
}, {
    target: 'Man',
    buttonXStart: 150,
    buttonYStart: 150,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[6].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[6].y)
}, {
    target: 'Man',
    buttonXStart: 150,
    buttonYStart: 200,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[7].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[7].y)
}, {
    target: 'CMP',
    buttonXStart: 240,
    buttonYStart: 100,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[8].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[8].y)
}, {
    target: 'CMP',
    buttonXStart: 240,
    buttonYStart: 150,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[9].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[9].y)
}, {
    target: 'CMP',
    buttonXStart: 240,
    buttonYStart: 200,
    buttonWidth: 80,
    buttonHeight: 40,
    screenX: locations.centerX - (backgroundSize.x * powerFactors[10].x),
    screenY: locations.centerY - (backgroundSize.y * powerFactors[10].y)
}];

// Magnification Buttons and Values 
// to add later: mouse wheel zooming, by tenths of a magnification)
const powerValuesArray = [{
    mag: '4X',
    buttonXStart: 50,
    buttonYStart: canvas.height - 200,
    buttonWidth: 60,
    buttonHeight: 40,
    magnification: 4
}, {
    mag: '3X',
    buttonXStart: 45,
    buttonYStart: canvas.height - 150,
    buttonWidth: 70,
    buttonHeight: 40,
    magnification: 3
}, {
    mag: '2X',
    buttonXStart: 40,
    buttonYStart: canvas.height - 100,
    buttonWidth: 80,
    buttonHeight: 40,
    magnification: 2
}, {
    mag: '1X',
    buttonXStart: 35,
    buttonYStart: canvas.height - 50,
    buttonWidth: 90,
    buttonHeight: 40,
    magnification: 1
}]; 

// ADJUSTMENT ARENA

let adjustmentCounter = {
    x: 0,
    y: 0
};

const adjustmentButtons = [{
    direction: 'Up',
    buttonXStart: canvas.width - 175,
    buttonYStart: 50,
    buttonWidth: 80,
    buttonHeight: 40,
    adjustment: 1 
}, {
    direction: 'Right',
    buttonXStart: canvas.width - 100,
    buttonYStart: 100,
    buttonWidth: 80,
    buttonHeight: 40,
    adjustment: 2
}, {
    direction: 'Down',
    buttonXStart: canvas.width -175,
    buttonYStart: 150,
    buttonWidth: 80,
    buttonHeight: 40,
    adjustment: 3
}, {
    direction: 'Left',
    buttonXStart: canvas.width - 250,
    buttonYStart: 100,
    buttonWidth: 80,
    buttonHeight: 40,
    adjustment: 4
}, {
    direction: 'Up',
    buttonXStart: canvas.width - 175,
    buttonYStart: canvas.height - 150,
    buttonWidth: 80,
    buttonHeight: 40,
    adjustment: 5 
}, {
    direction: 'Right',
    buttonXStart: canvas.width - 100,
    buttonYStart: canvas.height - 100,
    buttonWidth: 80,
    buttonHeight: 40,
    adjustment: 6
}, {
    direction: 'Down',
    buttonXStart: canvas.width -175,
    buttonYStart: canvas.height - 50,
    buttonWidth: 80,
    buttonHeight: 40,
    adjustment: 7
}, {
    direction: 'Left',
    buttonXStart: canvas.width - 250,
    buttonYStart: canvas.height - 100,
    buttonWidth: 80,
    buttonHeight: 40,
    adjustment: 8
}];

let shotArray = []; // starting with a blank array of shots for the shot marker

/* ----- BUTTON CONSTRUCTORS ----- */

class adjustingButton {
    constructor(x, y, width, height, buttonText, adjustment) {
        
        let button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.zIndex = '3';
        button.style.width = width + "px";
        button.style.height = height + "px";
        button.style.top = y + "px";
        button.style.left = x + "px";
        button.appendChild(document.createTextNode(buttonText))
        
        document.body.appendChild(button);

        // May want to set this function outside here - it's nested really darn far in
        button.onclick = function() {
            switch (adjustment) {
                case 1:
                    intendedTarget.y += adjustmentValue;
                    if (gameState.adjustmentFactor === 4) {
                        adjustmentCounter.y++;
                    } else if (gameState.adjustmentFactor === 1) {
                        adjustmentCounter.y += 4;
                    }
                    break;
                case 2: 
                    intendedTarget.x -= adjustmentValue;
                    if (gameState.adjustmentFactor === 4) {
                        adjustmentCounter.x--;
                    } else if (gameState.adjustmentFactor === 1) {
                        adjustmentCounter.x -= 4;
                    }
                    break;
                case 3: 
                    intendedTarget.y -= adjustmentValue;
                    if (gameState.adjustmentFactor === 4) {
                        adjustmentCounter.y--;
                    } else if (gameState.adjustmentFactor === 1) {
                        adjustmentCounter.y -= 4;
                    }
                    break;
                case 4:
                    intendedTarget.x += adjustmentValue;
                    if (gameState.adjustmentFactor === 4) {
                        adjustmentCounter.x++;
                    } else if (gameState.adjustmentFactor === 1) {
                        adjustmentCounter.x += 4;
                    }
                    break;
                case 5:
                    for (let i = 0; i < shotArray.length; i++) {
                        shotArray[i].y-=adjustmentValue;
                    }
                    break;
                case 6:
                    for (let i = 0; i < shotArray.length; i++) {
                        shotArray[i].x+=adjustmentValue;
                    }
                    break;
                case 7:
                    for (let i = 0; i < shotArray.length; i++) {
                        shotArray[i].y+=adjustmentValue;
                    }
                    break;
                case 8:
                    for (let i = 0; i < shotArray.length; i++) {
                        shotArray[i].x-=adjustmentValue;
                    }
                    break;
                default:
                    console.log('something is wrong...')
            }
    }
} }

class powerButton {
    constructor(x, y, width, height, buttonText, magnify) {
        
        let button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.zIndex = '3';
        button.style.width = width + "px";
        button.style.height = height + "px";
        button.style.top = y + "px";
        button.style.left = x + "px";
        button.appendChild(document.createTextNode(buttonText))
        
        document.body.appendChild(button);

        button.onclick = function() {
            gameState.magnification = magnify;
            backgroundSizeNew.x = (radiusScreen / 0.19) * magnify;
            backgroundSizeNew.y = (radiusScreen / 0.2375) * magnify;
    
            intendedTarget.x = locations.centerX - (backgroundSizeNew.x * ((locations.centerX - currentPosition.x)/backgroundSize.x));
            intendedTarget.y = locations.centerY - (backgroundSizeNew.y * ((locations.centerY - currentPosition.y)/backgroundSize.y)); // Geeze, that was something
           
        }   
    }     
} 

class targetButton {
    constructor(x, y, width, height, buttonText, xval, yval) {
        
        let button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.zIndex = '3';
        button.style.width = width + "px";
        button.style.height = height + "px";
        button.style.top = y + "px";
        button.style.left = x + "px";
        button.appendChild(document.createTextNode(buttonText))
        
        document.body.appendChild(button);

        button.onclick = function() {
        intendedTarget.x = locations.centerX - (gameState.magnification / 4.0) * (locations.centerX - xval) - ((4-gameState.magnification) * 0.75); // Will test for error starting here. All magnification change / centering should accomodate the new position. Also, the variation is only on X, not on Y. 
        // - ((4-gameState.magnification) * 0.75) :: just a temporary fix. Doesn't update unless you re-click a target button. Could be more 'active' of a fix - it's apparently close enough to be correct. But it's only a few pixels or so...
        intendedTarget.y = locations.centerY - (gameState.magnification / 4.0) * (locations.centerY - yval); 
        adjustmentCounter.x = 0;
        adjustmentCounter.y = 0;
        } 
} }

/* ----- SHOT ARRAY ----- */

// to increase index with each shot placed
let shotCounter = 0;

// Record the mouse position at all times...
let mousePosition = {
    x: 0,
    y: 0
}

onmousemove = function(e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
}

// now to put location data to use...
onkeydown = function shotMarkerMaker(m) {
    // console.log(m.keyCode); // Space == 32; X == 88
    // console.log(m.key)
    if (m.keyCode == 32 || m.key == " ") {
        let newShot = {x: 0, y: 0}; // start with a blank object to add to the array...
        newShot.x = mousePosition.x;
        newShot.y = mousePosition.y;
        shotArray[shotCounter] = newShot;
        shotCounter++;
    } else if (m.keyCode == 88 || m.key == 'x') {
        shotArray = [];
        shotCounter = 0;
    }
}

function drawShots() {
    for (let i = 0; i < shotArray.length; i++) {
        // Rely on the animation loop to clear the circles each frame
        c.beginPath();
        c.arc(shotArray[i].x, shotArray[i].y, gameState.magnification * 1.75, 0, Math.PI * 2, true);
        c.fillStyle = 'red'
        c.fill();
    }
}

/* ----- DRAWING BUTTONS & COUNTER - FUNCTIONS ----- */

function drawButtons() {
    for (let i = 0; i < buttonValuesArray.length; i++) {
        new targetButton(buttonValuesArray[i].buttonXStart, buttonValuesArray[i].buttonYStart, buttonValuesArray[i].buttonWidth, buttonValuesArray[i].buttonHeight, buttonValuesArray[i].target, buttonValuesArray[i].screenX, buttonValuesArray[i].screenY);
        
    }}; 

function drawPowers() {
    for (let i = 0; i < powerValuesArray.length; i++) {
        new powerButton(powerValuesArray[i].buttonXStart, powerValuesArray[i].buttonYStart, powerValuesArray[i].buttonWidth, powerValuesArray[i].buttonHeight, powerValuesArray[i].mag, powerValuesArray[i].magnification);
    }}; 

function drawAdjustments() {
    for (let i = 0; i < adjustmentButtons.length; i++) {
        new adjustingButton(adjustmentButtons[i].buttonXStart, adjustmentButtons[i].buttonYStart, adjustmentButtons[i].buttonWidth, adjustmentButtons[i].buttonHeight, adjustmentButtons[i].direction, adjustmentButtons[i].adjustment); 
    }}; 

// And then to display the holdover counter... But only if 'some' value != 0
function drawAdjustmentCounter() {
        c.fillStyle = 'hsl(0, 10%, 40%)';
        c.fillRect(canvas.width - 225, 225, 180, 80); 
        c.font = "20px Arial";
        c.fillStyle = 'white';
        c.textAlign = 'center';

        let direction = {
            ele: "el.",
            wind: "wind"
        }

        if (adjustmentCounter.y < 0) {
            direction.ele = "down"
        } else if (adjustmentCounter.y > 0) {
            direction.ele = "up"
        } else {
            direction.ele = 'el.'
        }

        if (adjustmentCounter.x > 0) {
            direction.wind = "left"
        } else if (adjustmentCounter.x < 0) {
            direction.wind = "right"
        } else {
            direction.wind = "wind"
        }

        c.fillText(`${Math.abs(adjustmentCounter.y/4)} MOA ${direction.ele}`, canvas.width - 135, 255);
        c.fillText(`${Math.abs(adjustmentCounter.x/4)} MOA ${direction.wind}`, canvas.width - 135, 290);
};

/* ----- MOVEMENT AND ADJUSTMENT STEPS ----- */

// Starting positions, at first Deer Target
let intendedTarget = {
    x: buttonValuesArray[0].screenX,
    y: buttonValuesArray[0].screenY
}; 

let currentPosition = {
    x: buttonValuesArray[0].screenX,
    y: buttonValuesArray[0].screenY 
}; 

// Adjustment Calculation
const adjustmentSteps = [{
    title: 'background',
    x: 0,
    y: 0
}, {
    title: 'position',
    x: 0,
    y: 0
}];

function updateAdjustments() {
    adjustmentSteps[1].x = (intendedTarget.x - currentPosition.x)/3;
    adjustmentSteps[1].y = (intendedTarget.y - currentPosition.y)/3;
    adjustmentSteps[0].x = (backgroundSizeNew.x - backgroundSize.x)/3;
    adjustmentSteps[0].y = (backgroundSizeNew.y - backgroundSize.y)/3;
} // Change divisor to adjust vision movement speed (smaller divisor is faster)

/* ----- STRING CONVERSION - ADJUSTMENTS ----- */

function currentPositionConvert(bg) {
    let currentPositionArray = [];
    currentPositionArray = bg.split(" ")
    currentPosition.x = currentPositionArray[0].replace("px", "");
    currentPosition.y = currentPositionArray[1].replace("px", "");
};

function currentPositionString(x, y) {
    let positionString = x + "px " + y + "px";
    return positionString;
};

/* ----- DRAW BUTTONS AND CROSSHAIRS ----- */

drawButtons(); // target buttons
drawPowers(); // magnification buttons
drawAdjustments(); // holdover & adjustment buttons

    
// BG Overlay should always be separate from reticle, to allow FFP reticle to change
drawCrosshairs();

/* ----- ANIMATION ----- */
function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, window.innerWidth, window.innerHeight); // Remove the old drawings from the page - not to include buttons

    // Step 1 - draw overlay
    drawOverlay();
    // Step 2 - draw updated reticle & Clear Overlay
    clearSightPicture();

    // draw shot markers
    drawShots();

    if (adjustmentCounter.x !== 0 || adjustmentCounter.y !== 0) {
        drawAdjustmentCounter();
    }; // only display counter if adjustment !== 0
    
     // Call in the computed adjustments...
     updateAdjustments();

    // moving to the target
    if (currentPosition.x !== intendedTarget.x) {
        currentPosition.x = currentPosition.x + adjustmentSteps[1].x;
        }

    if (currentPosition.y !== intendedTarget.y) {
        currentPosition.y = currentPosition.y + adjustmentSteps[1].y;
        }

    if ((backgroundSize.x !== backgroundSizeNew.x) || (backgroundSize.y !== backgroundSizeNew.y)) {
        if (backgroundSize.x < backgroundSizeNew.x) {
            backgroundSize.x = backgroundSize.x + adjustmentSteps[0].x;
            backgroundSize.y = backgroundSize.y + adjustmentSteps[0].y;
        } else if (backgroundSize.x > backgroundSizeNew.x) {
            
            backgroundSize.x = backgroundSize.x + adjustmentSteps[0].x;
            backgroundSize.y = backgroundSize.y + adjustmentSteps[0].y;
        }
        
    }

    document.body.style.backgroundPosition = currentPositionString(currentPosition.x, currentPosition.y);
    document.body.style.backgroundSize = currentPositionString(backgroundSize.x, backgroundSize.y); // draw zoom as a function of screen radius to keep proportionality
}

animate();

/* ----- VARIOUS TESTING STATEMENTS ----- */
//onmousemove = function(e){console.log("mouse location:", e.clientX, e.clientY)};// test for mouse location

/* ----- Future Additions ----- */
// Arrow keys to adjust something-or-other
// Blur background (add to current blur function - may need to load new image?)
// 