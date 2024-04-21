<script setup>
import Card from './Card.vue'
</script>

<template>
  <div class="p-10">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
    <div class="grid grid-cols-4 gap-5">
      <Card
        title="Мужские Кроссовки Nike Blazer Mid Suede"
        image-url="/sneakers/sneakers-1.jpg"
        :price="1200"
        :is-added="true"
				:is-favorite="true"
      />
    </div>
  </div>
</template>