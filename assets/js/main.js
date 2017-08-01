var name = '';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';
var config = {
    apiKey: "AIzaSyAbwjodEa2ydVadL4rz_GXoybdBptwIIe4",
    authDomain: "trainschedule-33818.firebaseapp.com",
    databaseURL: "https://trainschedule-33818.firebaseio.com",
    projectId: "trainschedule-33818",
    storageBucket: "",
    messagingSenderId: "788141407990"
};
firebase.initializeApp(config);
var database = firebase.database();

$(document).ready(function() {
     $("#btnAddTrain").on("click", function(event) {
     	event.preventDefault();
     	name = $('#inputName').val().trim();
     	destination = $('#inputDestination').val().trim();
     	firstTrainTime = $('#inputFirstTrainTime').val().trim();
     	frequency = $('#inputFrequency').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");
     	keyHolder = database.ref().push({
     	    name: name,
     	    destination: destination,
     	    firstTrainTime: firstTrainTime, 
     	    frequency: frequency,
               nextTrainFormatted: nextTrainFormatted,
               minutesTillTrain: minutesTillTrain
     	});
          $('#inputName').val('');
     	$('#inputDestination').val('');
     	$('#inputFirstTrainTime').val('');
     	$('#inputFrequency').val('');
     });
     database.ref().on("child_added", function(childSnapshot, prevChildKey) {
          var train = childSnapshot.val().name;
          var destination = childSnapshot.val().destination;
          var frequency = childSnapshot.val().frequency;
          var nextTrainFormatted = childSnapshot.val().nextTrainFormatted;
          var minutesTillTrain = childSnapshot.val().minutesTillTrain;
          $("#tblTrainSchedule > tbody").append("<tr><td>" + 
               train + "</td><td>" + 
               destination + "</td><td>" +
               frequency + "</td><td>" + 
               nextTrainFormatted + "</td><td>" + 
               minutesTillTrain + "</td></tr>");
     }, function(errorObject){
          console.log(errorObject);
     });
});