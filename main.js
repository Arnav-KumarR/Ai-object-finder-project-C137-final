Status = "";
objects = [];
audio = "";

function setup() {
    canvas = createCanvas(640, 420);
    canvas.position(500, 200);
    video = createCapture(VIDEO);
    video.hide();
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results; 
}

function draw() {
    image(video, 0, 0, 640, 420);
    if(Status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            thing = "";
            thing = document.getElementById('input').value;
            document.getElementById('status').innerHTML = "Status : Object Detected";
            if(objects[i].label == thing) {
                document.getElementById('notifier').innerHTML = thing + " found";
            }
            else {
                document.getElementById('notifier').innerHTML = thing + " not found";
            }
            var synth = window.speechSynthesis;
                speak_data = thing + " found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);

            fill("green");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("green");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}