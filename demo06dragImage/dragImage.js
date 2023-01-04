let isDragging = false;
let cloneElement = null;
let ceData = {};    // cloneElementData
let queue = [];     // 用来存一些需要稍后执行的函数

// 注意，使用 document.getElementsByClassName 是获得一个数组，如果想添加事件需要逐一操作，不如使用 #list + 判断class 来操作
document.getElementById("list").addEventListener("mousedown", (e)=>{
    // console.log(e.target);
    e.preventDefault();
    if(e.target.classList.contains("item")) {
        console.log("选中item了");
        isDragging = true;

        cloneElement = e.target.cloneNode(true);
        // e.target.parentNode就是 #list节点
        e.target.parentNode.appendChild(cloneElement);
        cloneElement.classList.add("flutter");

        ceData.pageX0 = e.pageX;
        ceData.pageY0 = e.pageY;
        ceData.offsetX0 = e.offsetX;
        ceData.offsetY0 = e.offsetY;
        ceData.left0 = e.pageX - e.offsetX;
        ceData.top0 = e.pageY - e.offsetY;

        e.target.classList.add("hide");
        queue.push(()=>{
            e.target.classList.remove("hide")
        })
    }
})

window.addEventListener("mousemove", (e)=>{
    // console.log(e);
    if(isDragging) {
        let moveX = e.pageX - ceData.pageX0;
        let moveY = e.pageY - ceData.pageY0;

        cloneElement.style.left = `${ceData.left0 + moveX}px`;
        cloneElement.style.top = `${ceData.top0 + moveY}px`;
    }
})

window.addEventListener("mouseup", (e)=>{
    isDragging = false;
})

function doit() {
    // 测试按钮，目前用来检验 queue队列执行方法
    console.log("doit");
    queue.shift()();
}

