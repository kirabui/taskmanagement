var up = new Vue({
  el: '#vup',
  data: {

    session: '',
    param: {duefr: '', dueto: '', taskid: ''},
    found: '',
    date:'',
    te: '',
    str: '',
    update: {taskid: '', stat: '', due: ''},
  },
  created: function(){

        this.getinfosession();




    },
  methods: {


    getinfosession: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

              var obj = JSON.parse(this.response);
              up.session= obj.user;
             // mana.session2.push(mana.session);

              console.log(this.responseText);
              console.log(JSON.stringify(up.session));


            }else if (this.readyState == 4 && this.status == 403) {
               alert("you are not logged in");
               window.location.href = "index.html";
            }
        };
        xhttp.open("GET", "/users/getsession", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },

   find: function() {

        //param: {duefr: '', dueto: '', taskid: ''},
        if (up.param.taskid == '' && up.param.duefr == '' && up.param.dueto == '' ){
            alert('You need to have some input');
            console.log(up.param.duefr);

        }else if ( ((up.param.duefr == '' && up.param.dueto == '') && up.param.taskid != '') || (up.param.taskid == '' && (up.param.duefr != '' && up.param.dueto != '')) )
        {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

              up.found = JSON.parse(this.response);
              //modification
              //slicing the date
                console.log(this.responseText);
              for(i=0;i<up.found.length;i++){
                up.date = JSON.stringify(up.found[i].due_date);
                //console.log(up.date);
                up.te = up.date.replace("T00:00:00.000Z","");
                //console.log(up.te);
                up.found[i].due_date = JSON.parse(up.te);
              }
                up.date= '';
                up.te = '';
                //slicing date assigned
                          for(i=0;i<up.found.length;i++){
                          up.date = JSON.stringify(up.found[i].date_assigned);
                          //console.log(up.date);
                          up.te = JSON.stringify(up.date.slice(1,11));
                          //console.log(up.te);
                          up.found[i].date_assigned = JSON.parse(up.te);
                        }
                        //clear varible
                          up.date= '';
                          up.te = '';
              //end modify

              //console.log(this.responseText);
              console.log(JSON.stringify(up.found));


            }
        };
        xhttp.open("POST", "/users/gofind", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify(up.param));
        xhttp.send(JSON.stringify(up.param));
        }

    },

    pro: function(){
         //update: {taskid: '', stat: '', due: ''},
         if (up.update.taskid == ''){
           alert("You need to enter taskid");
         }else if (up.update.stat == '' && up.update.due == ''){
           alert("No information to update");
         }else if (up.update.stat == ''){
           delete up.update.stat;
           up.upp();
         }else if (up.update.due == ''){
           delete up.update.due;
           up.upp();
         }else{
            up.upp();
         }

    },

   upp: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("update successfully!");
                window.location.href = "searchtask.html";

            }else if (this.readyState == 4 && this.status == 500) {
               alert("Some problem occurred");
            }
        };
        xhttp.open("POST", "/users/update", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(up.update));
    },






    logout: function() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                      alert("log-out successfully");
                      window.location.href = "index.html";
                }
            };
            xhttp.open("GET", "/logout", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },

  }
});

