var STORSGE_KEY = 'StudyTimer';

var timerStorage = {
    fetch: function(){
        var timers = JSON.parse(
            localStorage.getItem(STORSGE_KEY) || '[]'
        )
        this.uid = timers.length;
        console.log(this.uid);
        return timers;
    },

    save: function(timer){
        localStorage.setItem(STORSGE_KEY,JSON.stringify(timer));
        timerStorage.uid++;
    },

};

var timerList = [];
var remove_button_list = [];


(function () {
    
    timerStorage.fetch().forEach(element => {
        timerList.push(new Timer(element.study,element.rest,element.id));
    });
    
    var currentTimeElement = document.getElementById('currentTime');
    setInterval(() => {
        var date = new Date();
        var str = date.getFullYear()
            + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
            + '/' + ('0' + date.getDate()).slice(-2)
            + '/' + ('0' + date.getHours()).slice(-2)
            + ':' + ('0' + date.getMinutes()).slice(-2)
            + ':' + ('0' + date.getSeconds()).slice(-2);
        currentTimeElement.innerHTML = str;
    }, 1000);


    for(var i = 0; i < timerList.length; ++i){
        var study = timerList[i].study;
        var rest = timerList[i].rest;
        var id = timerList[i].id;
        appendTable(study,rest,id);
    }

    function appendTable(study,rest,id) {
        var new_tr = document.createElement('tr');
        var study_td = document.createElement('td');
        var rest_td = document.createElement('td');
        var button_td = document.createElement('td');
        var button = document.createElement('button');
        var remove_button = document.createElement('button');
        var text = String(id);
        var timer = timerList[id];
        button.id = text;
        button.attr = 1;
        remove_button.id = text;
        
        
        study_td.appendChild(
            document.createTextNode(String(study) + '分')
        );
        rest_td.appendChild(
            document.createTextNode(String(rest) + '分')
        );
        button.appendChild(
            document.createTextNode('開始')
        );
        remove_button.appendChild(
            document.createTextNode('削除')
        )
        button.classList.add('btn','btn-primary');
        remove_button.classList.add('btn','btn-danger');
        button_td.appendChild(button);
        button_td.appendChild(remove_button);
        new_tr.appendChild(study_td);
        new_tr.appendChild(rest_td);
        new_tr.appendChild(button_td);
        document.getElementById('study-rest-time').appendChild(new_tr);
        button.addEventListener('click',function(){
            console.log(timer);
           var tmp = timer;
            tmp.setTimer();
            tmp.startCount();
            document.getElementById('modal-base').style.display = "block";
            this.attr = 0;
            
        });
        
        remove_button.addEventListener('click',function(){
            console.log(this.id);
            timerList.splice(Number(this.id),1);
            remove_button_list.splice(Number(this.id),1);
            var parent = document.getElementById('study-rest-time');
            var child = parent.childNodes[Number(this.id)];
            parent.removeChild(child);
            for(var i = 0; i < timerList.length; ++i){
                timerList[i].id = i;
            }
            for(var i = 0;i < remove_button_list.length; ++i){
                remove_button_list[i].id = String(i);
            }

            timerStorage.save(timerList);
            


        });
        remove_button_list.push(remove_button);
        
    }

    function createInstance(study, rest) {
        var num_stu = study.value;
        var num_res = rest.value;
        var id = timerStorage.uid || 0;
        console.log(id);
        var timer = new Timer(num_stu,num_res,id);
        timerList.push(timer);
        timerStorage.save(timerList);
        console.log(timerList)
        appendTable(num_stu,num_res,id);

    }

    function createButton() {
        var study = document.getElementById('study');
        var rest = document.getElementById('rest');
       createInstance(study,rest);

    }

    

    document.getElementById('stop-button').addEventListener('click',function(){
        timerList.forEach((elem) => {
            if(elem.state === 1){
                elem.stopCount();
            }
        })
    })

    document.getElementById('confirm-button').addEventListener('click',function(e){
        e.preventDefault();
        /*
        var n = new Notification('hello',{
            body : 'こんな感じの通知です',
            
        });
        */
        createButton();
        console.log('event');
    },false);
})();