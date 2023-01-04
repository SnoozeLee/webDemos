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

        ceData.leftEnd = ceData.left0 + moveX;
        ceData.topEnd = ceData.top0 + moveY;
        cloneElement.style.left = `${ceData.left0 + moveX}px`;
        cloneElement.style.top = `${ceData.top0 + moveY}px`;

        let distance = Math.hypot(moveX, moveY);    // hypotenuse 直接三角形的斜边
        const base = 500;
        cloneElement.style.scale = (base+distance)/base;
    }
})

window.addEventListener("mouseup", (e)=>{

    if(isDragging) {
        if(inWallDetection(e.pageX)) {
            // 鼠标在wall内释放，则将图片放入wall
            document.getElementById("wall").appendChild(cloneElement);
            // 这个appendChild是会删掉cloneElement原来的父节点的(也就是说自动从#list里面删除了)
            cloneElement.style.left =  `${ceData.leftEnd-270}px`;
        }
        else {
            // 不在wall内释放，则删除这个节点
            document.getElementById("list").removeChild(cloneElement);
        }
        queue.shift()();
    }
    isDragging = false;

})

function inWallDetection(x) {
    // 目前先简单地用鼠标位置x判断
    if(x>270) {
        // 270 是写死的slide宽度
        return true;
    }
}

