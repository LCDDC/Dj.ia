song = "";
function preload(){
    song = loadSound("music.mp3");
}
scorerightwrist = 0;
scoreleftwrist = 0;
rightwristx = 0;
rightwristy = 0;
leftwristx = 0;
leftwristy = 0;

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function modelLoaded(){
    console.log("PoseNet esta inicializado")
}

function gotPoses(results){
    if (results.length>0){
        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scorerightwrist = "+scorerightwrist+"scoreleftwrist = "+scoreleftwrist);
        
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if (scorerightwrist>0.2){
        circle(rightwristx, rightwristy, 20);
        if (rightwristy>0 && rightWristy<=100){
            document.getElementById("speed").innerHTML = "Velocidad = 0.5x";
            song.rate(0.5);
        }
        else if(rightwristy = 100 && rightwristy<=200){
            document.getElementById("speed").innerHTML = "Velocidad = 1x";
            song.rate(1)
        }
        else if(rightwristy>200 && rightwristy<=300){
            document.getElementById("speed").innerHTML = "Velocidad = 1.5x";
            song.rate(1.5)
        }
        else if(rightwristy>300 && rightwristy<=400){
            document.getElementById("speed").innerHTML = "Velocidad = 2x";
            song.rate(2)  
        }
        else if(rightwristy>400){
            document.getElementById("speed").innerHTML = "Velocidad = 2.5x";
            song.rate(2.5)    
        }
    }
    if (scoreleftwrist>0.2){
        circle(leftwristx, leftwristy, 20);
        InNumberleftwristy = Number(leftwristy);
        new_leftwristy = floor(InNumberleftwristy *2);
        leftwristy_divide_1000 = new_leftwristy /1000;
        document.getElementById("volume").innerHTML = "Volumen = "+leftwristy_divide_1000;
        song.setVolume(leftwristy_divide_1000);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
} 