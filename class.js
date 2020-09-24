class Timer {
    constructor(minute, second) {
        this.minute = minute;
        this.second = second;
        this.cycle = 0;
    }

    getTime(){
        var str = String(this.minute) + '分' + String(this.second) + '秒';
        return str;
    }
}