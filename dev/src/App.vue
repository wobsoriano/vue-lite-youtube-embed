<script setup lang="ts">
import { ref } from 'vue'
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

interface HTMLIFrameElementWithActions extends HTMLIFrameElement {
  getPlayerInstance: () => HTMLIFrameElement
  stopVideo: () => void
  playVideo: () => void
  pauseVideo: () => void
}

const iframe = ref<HTMLIFrameElementWithActions | null>(null)
</script>

<template>
  <LiteYouTubeEmbed
    id="dQw4w9WgXcQ"
    ref="iframe"
    title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
  />
  <div v-if="iframe">
    <button @click="iframe?.stopVideo">
      Stop iframe element
    </button>
    <button @click="iframe?.playVideo">
      Play iframe element
    </button>
    <button @click="iframe?.pauseVideo">
      Pause iframe element
    </button>
  </div>
</template>
