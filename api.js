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
    console.log(response);
    console.log("anger="+response[0]['scores']['anger']);
 console.log("contempt="+response[0]['scores']['contempt']);
 console.log("disgust="+response[0]['scores']['disgust']);
 console.log("fear="+response[0]['scores']['fear']);
 console.log("happiness="+response[0]['scores']['happiness']);
 console.log("neutral="+response[0]['scores']['neutral']); //temp
}