<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://f21a43864d7634bd.mokky.dev/favorites?_relations=items`
    )

    favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки:</h2>

  <div class="mt-10">
    <CardList :items="favorites" is-favorites />
  </div>
</template>