function remSize(){
    // 获取设备宽度
    var devicWidth = document.documentElement.clientWidth || window.innerWidth
    if(devicWidth >= 750){
        devicWidth = 750
    }
    if(devicWidth <= 320){
        devicWidth=320
    }
    // 750px 1rem==>100px  375px 1rem==>50px
    document.documentElement.style.fontSize = (devicWidth/7.5)+'px'
    // 设置字体大小
    document.querySelector("body").style.fontSize=0.3+"rem"
}
remSize()

window.onresize=function(){
    remSize()
}