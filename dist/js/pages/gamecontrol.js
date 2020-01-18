let number = Math.floor(Math.random()*100)+1;
let text = "previous guess : "
let previous = document.querySelector("#previous").textContent = text
document.querySelector("button[name=refresh]").style.visibility="hidden"
let numberOftimes = 0
let timeToCountdown = 60
let seconds = timeToCountdown

timer()

    function checkupdate(){
        var gettext = document.querySelector("input[name=guess]").value;
        if(gettext!==""){
            numberOftimes++
            if(numberOftimes<10 && seconds !==0){
            if(gettext>number){
                document.querySelector("#game").textContent = "Go wrong"
                document.querySelector("#status").textContent = "Too High"
                document.querySelector("#game").setAttribute("class", "redclass");
            }else if (gettext<number){
                document.querySelector("#game").textContent = "Go wrong"
                document.querySelector("#status").textContent = "Too Low"
                document.querySelector("#game").setAttribute("class", "redclass");
            }else{
                document.querySelector("#game").textContent = "Congratulation"
                document.querySelector("#game").setAttribute("class", "greenclass");
                document.querySelector("#status").textContent = ""
                document.querySelector("button[name=confirm]").disabled = true
                document.querySelector("input[name=guess]").disabled = true
                document.querySelector(".pe").setAttribute("class", "pyro");
            }
            text+=" "+gettext
            document.querySelector("#previous").textContent = text
            document.querySelector("input[name=guess]").value = ""
            document.querySelector("button[name=refresh]").style.visibility="visible"
        }else{
            document.querySelector("#game").textContent = "Game Over"
            document.querySelector("#game").setAttribute("class", "redclass");
            document.querySelector("button[name=confirm]").disabled = "true"
            document.querySelector("input[name=guess]").disabled = "true"
        }
}if(seconds === 0){
    document.querySelector("button[name=refresh]").style.visibility="visible"
    document.querySelector("#game").textContent = "Game Over"
    document.querySelector("button[name=confirm]").disabled = "true"
    document.querySelector("input[name=guess]").disabled = "true"
}
    }


    function refresh(){
        numberOftimes = 0
        document.querySelector("input[name=guess]").value = ""
        number = Math.floor(Math.random()*100)+1
        text = "previous guess : "
        previous = document.querySelector("#previous").textContent = text
        document.querySelector("#status").textContent = ""
        document.querySelector("#game").textContent = ""
        document.querySelector("button[name=refresh]").style.visibility="hidden"
        document.querySelector("button[name=confirm]").disabled = false
        document.querySelector("input[name=guess]").disabled = false
        document.querySelector("button[name=start]").style.visibility = "visible"
        document.querySelector(".input-group").style.visibility = "hidden"
        document.querySelector(".input-group").style.visibility = "hidden"
        document.querySelector("#previous").style.visibility = "hidden"
        document.querySelector("#timer").style.visibility = "hidden"
        document.querySelector("#game").style.visibility = "hidden"
        document.querySelector(".pyro").setAttribute("class", "pe");
    }

function start(){
    seconds = timeToCountdown
    document.querySelector("#timer").style.visibility = "visible"
    document.querySelector("#game").style.visibility = "visible"
    document.querySelector("button[name=start]").style.visibility = "hidden"
    document.querySelector(".input-group").style.visibility = "visible"
    document.querySelector("#previous").style.visibility = "visible"
}

function timer(){
    setInterval(function () {
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.querySelector("#timer").textContent =seconds;

        if (--seconds < 0) {
            seconds = 0;
        }
    }, 1000);
}