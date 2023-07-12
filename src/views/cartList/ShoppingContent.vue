<template>
  <div class="border">
    <div
      class="border__content"
      v-for="(item, index) in result"
      :key="item.shopName"
    >
      <!-- 商店标题 -->
      <div class="border__title">{{ item.shopName }}</div>
      <!-- 商店内容 -->
      <template v-for="content in item.productList" :key="content._id">
        <div class="border__content__info">
          <img
            class="border__content__info__img"
            :src="content.imgUrl"
            alt=""
          />
          <div class="border__content__info__detail">
            <div class="border__content__info__detail__name">
              {{ content.name }}
            </div>
            <div class="border__content__info__detail__price">
              &yen; {{ content.price }} x {{ content.count }}
            </div>
            <div class="border__content__info__detail__total">
              &yen; {{ content.price * content.count }}
            </div>
          </div>
        </div>
      </template>
      <!-- 折叠 -->
      <div class="border__content__fold" v-if="true">
        <div>
          共计几件/几 kg
          <span
            class="iconfont"
            @click="
              () => {
                showAllItem(index)
              }
            "
            >&#xe65e;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'

const useCartListEffect = () => {
  const store = useStore()
  // const show = ref(false)
  // 获取购物车内容
  const cartList = store.state.cartList
  const result = reactive({})
  for (const i in cartList) {
    result[i] = cartList[i]
    // console.log(Object.keys(cartList[i].productList))
    // result[i].show = false
    if (Object.keys(result[i].productList).length > 2) {
      // result[i].show = true
    }
  }
  const showAllItem = (index) => {
    // const cartList = store.state.cartList
    // result[index] = cartList[index]
    // result[index].show = false
    // console.log('222', store.state.cartList)
  }
  // console.log(cartList)
  return { result, showAllItem }
}
export default {
  name: 'ShoppingContent',
  setup() {
    const { result, showAllItem } = useCartListEffect()
    return { result, showAllItem }
  }
}
</script>

<style lang="scss" scoped>
.border {
  box-sizing: border-box;
  padding: 0 0.18rem;
  width: 100%;
  background: #f5f5f5;
  position: absolute;
  top: 0.44rem;
  left: 0;
  bottom: 0.49rem;
  right: 0;
  &__content {
    margin-top: 0.16rem;
    background-color: #fff;
    box-sizing: border-box;

    &__info {
      display: flex;
      // position: absolute;
      &__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-bottom: 0.16rem;
        margin-left: 0.16rem;
      }
      &__detail {
        overflow: hidden;
        margin-left: 0.16rem;
        font-size: 0.14rem;
        flex: 1;
        position: relative;
        &__name {
          line-height: 0.2rem;
          color: #333;
        }
        &__price {
          margin: 0.06rem 0;
          line-height: 0.14rem;
          color: #e93b3b;
        }
        &__total {
          position: absolute;
          line-height: 0.14rem;
          right: 0.16rem;
          bottom: 0.22rem;
        }
      }
    }
    &__fold {
      height: 0.44rem;
      font-size: 0.14rem;
      color: #999;
      div {
        background-color: #f5f5f5;
        height: 0.28rem;
        margin: 0 0.16rem;
        margin-bottom: 0.16rem;
        line-height: 0.2rem;
        text-align: center;
      }
      .iconfont {
        margin-left: 0.08rem;
      }
      // position: relative;
      // bottom: 0.16rem;
    }
  }
  &__title {
    padding-top: 0.16rem;
    margin: 0.16rem;
    color: #333;
    font-size: 0.16rem;
    line-height: 0.22rem;
  }
}
</style>
