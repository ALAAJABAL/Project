function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center()

    video = createCapture(VIDEO);
    video.hide();

    model = ml5.poseNet(video, modelLoaded);
    model.on("pose", showResult)
}

function modelLoaded()
{
  console.log("Model is Loaded")
}

lwx = 0;
lwy = 0;
rwy = 0;
rwx = 0;
lws = 0;
rws = 0;

function preload()
{
  song1 = loadSound("song1.mp3")
  song2 = loadSound("song2.mp3")
}

function showResult(result)
{
  console.log(result);
  lwx = result[0].pose.leftWrist.x
  lwy = result[0].pose.leftWrist.y
  rwx = result[0].pose.rightWrist.x
  rwy = result[0].pose.rightWrist.y
  lws = result[0].pose.keypoints[9].score
  rws = result[0].pose.keypoints[10].score
}
song1status = "";
song2status = "";

function draw()
{
  image(video, 0, 0, 600, 500);
  fill("yellow")
  song1status = song1.isPlaying();
  song2status = song2.isPlaying();
  if(lws > 0.2)
  {

    circle(lwx, lwy, 20)
    song2.stop();
  if( song1status == false)
  {
    song1.setVolume(0.9);
    song1.rate(1);
    song1.play();
    document.getElementById("song").innerHTML = "Playing Despacito"
    

  }
  }

  if(rws > 0.2)
  {
    circle(rwx, rwy, 20)
    song1.stop();
  if( song2status == false)
  {
    song2.setVolume(0.9);
    song2.rate(1);
    song2.play();
    document.getElementById("song").innerHTML = "Playing Parado no bailão"

  }
  }
  
  
}





function stop()
{
  song1.stop();
  song2.stop();
}