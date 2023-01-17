// let chip = document.querySelector("#chip");
// let logo = document.querySelector("#FinFET_logo");

// chip.addEventListener("scroll", e => {
//     // console.log("scroll judge", e);
//     // console.log("scrollTop, scrollHeight, clientHeight", 
//     //     chip.scrollTop, chip.scrollHeight, chip.clientHeight);
//     // 测试发现，当开始滚动时
//     // scrollTop    scrollHeight    clientHeight
//     //      0           Y               X
//     // 滚动完成时
//     // scrollTop    scrollHeight    clientHeight
//     //     Y-X          Y               X
//     // 滚动时，只有scrollTop在改变，而Y和X取决于视窗

//     // 这样一来，只要 top/(Y-X) 就可以知道滚动位置的百分比了
//     // console.log(chip.scrollTop/(chip.scrollHeight-chip.clientHeight));

//     let pos = chip.scrollTop / (chip.scrollHeight - chip.clientHeight);
//     console.log(pos);
//     logo.style.height = `${200+pos*pos*pos*7000}px`;
// })
// 温馨提醒 上面的 id 以更换，仅看思路就好

let pageDom = document.querySelector(".page-main");
let logo = document.querySelector("#FinFET_logo");

pageDom.addEventListener("scroll", e => {
    let scrollPercent = pageDom.scrollTop / (pageDom.scrollHeight - pageDom.clientHeight);
    console.log(scrollPercent);
    logo.style.width = `${20 + scrollPercent*scrollPercent*scrollPercent*1000}vw`;
})