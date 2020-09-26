class Timer {
    constructor(study, rest,id) {
        this.study = study;
        this.rest = rest;
        this.id = id;
        this.state = 0;
    }

    getTime(){
        var str = '勉強時間: ' + String(this.study) + '分 ' + '休憩時間: ' +  String(this.rest) + '秒';
        return str;
    }
    startCount(){
        this.state = 1;

        var self = this;

        function asyncCountdown(study){
            return new Promise((resolve,reject) => {
                var timer = setInterval(() => {
                    if(self.state === 0){
                        clearInterval(timer);
                        reject();
                    }else{
                        study--;
                        console.log('残り' + String(study));
                        if(study === 0){
                            clearInterval(timer);
                            resolve();
                        }
                    }
                },1000);
            })
        }

        function asyncStudyRestCountdown(study,rest,cycle){
            asyncCountdown(study).then(response => {
                return asyncCountdown(rest);
            },
            error => {
                console.log('カウントダウン終了');
            }).then(response => {
                console.log(cycle + 'サイクル終了');
                cycle++;
                asyncStudyRestCountdown(study,rest,cycle);
            },
            error => {
                console.log('カウントダウン終了');
            })
        }

        var cycle = 0;
        var study = this.study;
        var rest = this.rest;
        study *= 10;
        rest *= 10;
        asyncStudyRestCountdown(study,rest,cycle);
        
        console.log('終了');
    }
    stopCount(){
        this.state = 0;
    }
    
    
}