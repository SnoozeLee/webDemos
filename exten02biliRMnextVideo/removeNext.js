
setInterval(()=>{
    // 删掉侧边栏的视频推荐
    const sidebarRecommendations = document.querySelectorAll(".video-page-card-small");
    sidebarRecommendations.forEach( el => { el.remove() });

    // 看完视频后视频上方的的推荐
    const videoRecommendationBox = document.querySelector(".bpx-player-ending-related");
    videoRecommendationBox.remove();
}, 200)

