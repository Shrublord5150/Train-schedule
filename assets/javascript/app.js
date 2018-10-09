$(document).ready(function(){
console.log("starting application...")

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAqHdW3yG0xUmvU9ueOkYOzfqooLMvMiVM",
    authDomain: "train-schedule-2ee9c.firebaseapp.com",
    databaseURL: "https://train-schedule-2ee9c.firebaseio.com",
    projectId: "train-schedule-2ee9c",
    storageBucket: "train-schedule-2ee9c.appspot.com",
    messagingSenderId: "140325856974"
  };

  firebase.initializeApp(config);
// Make the database variable
  var database = firebase.database();

// Create a on click event that takes the users input information and stores it in firebase 
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var tName = $("#train-name-input").val().trim();
    var tDestination = $("#train-destination-input").val().trim();
    var tTime = moment($("#train-time-input").val().trim(), "HH/mm").format("X");
    var tFrequency = $("#train-frequency-input").val().trim();

    // create a temp object to hold the user information
    var newTrain = {
        name: tName,
        destination: tDestination,
        time: tTime,
        frequency: tFrequency,

    };

    // upload the newTrain to firebase storage
    database.ref().push(newTrain);

    // console log the new information---working
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // reset the form to empty after the click
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-time-input").val("");
    $("#train-frequency-input").val("");

    

  });




    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        var trName = childSnapshot.val().name;
        var trDestination = childSnapshot.val().destination;
        var trTime = childSnapshot.val().time;
        var trFrequency = childSnapshot.val().frequency;

        // New train Info
        console.log(trName);
        console.log(trDestination);
        console.log(trTime);
        console.log(trFrequency);

    
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        var arrivalPretty = moment.unix(trTime).format("HH:mm");

        var trTimeConverted = moment(trTime, "HH:mm").subtract(1, "years");
        console.log(trTimeConverted);

    // Difference between the times
        var diffTime = moment().diff(moment(trTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
        var tRemainder = diffTime % trFrequency;
        console.log(tRemainder);

    // Minute Until Train
        var tMinutesTillTrain = trFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("mm"));

        var newRow = $("<tr>").append(
            $("<td>").text(trName),
            $("<td>").text(trDestination),
            $("<td>").text(trFrequency),
            $("<td>").text(arrivalPretty),
            $("<td>").text(tMinutesTillTrain),
            
          );
        
          $("#train-table > tbody").append(newRow);
      
    });
























});