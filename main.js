status_1 = ""
objects = []

function preload() 
{
    alarm = loadSound("alarm.mp3")
}
function setup() 
{
    canvas = createCanvas(600, 370)
    canvas.position(470,280)

    video = createCapture(VIDEO)
    video.hide()

    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status_1").innerHTML = "Status: Baby Detecting"
}
function modelLoaded() 
{
    console.log("Model is Loaded!")
    status_1 = true;
}
function gotResult(error, result) 
{
    if (error) 
    {
        console.log("error")
    } 
    else 
    {
        objects = result
        document.getElementById("status_1").innerHTML = "Status: Baby Detected"
    }
    
}
function draw() 
{
    image(video, 0, 0, 600, 370)
    person_found = false
    objectDetector.detect(video,gotResult)       
    if (status_1 != "") 
    {
        objectDetector.detect(video,gotResult)       

        document.getElementById("status_1").innerHTML = "Status: Baby is not Detected"

        for(i=0; i < objects.length; i++)
        {
            objects_name = objects[i].label
            fill("red")
            stroke("red")
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            if (objects_name == "person")
            {
                person_found = true;
                break
            }
       
        }

        if (person_found == false) 
        {
            alarm.play()
        }
        else
        {
            alarm.stop()
        }
    }
}