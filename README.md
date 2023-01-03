# Scope Simulator : Ver. 1.0

*Update Date : Jan 03, 2023*
*Code by: Scott Dee*
*XTC Scope from Hi-Lux Optics*

## Introduction

Welcome to the Scope Simulator! This is a little project that has quite a bit of growing left to do. It is meant as a teaching tool. When teaching someone to first use a scope, there's a few hurdles to jump over. It's tough to fit two people behind an optic, so it's quite difficult to ensure that someone is looking at the same things you are and paying attention to the same details. Images and drawing will sometimes suffice, but they never quite convey the same feel. There's too little interactivity. 

To try and fill the teaching-tool gap, I've made the Scope Simulator. When teaching a new shooter the introductory material, sometimes it's easier to point at a screen and say *look at this thing*. 

*A brief note*
While the simulator is by no means finished, I felt it was a good idea to release it. It's ready enough to run, so it's ready enough for some real testing. Before I dive too much deeper into this project, I'd like some feedback from a wide group of people. If you're reading this and you have some ideas, don't hesitate to send me a message or call the Hi-Lux office. 

## Running the Simulator
The Scope Simulator is meant to load in the browser. Once you click on the link or type in the correct URL, the simulator should load in your browser. It will automatically size itself and position the buttons as appropriate. Please note - a very small screen (such as a mobile device or small window) may make the view too cramped. If you resize the browser, simply reload the page and the program will resize itself to the new window size. 

Once the simulator has loaded, you're ready to hit the ground running. The only required equipment is your computer (and, potentially, a mouse and keyboard) and an internet connection. *If you're going to use this somewhere without internet, make sure to download the files beforehand. Once you load the .html file in your browser, the simulator will run just as expected*

The Scope Simulator is free to use. You don't need an account, login, or payment of any sort to use this program. *Free as in 'free beer'*

## Overview

This simulator shows the view through an XTC 1-4X34MM Scope. This is a Second-Focal Plane scope (meaning the reticle stays a constant size as magnification is changed), built especially for Civilian Marksmanship Program matches. It has 1/4 MOA adjustments, and a magnification range of 1 to 4 power. 

**Upper Left - Target Buttons**

While looking through the (simulated) scope, you'll get a view of three target fields:
* Deer
    100, 200, 300, 600 yards
* Man-size silhouettes
    100, 200, 300, 600 yards
* CMP Targets
    200, 300, 600 yards

Once you click a button, the crosshairs should quickly point at the appropriate target. 

**Lower Left - Magnification**

Click any of the numbered buttons to change the magnification. The XTC scope runs from 1-4 power, so the simulator gives whole-number power changes from 1 to 4. 

**Upper Right - Holdovers**

Click any of the direcitonal buttons in the upper right to make the scope *hold over* or *favor* in one direction or another. If any shots have been placed in the field of view, the shots will stay at the same position on the reticle. Just like a regular holdover, pointing your scope and rifle off to one side doesn't make any adjustments in the scope.

When a holdover adjustment is made, a popup will appear to keep track of the direction and amount of hold. Currently, this value is tracked in terms of MOA.

**Lower Right - Adjustments**

Clicking any of these directional buttons will adjust any shots that have been placed in the field of view. The view of the target (and where the crosshairs are positioned) will not change - only the shot markers will move. This is meant to mimic normal scope use. I'm assuming that, in ideal conditions, you'll be placing your crosshairs right on the bullseye. If your shots land elsewhere and a (dialed) correction is made, you'll still put the crosshairs right on the bullseye again. Same idea here. 

**Shot Marker**

To place shots on the board, just hit the **spacebar** on your keyboard. A shot will be placed where the cursor is currently positioned. You can place them as fast as you can click, and there is no set limitation on the quantity. To clear all currently-placed shots, press the **X** button on your keyboard.

The shot markers will change size depending on the current magnification. Raising the magnification results in larger shot marks.

**Mid Right - Adjustment Value Change**

At the start, any holdovers and dialed adjustments will stick to the 1/4 MOA per click found in the XTC scope. If you want to move a larger amount more rapidly, hit the *Adjustment amt.* button on the right side of the screen. This will allow you to swap between 1/4 MOA and 1 MOA values. All the adjustment and holdover buttons will still work as expected, but will adjust to the amount specified on this particular button. 

