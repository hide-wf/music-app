// https://neteasecloudmusicapi.vercel.app
import axios from "axios";
import store from "../store/index";

export function request(config) {
    const instance = axios.create({
            baseURL: "https://autumnfish.cn",
            timeout: 8000
        })
        // instance.interceptors.request.use((config) => {
        //     console.log(config);
        //     return config
        // })
    instance.interceptors.request.use((config) => {
        console.log("qqq");
        // 不需要loading
        if (!config.url.includes("/search/suggest?keywords=")) {
            store.commit("load", true);
            return config;
        }
    }, (err) => {
        console.log("请求错误");
        store.commit("load", false);
        return Promise.reject(err);
    }); // 请求错误关掉loading
    instance.interceptors.response.use((res) => {
        store.commit("load", false);
        return res
    })

    return instance(config);

}