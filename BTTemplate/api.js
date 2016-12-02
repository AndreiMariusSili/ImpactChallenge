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
    
    var arr = [anger, contempt, disgust, fear, happiness, neutral];
    var arr1 = ["anger", "contempt", "disgust", "fear", "happiness", "neutral"];
    var maxValue = Math.max.apply(this, arr);
    var maxValueIn = $.inArray(maxValue,arr);
    
    var maximum = Math.max(anger, contempt, disgust, fear, happiness, neutral);
    var value = maxValueIn;


    console.log (maximum);
    console.log (arr1[maxValueIn]);
    console.log(response); //temp
}