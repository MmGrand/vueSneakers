<script setup>
import axios from 'axios'
import { ref, inject, computed } from 'vue'

import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import infoBlock from './infoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart, closeDrawer } = inject('cart')

const isCreating = ref(false)
const orderId = ref(null)

const cartIsEmpty = computed(() => cart.value.length === 0)

const buttonDissabled = computed(() => (isCreating.value || cartIsEmpty.value ? true : false))

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post(`https://f21a43864d7634bd.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })

    cart.value = []

    orderId.value = data.id
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}
</script>

<template>
  <div @click="closeDrawer" class="fixed z-10 top-0 left-0 h-full w-full bg-black opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <infoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />

      <infoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ №${orderId} скоро будет передан курьерской доставке`"
        image-url="/order-success-icon.png"
      />
    </div>
    <div v-else>
      <CartItemList />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} ₽</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} ₽</b>
        </div>

        <button
          :disabled="buttonDissabled"
          @click="createOrder"
          class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>