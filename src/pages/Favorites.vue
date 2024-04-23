<script setup>
import axios from 'axios'
import { ref, onMounted, inject, watch } from 'vue'

import CardList from '../components/CardList.vue'
import infoBlock from '../components/infoBlock.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const favorites = ref([])

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const deleteToFavorite = async (item) => {
  try {
    await axios.delete(`https://f21a43864d7634bd.mokky.dev/favorites/${item.favoriteId}`)
    favorites.value.splice(favorites.value.indexOf(item), 1)
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(
      `https://f21a43864d7634bd.mokky.dev/favorites?_relations=items`
    )

    favorites.value = data.map((obj) => ({
      ...obj.item,
      isFavorite: true,
      favoriteId: obj.id
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  cart.value = JSON.parse(localStorage.getItem('cart') || '[]')

  await fetchFavorites()

  favorites.value = favorites.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  favorites.value = favorites.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
</script>

<template>
  <div v-if="favorites.length !== 0">
    <h2 class="text-3xl font-bold mb-8">Мои закладки:</h2>

    <div class="mt-10">
      <CardList
        :items="favorites"
        @add-to-favorite="deleteToFavorite"
        @add-to-cart="onClickAddPlus"
      />
    </div>
  </div>
  <div class="mt-60" v-else>
    <infoBlock
      title="Закладок нет :("
      description="Вы ничего не добавляли в закладки"
      image-url="/emoji-1.png"
    />
  </div>
</template>