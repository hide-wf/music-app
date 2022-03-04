// https://neteasecloudmusicapi.vercel.app
import axios from "axios";
import store from "../store/index";

export function request(config) {
    const instance = axios.create({
            baseURL: "http://localhost:3000/",
            timeout: 8000
        })
        // instance.interceptors.request.use((config) => {
        //     console.log(config);
        //     return config
        // })
    instance.interceptors.request.use((config) => {
        // 不需要loading
        if (config.url.includes("/search/suggest?keywords=")) {
            return config;
        } else {
            store.commit("load", true);
            return config;
        }
    }, (err) => {
        store.commit("load", false);
        return Promise.reject(err);
    }); // 请求错误关掉loading
    instance.interceptors.response.use((res) => {
        store.commit("load", false);
        return res
    })

    return instance(config);

}