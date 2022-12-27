/*!
 * Original code by Ibrahim Cesar
 * MIT Licensed, Copyright 2022 Ibrahim Cesar, see https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/LICENSE for details
 *
 * Credits to the team:
 * https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/src/lib/index.tsx
 */
import type { PropType } from 'vue-demi'
import { computed, defineComponent, ref } from 'vue-demi'
import h from './utils'
import './main.css'

const linkPreconnect = (href: string) => h('link', { rel: 'preconnect', href })

type imgResolution =
  | 'default'
  | 'mqdefault'
  | 'hqdefault'
  | 'sddefault'
  | 'maxresdefault'

export default defineComponent({
  props: {
    announce: {
      type: String,
      required: false,
      default: 'Watch',
    },
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    activatedClass: {
      type: String,
      required: false,
      default: 'lyt-activated',
    },
    adNetwork: {
      type: Boolean,
      required: false,
      default: true,
    },
    iframeClass: {
      type: String,
      required: false,
      default: '',
    },
    cookie: {
      type: Boolean,
      required: false,
      default: false,
    },
    params: {
      type: String,
      required: false,
      default: '',
    },
    playerClass: {
      type: String,
      required: false,
      default: 'lty-playbtn',
    },
    playlist: {
      type: Boolean,
      required: false,
      default: false,
    },
    playlistCoverId: {
      type: String,
      required: false,
      default: '',
    },
    poster: {
      type: String as PropType<imgResolution>,
      required: false,
      default: 'hqdefault',
    },
    wrapperClass: {
      type: String,
      required: false,
      default: 'yt-lite',
    },
    muted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['iframeAdded'],
  setup(props, { emit }) {
    const preconnected = ref(false)
    const iframe = ref(false)

    const videoId = computed(() => encodeURIComponent(props.id))
    const posterUrl = computed(() => {
      const videoPlaylisCoverId
        = typeof props.playlistCoverId === 'string'
          ? encodeURIComponent(props.playlistCoverId)
          : null
      return !props.playlist
        ? `https://i.ytimg.com/vi/${videoId.value}/${props.poster}.jpg`
        : `https://i.ytimg.com/vi/${videoPlaylisCoverId}/${props.poster}.jpg`
    })
    const ytUrl = computed(() => props.cookie
      ? 'https://www.youtube.com'
      : 'https://www.youtube-nocookie.com')
    const mutedImp = computed(() => props.muted ? '&mute=1' : '')
    const iframeSrc = computed(() => !props.playlist
      ? `${ytUrl.value}/embed/${videoId.value}?autoplay=1&state=1${mutedImp.value}&${props.params}`
      : `${ytUrl.value}/embed/videoseries?autoplay=1&list=${videoId.value}${mutedImp.value}&${props.params}`)

    function addIframe() {
      if (iframe.value)
        return
      emit('iframeAdded')
      iframe.value = true
    }

    function warmConnections() {
      if (preconnected.value)
        return
      preconnected.value = true
    }

    return () => [
      h('link', {
        rel: 'preload',
        href: posterUrl.value,
        as: 'image',
      }),
      preconnected.value ? linkPreconnect(ytUrl.value) : null,
      preconnected.value ? linkPreconnect('https://www.google.com') : null,
      props.adNetwork ? linkPreconnect('https://static.doubleclick.net') : null,
      props.adNetwork
        ? linkPreconnect('https://googleads.g.doubleclick.net')
        : null,
      h(
        'div',
        {
          'on': {
            pointerover: warmConnections,
            click: addIframe,
          },
          'class': `${props.wrapperClass} ${iframe.value && props.activatedClass}`,
          'data-title': props.title,
          'style': {
            backgroundImage: `url(${posterUrl.value})`,
          },
          'tabIndex': 0,
        },
        [
          // Play button
          h('button', {
            class: props.playerClass,
            ariaLabel: `${props.announce} ${props.title}`,
          }),
          // Iframe
          iframe.value
            ? h('iframe', {
              class: props.iframeClass,
              title: props.title,
              width: 560,
              height: 315,
              frameborder: 0,
              allow:
                  'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
              allowfullscreen: true,
              src: iframeSrc.value,
            })
            : null,
        ],
      ),
    ]
  },
})
