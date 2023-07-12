<template>
  <div class="docker">
    <template v-for="(item, index) in dockerList" :key="item.icon">
      <div
        :class="[
          { docker__item: true },
          { 'docker__item--active': index == currentIndex }
        ]"
      >
        <router-link :to="item.to">
          <div class="iconfont" v-html="item.icon"></div>
          <div class="docker__title">{{ item.title }}</div>
        </router-link>
      </div>
    </template>
  </div>
</template>
<script>
import { reactive } from 'vue'
const useChooseDocker = () => {
  const dockerList = reactive([
    {
      icon: '&#xe600;',
      title: '首页',
      to: { name: 'Home' }
    },
    {
      icon: '&#xe63c;',
      title: '购物车',
      to: { name: 'CartList' }
    },
    {
      icon: '&#xe605;',
      title: '订单',
      to: { name: 'Home' }
    },
    {
      icon: '&#xe660;',
      title: '我的',
      to: { name: 'Home' }
    }
  ])

  return { dockerList }
}
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup() {
    // const navigation = ref(true)

    const { dockerList, chooseDocker, navigation } = useChooseDocker()

    return { dockerList, chooseDocker, navigation }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.docker {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid $ocntent-bgColor;
  color: $content-fontcolor;

  &__item {
    flex: 1;
    text-align: center;
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
    .iconfont {
      font-size: 0.2rem;
      margin: 0.05rem 0 0.03rem 0;
    }

    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }

  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
