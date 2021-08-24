import { defineComponent } from 'vue'
import player from 'youtube-player'
import type { YouTubePlayer } from 'youtube-player/dist/types'
import h from './utils'

const UNSTARTED = -1
const ENDED = 0
const PLAYING = 1
const PAUSED = 2
const BUFFERING = 3
const CUED = 5

const emits = [
    'ready', 
    'error', 
    'unstarted', 
    'playing', 
    'paused', 
    'ended', 
    'buffering', 
    'cued'
]

interface LoadVideoOptions {
    videoId: string,
    startSeconds?: number | undefined,
    endSeconds?: number | undefined,
    suggestedQuality?: string | undefined,
}

export default defineComponent({
    name: 'Youtube',
    props: {
      videoId: String,
      playerVars: {
        type: Object,
        default: () => ({})
      },
      height: {
        type: Number,
        default: 360
      },
      width: {
        type: Number,
        default: 640
      },
      resize: {
        type: Boolean,
        default: false
      },
      resizeDelay: {
        type: Number,
        default: 100
      },
      fitParent: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        player: {} as YouTubePlayer,
        events: {
          [UNSTARTED]: 'unstarted',
          [PLAYING]: 'playing',
          [PAUSED]: 'paused',
          [ENDED]: 'ended',
          [BUFFERING]: 'buffering',
          [CUED]: 'cued'
        },
        resizeTimeout: null as null | number
      }
    },
    computed: {
      aspectRatio () {
        return this.width / this.height
      }
    },
    emits,
    methods: {
      playerReady (e: CustomEvent) {
        this.$emit('ready', e.target)
      },
      playerStateChange (e: CustomEvent & { data: number }) {
        if (e.data !== null && e.data !== UNSTARTED) {
          // @ts-ignore
          this.$emit(this.events[e.data], e.target)
        }
      },
      playerError (e: CustomEvent) {
        this.$emit('error', e.target)
      },
      updatePlayer (videoId: string) {
        if (!videoId) {
          this.player.stopVideo()
          return
        }
  
        const params = {
            videoId
        } as LoadVideoOptions
  
        if (typeof this.playerVars.start === 'number') {
          params.startSeconds = this.playerVars.start
        }
  
        if (typeof this.playerVars.end === 'number') {
          params.endSeconds = this.playerVars.end
        }
  
        if (this.playerVars.autoplay === 1) {
          this.player.loadVideoById(params)
          return
        }
  
        this.player.cueVideoById(params)
      },
      resizeProportionally () {
        const iframe = this.player.getIframe()
        const width = this.fitParent
            ? iframe?.parentElement?.offsetWidth
            : iframe.offsetWidth
        if (width) {
            const height = width / this.aspectRatio
            this.player.setSize(width, height)
        }
      },
      onResize () {
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout)
        this.resizeTimeout = setTimeout(
          this.resizeProportionally,
          this.resizeDelay
        )
      }
    },
    watch: {
      videoId: 'updatePlayer',
      resize (val) {
        if (val) {
          window.addEventListener('resize', this.onResize)
          this.resizeProportionally()
        } else {
          window.removeEventListener('resize', this.onResize)
          this.player.setSize(Number(this.width), Number(this.height))
        }
      },
      width (val: number) {
        this.player.setSize(val, Number(this.height))
      },
      height (val: number) {
        this.player.setSize(Number(this.width), val)
      }
    },
    beforeDestroy () {
      if (this.player !== null && this.player.destroy) {
        this.player.destroy()
      }
  
      if (this.resize) {
        window.removeEventListener('resize', this.onResize)
      }
    },
    mounted () {
      (window as any).YTConfig = {
        host: 'https://www.youtube.com/iframe_api'
      }
  
      this.player = player(this.$el, {
        width: this.width,
        height: this.height,
        videoId: this.videoId,
        playerVars: this.playerVars
      })
  
      this.player.on('ready', this.playerReady)
      this.player.on('stateChange', this.playerStateChange)
      this.player.on('error', this.playerError)
  
      if (this.resize) {
        window.addEventListener('resize', this.onResize)
      }
  
      if (this.fitParent) {
        this.resizeProportionally()
      }
    },
    render () {
      return h('div')
    }
})