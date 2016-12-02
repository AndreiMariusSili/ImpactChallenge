$(document).ready( function(){
    var apiUrl="https://api.projectoxford.ai/emotion/v1.0/recognize?";
    var apiKey="d566867d178c448facb6c63dcd6843af"

    Dropzone.autoDiscover = false;

    $(function(){
        var myDropzone = new Dropzone("#dropzone");
        myDropzone.on("addedfile", function(file) {
            console.log(file);
            callAPI(file, apiUrl, apiKey);
        });
    })
});

function callAPI(file, apiUrl, apiKey)
{
$.ajax({
url: apiUrl,
    beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
    },
     type: "POST",
     data: file,
     processData: false
    })
    .done(function (response) {
        ProcessResult(response);
    })
    .fail(function (error) {
        $("#response").text(error.getAllResponseHeaders());
    });
}



function ProcessResult(response)
{
    var anger = response[0]['scores']['anger'];
    var contempt = response[0]['scores']['contempt'];
    var disgust = response[0]['scores']['disgust'];
    var fear = response[0]['scores']['fear'];
    var happiness = response[0]['scores']['happiness'];
    var neutral = response[0]['scores']['neutral'];
    
    var emotionScores = [];
    var emotionMax = -100;
    var emotions = ["anger", "contempt", "disgust", "fear", "happiness", "neutral"];
    var emotionIndex = -100;

    console.log(response);

    response.forEach(function(person) {
        emotionScores = [person.scores.anger, person.scores.contempt, person.scores.disgust, person.scores.fear, person.scores.happiness, person.scores.neutral];
        emotionMax = Math.max.apply(this, emotionScores);
        emotionIndex = $.inArray(emotionMax,emotionScores);
        console.log(emotions[emotionIndex]);

    })
}