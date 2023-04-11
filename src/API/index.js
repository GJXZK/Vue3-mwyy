import requests from "./requests";

export const reqBannerList=()=> requests.get("/banner")

export const reqPersonalized=()=> requests.get("/personalized?limit=10")

export function reqSearchMusic(data,classifyId){
    return requests({
        methods:"GET",
        url:`/search?keywords=${data}&type=${classifyId}`
    })
}
export function reqMusicUrl(data){
    return requests({
        method:"GET",
        url:`/song/url/v1?id=${data}&level=lossless`
    })
}
// 获取歌曲详情
export function reqMusicDetail(data){
    return requests({
        method:'GET',
        url:`/song/detail?ids=${data}`
    })
}
// 获取歌单详情
export function reqSongListDetail(data){
    return requests({
        method:"GET",
        url:`/playlist/detail?id=${data}`
    })
}
// 获取歌单音乐列表
export function reqSongList(data){
    return requests({
        method:"GET",
        url:`/playlist/track/all?id=${data}`
    })
}
// 获取歌词
export function reqMusicLyric(data){
    return requests({
        method:'GET',
        url:`/lyric?id=${data}`
    })
}
// 获取歌曲评论
export function reqMusicComment(data){
    return requests({
        method:'GET',
        url:`/comment/music?id=${data}&limit=10`
    })
}
// 获取MV详情
export function reqMVDetail(data){
    return requests({
        method:"GET",
        url:`/mv/detail?mvid=${data}`
    })
}
export function reqMVUrl(data){
    return requests({
        method:'GET',
        url:`/mv/url?id=${data}`
    })
}
export function reqMVComments(data){
    return requests({
        method:"GET",
        url:`/comment/mv?id=${data}&limit=10`
    })
}