**Mid Left - Blur Function**

Click the button on the far left to change how the scope is focused. On startup, both the reticle and target will be in full focus. Click the focus button to make the reticle blurry (similar to when you're focusing your eye on the target) or sharp again. 

## Scenario Walkthrough

Let's assume you're a team coach. Let's also assume you'd like to use the Scope Simulator to explain how scopes work to your trainees. And, finally, let's also assume you've loaded up the simulator in your browser of choice. 

When the program loads, you can immediately point out details such as the *reticle* and the *sight picture*. With the mouse cursor or your finger, you can also point out the center of the crosshairs to explain about aiming ('Put this where you want to hit'). 

To give a sense of changing magnification or targets at different distances, a few button clicks will have the simulator demonstrating what you want it to say. 'Here's a target at 100 yards. Here's the same target at 300 yards. The target is the same size, but looks smaller because it's farther away.' And, of course, 'Increasing magnification will help you see a small target,' or, 'Lower magnification gives you a wider view of the field.' This also allows you to demonstrate one of my favorite points - 'You don't always need the highest magnification possible.'

Now it's time to get into the tricky details, such as: What's the difference between a holdover and an adjustment? To demonstrate these points, it might be worthwhile to keep a physical scope nearby. First, place some shots on the field by hitting the spacebar. It'll help if these shots are near (but not *on*) the bullseye. 

Demonstrate a holdover by pointing the physical scope toward one direction or another, and then mirroring that movement with the simulator. If you placed a few shots to the right of the bullseye, you'll likely want to favor left. Show the trainees the scope (and demo rifle) favoring toward the left, then click the 'left' button found in the upper right corner of the screen. This will likewise favor the simulator towards the left. The shots haven't moved in relation to the reticle, but they're now hitting closer to where you want them. 

To contrast this with dialed adjustments, I'd leave the same shots onscreen. Click the target button (upper left set of buttons) that you were already using to reset the crosshairs on the bullseye. Then, demonstrate a dialed adjustment on the physical scope by turning the appropriate turret. In the simulator, click the appropriate adjustment (bottom right set of buttons) to bring the shots to the center of the crosshairs. 

The target sizes and adjustments/holdovers are quite precise. If you wanted to then demonstrate the difference between 5MOA at 100 yards and 5MOA at 600 yards (as well as how much of the target that covers), you could do so fairly easily. I'd start by clearing any current shots (by pressing *x* on your keyboard). Then, set the crosshairs on the center of a target. Click the holdover buttons in any particular direction to start moving the reticle to the side. A popup will appear with the current holdover amount. Keep clicking to the side until you reach the edge of the bullseye whatever adjustment limit you have in mind. Make sure your trainees understand the target size and what an MOA represents on the target. Then, switch to a target at a different distance. Repeat the same steps, but point out that less adjustment was needed to reach the edge of the target when it's farther away. Conversely, more adjustment is needed (for a target of the same size) when closer.

## The Files

The entire program is comprised of **five** files. 

* draw.html *509 bytes*
    This is the backbone html file that allows everything to load in the browser. There's not much going on here aside from setting up the `<canvas>`, calling the **draw.js** file, and linking the **css** file. 
* draw.css *552 bytes*
    This file serves to set up the **background image**, which holds all the targets. It's by changing the size and position of the background that any adjustments are made. Additionally, the CSS provides some styling for the **buttons**, and sets up the **blur** function for when it's needed.
* draw.js *25 KB*
    This is the real meat of the operation. All the math, target locations, button functionality (and button creation), image manipulation, and... **everything** happens here. Below is the table of contents:
    1. Define Working Area (ln. 30)
    2. Define Basic Dimensions and Properties (ln. 35)
    3. Blur and Adjustment Change (ln. 93)
    4. Drawing the Viewport (ln. 142)
    5. Button Arrays - Target, Zoom, Holdover (ln. 207)
    6. Button Constructors (ln. 446)
    7. Shot Array (ln. 572)
    8. Drawing Buttons and Counter - Functions (ln. 614)
    9. Movement and Adjustment Steps (ln. 665)
    10. String Conversion - Adjustments (ln. 696)
    11. Draw Buttons and Crosshairs (ln. 710)
    12. Animation (ln. 720)
* target-rich-test.jpg *5.8 MB*
    This is the target field. It's quite large - owing to its overabundance of pixels.
* XTC-clear-bg.png *74 KB*
    Finally, this is the image for the reticle. Pretty straightforward, and it doesn't move much.

## Future Plans

This program has a ways to go! While the current version *works*, it's still got some planned improvements ahead.

*If there's anything you want added or changed, don't hesitate to call the office!*

- *Target Field*
    There's got to be a more effective and efficient way to show the targets. Right now, the targets are all wrapped up on one large image. Some possibilities: Different images for each target 'type' (e.g. One image for all deer targets). Meanwhile, a dropdown selector for target type. Changing target type will change button text, button call locations. This will also allow for a reduced target-button-area on the screen. There's just so many buttons right now! Plus, this will add the potential for targets at a greater distance, or more targets at match-specific distances.
- *Fix magnification-change issue on a live basis*
    The low-power drifting is some weird quirk of the math that I need to iron out. During this process, I'll clean up the variable calls and some of the nested functions. Hopefully, this will all result in a more efficient program.
- *Different Scopes*
    Hi-Lux makes more scopes than just the XTC. I'd like this program to include some of the other scopes, with wildly different magnification ranges. The reticles will have to change. Magnification methods will need to change for FFP (first focal plane) scopes. To increase the potential pixel count / quality of the target displays, I'll likely need to fix the target fields before tackling this. 
- *Ability to Tilt*
    At the request of someone from the MCL, I'd like to add the ability to tilt both the reticle (to simulate a canted rifle or scope) and the targets (to simulate a tilted head). Not quite sure how I'll reconcile this with the target coordinates, but it sounds like a fun project. 
- *Scroll to Change Magnification*
    Current magnification changes are whole-value, and rely on clicking buttons, It'd be nice to allow soe fine-tuning with a quick spin of the mouse wheel. This will also cut down on the number of buttons required for magnification settings on high-ratio scopes (i.e. there are 20 different whole values for a 5-25X scope. Scrolling would be easier).
- *Magnified Center View*
    This program needs quite a bit of precision (and more detailed images) before I can zoom in on the center of the reticle. Eventually, I'd like to be able to blow up the center 1/3 or 1/4 of the view to fill the screen, allowing easier discussion of things such as group sizes and fine adjustments. 
- *Calculate Group Size*
    When presented with a number of shots, display the size of the group (in MOA)
- *Ballistics?*
    Not a lot of details on this idea yet, but... simulate flight time and expected group sizes from standard ammo types? Something to examine down the road. A possibility - click a button to place X num of random shots with the expected precision, require user to adjust scope to bring shots into the bullseye. 

## Known Issues

The CSS **blur** function is not supported by *Internet Explorer* and *Opera* at this time.

Target aim points may shift slightly **left or right** depending on magnification. While aiming at a target center point, a change in magnification may shift the crosshairs position. Typically, a reduction in magnification will result in a shift to the left. I've written a correction into the aim point calculations. To put the crosshairs where they ought to be, click the target button once again after changing magnification. This should correct the crosshairs. If staying at one level of magnification, any target button will bring you right to center. 

Hitting the **keyboard arrows** sometimes moves the placed shots (e.g. Windows desktop, plug-in keyboard) and sometimes doesn't (Mac Air with built-in keyboard). The on-screen buttons will work for either scenario, but the keyboard might not. 

## Thanks

I'd like to extend a big round of thanks to everyone who's contributed to this project, both with their coaching and coding advice. My hat first goes off to Chris Wu, also of Hi-Lux Optics. He knows scopes like they're his job. A big round of applause to the people at Camp Valor Outdoors and the Marine Corps League. These are two organizations focused on veterans, and I have a great deal of respect for both. It also helps that each of their organizations contains some of the most capable coaches I've ever had the pleasure of speaking with. Finally, I'd like to thank my big brother. If he's read this far in the README, I'll simply say: That was a bro-tacular save with the variable. 