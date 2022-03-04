import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";


const state = createStore({
    state: {
        musicId: [],
        musicImg: [],
        musicName: [],
        musicIndex: -1,
        musicPlay: 0,
        isPlay: false, //是否显示控件
        Playflag: true, // 暂停
        playMsg: 3, //播放方法
        searchList: [],
        SearchMusic: [],
        history: [], //历史数据
        user: {
            isLogin: false, // 是否登录
            msg: {}, //用户msg
            token: ""
        },
        isLoading: false // 是否加载loading

    },
    getters: {},
    actions: {},
    mutations: {
        load(state, load) {
            state.isLoading = load;
        },
        login(state, msg) {
            state.user.isLogin = true;
            state.user.msg = msg.profile;
            state.user.token = msg.token

        },
        getHistory(state, history) {
            if (history === 1) {
                state.history = [];
            } else {
                for (let i = 0; i <= state.history.length; i++) {
                    if (state.history[i] === history) {
                        state.history.splice(i, 1)
                    }
                }
                state.history.push(history)
            }
        },
        getSearchList(state, list) {
            state.searchList = list;
        },
        getSearchMusic(state, music) {
            state.SearchMusic = music;
        },
        musicId(state, id) {
            console.log(id);
            for (let i = 0; i <= state.musicId.length; i++) {
                if (state.musicId[i] === id) {
                    state.musicId.splice(i, 1);
                    state.musicImg.splice(i, 1);
                    state.musicName.splice(i, 1);
                }
            }
            state.musicId.push(id);
            state.musicIndex = state.musicId.length - 1
            state.musicPlay++;
        },
        musicImg(state, img) {
            state.musicImg.push(img);
        },
        musicName(state, name) {
            state.musicName.push(name);
        }
    },
    plugins: [createPersistedState()]

})

export default state