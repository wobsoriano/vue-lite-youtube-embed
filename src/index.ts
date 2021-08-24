import {
    Vue2,
    isVue2
} from 'vue-demi'
import getIdFromUrl from 'get-youtube-id'
import VYoutube  from './VYoutube'

if (isVue2) {
    Vue2.prototype.$youtube = { getIdFromUrl }
}

export {
    VYoutube,
    getIdFromUrl
}