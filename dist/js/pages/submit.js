let firebaseConfig = {
    apiKey: "API-AIzaSyCj4wYQbxBnI4YEz4FhGr6kTxWHzVuWqNs",
    authDomain: "localhost",
    projectId: "lab217-28-1-2020",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

$("#save").click(() => {
    event.preventDefault()
    if($("#firstname").val()!=""){
    db.collection("submit").add({firstname:$("#firstname").val(),lastname:$("#lastname").val(),email:$("#email").val(),gender:$('input[name=optionsRadios]:checked').val(),detail:$("#detail").val()})
    .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            if(!isNaN(docRef.id.charAt(0))){
                delete_data(docRef)
                write_data()
            }
            location.reload();
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}else{
    alert("please enter your subject")
}
})
var data=[]

db.collection("submit").orderBy("gender")
.onSnapshot(function(snapshot) {
    data=[]
    data.push(snapshot.docs.filter(data=>{return data.data().gender==="ชาย"}).length)
    data.push(snapshot.docs.filter(data=>{return data.data().gender==="หญิง"}).length)
    data.push(snapshot.docs.filter(data=>{return data.data().gender==="อื่นๆ"}).length)
    console.log(data)
    draw_chart(data)
});

db.collection("submit").orderBy("gender")
    .onSnapshot(function(snapshot) {
        $("#contact .row").html("")
        snapshot.forEach(doc=>{
            console.log(typeof(doc.id))
            $("#contact .row").append(`
             <div class="col-md-4">
            <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">
              <div class="col-md-4">
              ${doc.data().firstname} 
              </div>
              <div class="col-md-4">
              ${doc.data().lastname}  
              </div>
              <div class="col-md-4">
              ${doc.data().gender} 
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-4">
              ${censoring(doc.data().email)} 
              </div>
              <div class="col-md-4"></div>
              </h3>
            </div>
              <div class="box-body"> 
              <div class="col-md-4"></div>
              <div class="col-md-4">

              <button class="btn btn-primary" data-toggle="modal" data-target="#${doc.id}">visit </button>

              <div class="modal fade" id="${doc.id}" role="dialog">
              <div class="modal-dialog">
              
                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Contact</h4>
                  </div>
                  <div class="modal-body">
                    <p>ชื่อ : ${doc.data().firstname}</p><br>
                    <p>นามสกุล : ${doc.data().lastname}</p><br>
                    <p>เพศ : ${doc.data().gender}</p><br>
                    <p>อีเมล์ : ${doc.data().email}</p><br>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
                
              </div>
            </div>

              <button class="btn btn-danger" id="delete" onclick="delete_data(${doc.id})">delete</button>

              </div>
              <div class="col-md-4"></div>
              </div> 
              </div>
              </div>`)
        });
    });

function write_data(){
    event.preventDefault()
    if($("#firstname").val()!=""){
    db.collection("submit").add({firstname:$("#firstname").val(),lastname:$("#lastname").val(),email:$("#email").val(),gender:$('input[name=optionsRadios]:checked').val(),detail:$("#detail").val()})
    .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}
}

function delete_data(id){
    console.log(typeof(id.id))
    db.collection("submit").doc(id.id).delete().then(function() {
        console.log("Document successfully deleted!");
        location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    })
}

function censoring(data){
    var data_x = data[0];
    for(var i = 1 ; i<data.length;i++){
        if(data[i]!="@" && data[i]!="."){
            data_x+="X"
        }else{
            data_x+=data[i]
        }
    }
    return data_x
}    

function draw_chart(data){
    console.log(data) 
var ctx = document.getElementById('pieChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type:'pie',

    // The data for our dataset
    data: {
        labels: ["ชาย","หญิง","อื่นๆ"],
        datasets: [{
            label: 'My First dataset',
            backgroundColor:[ 'rgb(2, 0, 243)','rgb(255, 99, 132)','rgb(3, 251, 0)'],
            borderColor: 'rgb(255, 255, 255)',
            data: data
        }]
    },

    // Configuration options go here
    options: {}
})
    }