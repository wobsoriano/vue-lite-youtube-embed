<div align="center">
    <h1>📺  Vue Lite YouTube Embed</h1>
    <blockquote>A private by default, faster and cleaner YouTube embed component for Vue applications</blockquote>
    <strong>Port of [React Lite YouTube Embed](https://github.com/ibrahimcesar/react-lite-youtube-embed) to a Vue Component. Provide videos with a supercharged focus on visual performance. The gain is not the same as the web component of the original implementation but saves some requests and gives you more control of the embed visual. An ["Adaptive Loading"](https://www.youtube.com/watch?v=puUPpVrIRkc) way to handle iframes for YouTube.</strong>
</div>

## Installation

```sh
yarn add vue-lite-youtube-embed
```

## Usage

```html
<template>
  <LiteYouTubeEmbed id="dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up (Official Music Video)" />
</template>

<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
</script>
```

## Props

Only two props are required to work: `id` from the YouTube you want to render and `title`

| Prop   |      Type      |  Description |
|----------|:--------:|------------|
| **id** |  string | id of the video or playlist |
| **title** |    string   | Here goes your video title. Always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;) #a11y |
| announce |    string   | Default: `Watch`. This will be passed to the button in order to be announced to the final user as in `Clickable Watch, ${title}, button` , customize to match your own language #a11y #i18n |
| activeClass | string | Pass the string class for the active state |
| adNetwork | boolean | Default: `false`  To preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google) |
| cookie | boolean |    Default: `false` Connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com You should opt-in to allow cookies|
| iFrameClass | string |    Pass the string class for the own iFrame |
| noCookie | boolean |    `Deprecated` Default `false` _use option **cookie** to opt-in_|
| params | string |    any params you want to pass to the URL in the iFrame. Two important things to notice: You can assume you just need to add the params, we already setup for you, so you should write `start=1150` and not `?start=1150` or `&start=1150`. You can place more params but it will need to fully form: `start=1150&other=value&another=value`. First, when you share a YouTube url the param of time is just `t`, but the embed needs `start`.|
| playerClass | string | Pass the string class for the player, once you can customize it |
| playlist | boolean |    Use `true` when your id be from a playlist |
| playlistCoverId | string | The ids for playlists did not bring the cover in a pattern to render so you'll need pick up a video from the playlist (or in fact, whatever id) and use to render the cover. There's a programmatic way to get the cover from YouTube API v3 but the aim of this component is do not make any another call and reduce requests and bandwidth usage as much as possibe  |
| poster | string. One of `default` `mqdefault`  `hqdefault` `sddefault` `maxresdefault` |   Defines the image size to call on first render as poster image. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api |
| wrapperClass | string |   Pass the string class that wraps the iFrame |
| onIframeAdded | function | Callback that will be called when iframe is added |