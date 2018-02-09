
// const http = require("http");
//  $("#start-btn").click(() => {
     
//  })
var NewUser = function(name, location, url, nice, humor) {
    this.name = name.val();
    this.location = location.val();
    this.photoLocation = url.val();
    this.nice = nice,
    this.humor = humor;
}


let dataFromServer;
$("#submit-btn").click(() => {
    let nice = 0;
    let humor = 0;
    const name = $("name-input").val();
    const imgUrl = $("img-input").val();
    for (var i = 0; i < 19; i++) {
        if ($(`#question${i}`).prop("checked")) {
            nice = nice + parseInt($(`#question${i}`).attr('nice'));
            humor = humor + parseInt($(`#question${i}`).attr('humor'));
        }
    }
    let newProfile = new NewUser($("#name-input"), $("#location-input"), $("#img-input"), nice, humor);
    const url = "/results.html"
    $.ajax({
        type: "POST",
        url: url,
        data: newProfile
    }).done(function(data1, err) {
        dataFromServer = data1
    })
    hider();
})

$("#results-page").on("load", () => {
    $("#user-profile").hide();
    $("#match-profile").hide();
})

$("#check-button").on("click", () =>{
    $.get('/data.js', (data) => {
        const currentUser =  data.profiles[data.profiles.length - 1];
        const profiles = data.profiles;
        const name = currentUser.name;
        const humor = currentUser.humor;
        let nice = currentUser.nice;
        if (humor === 0 && currentUser.nice == 8){
            nice = 10;
        }
        shower();
        let match;
        for (var i = 0; i < profiles.length - 1; i++) {
            if (profiles[i].humor == parseInt(humor)){
                if (profiles[i].nice == parseInt(nice)) {
                    match = profiles[i];
                    break;
                }
            }
        }

        var userDiv = `<div class="col-lg-1 col-md-1"></div>
            <div class="col-lg-5 col-md-5 pad-40 border-1" id="user-profile">
            <h2>Your Profile</h2>
            <h3 id="user-name">Name: ${currentUser.name}</h3>
            <img src="${currentUser.photoLocation}" alt="User Picture" id="user-picture">
            <p id="user-location">Location: ${currentUser.location}</p>
            <p id="user-nice">Nice Rating: ${data.niceRubrik[nice/2].description}</p>
            <p id="user-humor">Humor Rating: ${data.humorRubrik[humor/2].description}</p></div>`;
        var matchDiv = `<div class="col-lg-5 col-md-5 pad-40 border-1" id="match-profile">
            <h2>Your Match's Profile</h2>
            <h3 id="match-name">Name: ${match.name}</h3>
            <img src="${match.photoLocation}" alt="match Picture" id="match-picture">
            <p id="match-location">Location: ${match.location}</p>
            <p id="match-description">I can't think of an adequate joke to put here because its 12:15 the day before this is due and I'm really drunk and I've been up for a hwile and have to be up at 5am which will mean that I will probably be comatose or so amped on caffeine that my fingers are shaking which is totally cool except for the fact that comas and shaking over caffeinated fingers tend to cause me not to want to type stuff like descriptions so this will probably make it into my final app and that is just great with me...SO.......ya. Hello Thomas/Tasha/Elijah!!!</p>`;
        $(".append-area").append(userDiv, matchDiv);



        // $("#match-name").html(`Name: ${match.name}`);
        // $("#match-picture").attr("src", match.photoLocation);
        // $("#match-location").html(`Location: ${match.location}, VA`);
        // $("#match-description").text("I can't think of an adequate joke to put here because its 12:15 the day before this is due and I'm really drunk and I've been up for a hwile and have to be up at 5am which will give me 2 hours more sleep than I've had the rest of the week so I'm feeling both quite good an quite bad. SO.......ya. Hello Thomas/Tasha/Elijah.")
    })
})

var hider = () => {
    $("#user-profile").hide();
    $("#match-profile").hide();
}

var shower = () => {
    $("#check-button").hide();
    $("#command").hide();
    $("#user-profile").show();
    $("#match-profile").show();
}