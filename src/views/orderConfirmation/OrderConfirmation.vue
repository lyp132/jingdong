<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <order />
  </div>
</template>
<script>
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import Order from './Order.vue'
export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductList, Order },
  setup() {}
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #eee;
  overflow-y: scroll;
}
</style>
