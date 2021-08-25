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
      const iframe = this.iframe ? h('iframe', {
        class: `${this.iframeClass}`,
        title: this.title,
        width: 560,
        height: 315,
        frameBorder: 0,
        allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
        allowFullsreen: true,
        src: this.iframeSrc
      }) : null

      return ([
        h('link', {
          rel: 'preload',
          href: this.posterUrl,
          as: 'image'
        }),
        this.preconnected ? h('link', { rel: 'preconnect', href: this.ytUrl }) : null,
        this.preconnected ? h('link', { rel: 'preconnect', href: 'https://www.google.com' }) : null,
        this.adNetwork ? h('link', { rel: 'preconnect', href: 'https://static.doubleclick.net' }) : null,
        this.adNetwork ? h('link', { rel: 'preconnect', href: 'https://googleads.g.doubleclick.net' }) : null,
        h('div', {
          on: {
            pointover: this.warmConnections,
            click: this.addIframe,
          },
          class: `${this.wrapperClass} ${this.iframe && this.activatedClass}`,
          'data-title': this.title,
          style: {
            backgroundImage: `url(${this.posterUrl})`
          },
          tabIndex: 0
        }, [
          h('button', { class: `${this.playerClass}` }),
          iframe
        ])
      ])
    }
})