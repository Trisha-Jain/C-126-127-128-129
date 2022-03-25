song ="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song=loadSound("music.mp3");
}

function setup() 
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() 
{
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(rightWristY > 0 && rightWristX <= 100)
    {
        document.getElementById("Speed").innerHTML= "Speed = 0.5x";
        song.rate(0.5);
    }
     
    else if(rightWristY > 100 && rightWristX <= 200)
    {
        document.getElementById("Speed").innerHTML= "Speed = 1x";
        song.rate(1);
    }
         
    else if(rightWristY > 200 && rightWristX <= 300)
    {
        document.getElementById("Speed").innerHTML= "Speed = 1.5x";
        song.rate(1.5);
    }
          
    else if(rightWristY > 300 && rightWristX <= 400)
    {
        document.getElementById("Speed").innerHTML= "Speed = 2x";
        song.rate(2);
    }

         
    else if(rightWristY > 400 && rightWristX <= 500)
    {
        document.getElementById("Speed").innerHTML= "Speed = 2.5x";
        song.rate(2.5);
    }


    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML= "Volume = " + volume;
    song.setVolume(volume);
    }
}

function play() 
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if(results.length > 0 ) 
    {
       console.log(results);
       scoreLeftWrist= results[0].pose.keypoints[9].score;
       console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist" + scoreRightWrist);
       scoreRightWrist= results[0].pose.keypoints[10].score;
       

       leftWristX= results[0].pose.leftWrist.x;
       leftWristY= results[0].pose.leftWrist.y;
       console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

       rightWristX= results[0].pose.leftWrist.x;
       rightWristY= results[0].pose.leftWrist.y;
       console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}