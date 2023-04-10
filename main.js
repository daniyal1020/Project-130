music1 = "";
music2 = "";
score_lw = 0;
score_rw = 0;
song1_status = "";
song2_status = "";
function preload(){
     music1 = loadSound("1music.mp3");
     music2 = loadSound("2music.mp3");
}
function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 400, 400);
    
    song1_status = music1.isPlaying();
    if(score_lw > 0.2){
        fill('#FF0000');
        stroke('#FF0000');
        circle(leftWristX, leftWristY, 20);
        
        music2.stop();
        if(song1_status == false){
            music1.play();
            document.getElementById('song_name').innerHTML = 'Drop It';
        }
    }
    

    song2_status = music2.isPlaying();
    if(score_rw > 0.2){
        fill('#FF0000');
        stroke('#FF0000');
        circle(rightWristX, rightWristY, 20);
        
        music1.stop();
        if(song2_status == false){
            music2.play();
            document.getElementById('song_name').innerHTML = 'Blast';
        }
    }
}
function modelLoaded(){
    console.log('poseNet is Initialised');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        score_lw = results[0].pose.keypoints[9].score;
        score_rw = results[0].pose.keypoints[10].score;
    }

}        