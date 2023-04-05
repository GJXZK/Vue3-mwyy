import { createStore } from 'vuex'
import { reqMusicUrl,reqMusicLyric } from '@/API'
export default createStore({
    state:{
        musicList: [],//歌曲播放列表 只存id 方便播放
        ListMusicDetail:[],//歌曲播放列表 存入整个歌曲 用于歌曲列表界面
        playingIndex: 0,//歌曲播放到哪个了
        playingMusicId:'',//播放歌曲的ID
        playingMusicUrl: '', //播放歌曲的URL
        currentTime:0,//歌曲播放到第几秒
        lyricList:{},  //歌词
        isPlaying:false
    },
    mutations : {
        pushMusicList: function (state, value) {
            state.musicList.unshift(value)
        },
        pushListMusicDetail:function(state,value){
            state.ListMusicDetail.unshift(value)
        },
        updateListMusicDetail:function(state,value){
            state.ListMusicDetail=value
        },
        updatePlayListIndex: function (state, value) {
            state.playingIndex=value
        },
        updataPlayMsUrl:function(state,value){
            state.playingMusicUrl=value
        },
        updataPlayMusicId:function(state,value){
            state.playingMusicId=value
        },
        updataCurrentTime:function(state,value){
            state.currentTime=value
        },
        updateLyricList:function(state,value){
            state.lyricList=value
        },
        updateisPlaying:function(state,value){
            state.isPlaying=value
        }
    },
    actions : {
        // 获取歌曲细节
        getPlayMuUrl(commit,id){
            reqMusicUrl(id).then((res)=>{
                this.commit("updataPlayMsUrl",res.data[0].url)
            })
        },
        reqMusicLyric(commit,id){
            reqMusicLyric(id).then((res)=>{
                this.commit("updateLyricList",res.lrc)
            })
        }
    },
    modules: {}
})