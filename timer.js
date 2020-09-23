
(function () {
    var currentTimeElement = document.getElementById('currentTime');
    setInterval(() => {
        var date = new Date();
        var str = date.getFullYear()
            + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
            + '/' + ('0' + date.getDate()).slice(-2)
            + '/' + ('0' + date.getHours()).slice(-2)
            + '/' + ('0' + date.getMinutes()).slice(-2)
            + '/' + ('0' + date.getSeconds()).slice(-2);
        currentTimeElement.innerHTML = str;
    }, 1000);
})();