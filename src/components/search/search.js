import { request } from '../../api/request';
import $store from "../../store/index";
import router from "../../router/index";

export function search(name) {
    request("/cloudsearch?keywords=" + name).then((res) => {
        $store.commit("getSearchMusic", res.data.result.songs);
        router.replace("/search/searchMain");
    })
}