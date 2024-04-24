<template>
  <div class="flex justify-center items-center mt-40">
    <div
      class="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full"
      role="status"
    >
      <span class="visually-hidden">Загрузка...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner'
}
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spinner-border {
  border-color: transparent;
  border-top-color: rgb(203, 255, 83); /* Синий цвет, можно изменить */
  border-right-color: rgb(203, 255, 83); /* Синий цвет, можно изменить */
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
