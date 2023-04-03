import requests from "./requests";

export const reqBannerList=()=> requests.get("/banner")

export const reqPersonalized=()=> requests.get("/personalized?limit=10")

export function reqSearchMusic(data){
    return requests({
        methods:"GET",
        url:`/search?keywords=${data}`
    })
}
export function reqMusicUrl(data){
    return requests({
        method:"GET",
        url:`/song/url/v1?id=${data}&level=exhigh`
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
        url:`/playlist/track/all?id=${data}&limit=20&offset=1`
    })
}
// 获取歌词
export function reqMusicLyric(data){
    return requests({
        method:'GET',
        url:`/lyric?id=${data}`
    })
}
