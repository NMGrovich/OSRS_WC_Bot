//import RobotJS Library
var robot = require('robotjs');

function main(){
        //output msg of the start of the bot
        console.log("Starting Woodcutting Bot");
        sleep(4000);
    //infinite loop use control c to stop program
    while (true){
        var treeloop = Find_normalLogs();
        //if we cant find a tree....
        if (treeloop == false){
            console.log("No Tree Was Found!")
            RCam();
            continue;  
        }

    robot.moveMouse(treeloop.x, treeloop.y);
    robot.mouseClick();
    sleep(8000);
    dropLogs();
    }
}

function dropLogs(){ 
        //function to drop logs
        //drop the logs from the inventory of the
        //topleft spot of the inventory

        //position to drop the 
        //logs it just cut down
        var inventory_drop_x = 1733;
        var inventory_drop_y = 769;
        //go to the inventory spot
        robot.moveMouse(inventory_drop_x, inventory_drop_y);
        sleep(10)
        robot.keyToggle("shift", "down");
        //right click it
        sleep(10)
        robot.mouseClick('left');
        //unpress shift 
        sleep(10)
        robot.keyToggle("shift", "up");
        sleep(1000);
}

function Find_normalLogs(){
    //dimensions of the screen cap
    var x = 300;
    var y = 300;
    var width = 1300;
    var height = 400;

    //img is a img using robot JS
    var img = robot.screen.capture(x, y, width, height);

    //now find all the normal tree colors
    //used color picker with screenshots for this
    var normal_tree_colors = ["5B4021","52391D", "654723", "715129", "7E592C", "865F30" , "7B572B"];

    //loop through the whole screen to get a random pixel 
    for (var i = 0; i < 100; i++){
        var random_x = RandomInt(0, width -1);
        var random_y = RandomInt(0, height-1);
    //pick a random cord to get the color from
        var scan_color = img.colorAt(random_x, random_y);
    //if the scan color matches the list of colors we have
        if(normal_tree_colors.includes(scan_color)){
            var screen_x_cord = random_x + x;
            var screen_y_cord = random_y + y;
            //logs where the tree is found and the color of the tree that was used
            console.log("Found a tree at: " + screen_x_cord + " with the color of: " + scan_color + ".");
            return {x: screen_x_cord, y: screen_y_cord};
        }
    }
    //did not find the color of the tree
    //in the screenshot we took
    return false;
}

function RandomInt(min, max){//function to get a random integer
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function sleep(ms){
    //function to wait aka SLEEP
    //pulled this from a stackoverflow
    //will link it if i find it again
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function RCam(){
    //log what it is doing
    console.log("Rotating Camera!");
    //toggle the right key down
    robot.keyToggle("right", "down");
    //wait
    sleep(1000);
    //toggle the right key up
    robot.keyToggle("right" , "up");
}

main();
