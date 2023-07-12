<template>
  <div class="title">我的全部购物车（222）</div>
  <ShoppingContent />
  <Docker :currentIndex="1" />
</template>

<script>
import Docker from '../../components/Docker.vue'
import ShoppingContent from './ShoppingContent.vue'
export default {
  name: 'CartList',
  components: { Docker, ShoppingContent }
}
</script>

<style lang="scss" scoped>
.title {
  line-height: 0.44rem;
  font-size: 0.16rem;
  text-align: center;

  color: #333;
}
</style>
