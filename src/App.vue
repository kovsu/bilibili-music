<script setup lang="ts">
import { ref } from 'vue'
import { getCid, getVideoSourceInfo, getBasicInfo } from './api'

const audioSrc = ref('')
// BV1VV4y1T77b
const bvid = ref('BV1Z14y1A768')
const title = ref('')
const desc = ref('')

async function Go() {
  const cid = await getCid(bvid.value)
  const info = await getBasicInfo(bvid.value)
  const { audioUrl } = await getVideoSourceInfo(bvid.value, cid)
  audioSrc.value = audioUrl
  title.value = info.title
  desc.value = info.desc
}
</script>

<template>
  <main>
    <input type="text" v-model="bvid" />
    <button @click="Go">Go</button>
    <div>
      <h2>{{ title }}</h2>
      <p>{{ desc }}</p>
    </div>

    <audio v-if="audioSrc !== ''" controls>
      <source :src="audioSrc" type="audio/mp4" />
    </audio>
  </main>
</template>

<style>
main {
  display: flex;
  gap: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
