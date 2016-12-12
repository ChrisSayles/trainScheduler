var config = {
    apiKey: "AIzaSyBICrZtfwPA18DRqRuXQ2IDlg6fpTV3XZE",
    authDomain: "trainscheduler-28399.firebaseapp.com",
    databaseURL: "https://trainscheduler-28399.firebaseio.com",
    storageBucket: "trainscheduler-28399.appspot.com",
    messagingSenderId: "543922623775"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var trainName;
var destination;
var firstTrainTime;
var frequency;


$("#submit").on("click", function(event) {


    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });
});




database.ref().on("child_added", function(snap) {
    //This will convert and calculate difference of today from start date
    var trainTime = snap.val().firstTrainTime;
    var convertedTime = moment(trainTime, "HH:mm");
    // convertedTime.format("HH:mm");
    console.log(" converted= " + convertedTime.format("HH:mm"));
    var minutesAway = (moment().add(convertedTime, "minutes"));
    var timeLeft = (minutesAway % snap.val().frequency);
  
    var nextArrival = moment().add(timeLeft, "m").format("HH:mm");
   


    // 4:25 
    // frequency is 5 minutes
    // currentTime  frequency = 

     // moment().add(7 , 'days');
    //this will calculate the rate * months worked
    // var totalBilled = monthsWorked * snap.val().monthlyRate;


    var newRow = $("<tr>");
    newRow.append($("<td>" + snap.val().trainName + "</td>"));
    newRow.append($("<td>" + snap.val().destination + "</td>"));
    newRow.append($("<td>" + snap.val().frequency + "</td>"));
    newRow.append($("<td>" + nextArrival + "</td>"));
    newRow.append($("<td>" + timeLeft + "</td>"));

    // newRow.append($("<td>" + monthsWorked + "</td>"));
    // newRow.append($("<td>" + totalBilled + "</td>"));
    $("tbody").append(newRow);
});