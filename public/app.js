//  $("#start-btn").click(() => {
     
//  })
var NewUser = function(name, location, url, nice, humor) {
    this.name = name.val();
    this.location = location.val();
    this.photoLocation = url.val();
    this.results = {
        nice: nice,
        humor: humor
    }
}

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
    console.log(`Nice: ${nice}`);
    console.log(`Humor: ${humor}`);
    var newProfile = new NewUser($("#name-input"), $("#location-input"), $("#img-input"), nice, humor);
    console.log(newProfile);
})
