import { defineComponent } from 'vue-demi'
import h from './utils'

type imgResolution =
  | "default"
  | "mqdefault"
  | "hqdefault"
  | "sddefault"
  | "maxresdefault";

export default defineComponent({
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        activatedClass: {
            type: String,
            required: false,
            default: 'lyt-activated'
        },
        adNetwork: {
            type: Boolean,
            required: false,
            default: false
        },
        iframeClass: {
            type: String,
            required: false,
            default: ''
        },
        noCookie: {
            type: Boolean,
            required: false,
            default: false
        },
        params: {
            type: String,
            required: false,
            default: ''
        },
        playerClass: {
            type: String,
            required: false,
            default: 'lty-playbtn'
        },
        playlist: {
            type: Boolean,
            required: false,
            default: false
        },
        playlistCoverId: {
            type: String,
            required: false,
            default: ''
        },
        poster: {
            type: String,
            required: false,
            default: 'hqdefault'
        },
        wrapperClass: {
            type: String,
            required: false,
            default: 'yt-lite'
        }
    },
    data: () => ({
        preconnected: false,
        iframe: false
    }),
    computed: {
        videoId() {
            return encodeURIComponent(this.id)
        },
        paramsImp() {
            return `&${this.params}`
        },
        posterUrl() {
            const videoPlaylisCovertId = typeof this.playlistCoverId === 'string' ? encodeURIComponent(this.playlistCoverId) : null
            return !this.playlist
            ? `https://i.ytimg.com/vi/${this.videoId}/${this.poster}.jpg`
            : `https://i.ytimg.com/vi/${videoPlaylisCovertId}/${this.poster}.jpg`;
        },
        ytUrl() {
            return this.noCookie ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
        },
        iframeSrc() {
            return !this.playlist
            ? `${this.ytUrl}/embed/${this.videoId}?autoplay=1${this.paramsImp}`
            : `${this.ytUrl}/embed/videoseries?autoplay=1&list=${this.videoId}${this.paramsImp}`;
        },
    },
    emits: ['iframeAdded'],
    methods: {
        warmConnections() {
            if (this.preconnected) return
            this.preconnected = true
        },
        addIframe() {
            if (this.iframe) return
            this.$emit('iframeAdded')
            this.iframe = true
        }
    },
    render() {
        return h('link', {
            rel: 'preload',
            href: 'posterUrl',
            as: 'image'
        }, [
            h('div', )
        ])
    }
})