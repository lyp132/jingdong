<template>
  <div class="border">
    <template v-for="item in notEmptyCartList" :key="item.shopName">
      <div
        class="border__content"
        v-if="Object.keys(item.productList).length > 0"
      >
        <!-- 商店标题 -->
        <div class="border__title">{{ item.shopName }}</div>
        <!-- 商店内容 -->
        <template v-for="content in item.productList" :key="content._id">
          <div
            class="border__content__info"
            v-show="content.number < item.showhidden"
          >
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
        <div
          class="border__content__fold"
          v-if="Object.keys(item.productList).length > item.showhidden"
        >
          <div>
            共计几件/几 kg
            <span
              class="iconfont"
              @click="
                () => {
                  showAllItem(item)
                }
              "
              >&#xe65e;</span
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { useStore } from 'vuex'

const useCartListEffect = () => {
  const store = useStore()
  // 获取购物车内容
  const cartList = store.state.cartList
  const notEmptyCartList = {}

  const setShowHidden = (showhidden, shopId) => {
    store.commit('setShowHidden', { showhidden, shopId })
  }
  // // 为每一项商品排序
  // const n = Object.keys(cartList)
  // for (const key in n) {
  //   // shopInfo.productList[n[key]].number = Number(key)
  //   notEmptyCartList[n[key]] = cartList[n[key]]
  //   setShowHidden(2, n[key])
  // }
  // console.log('notEmptyCartList', notEmptyCartList)

  // 为每一项商品排序
  for (const key in cartList) {
    // shopInfo.productList[n[key]].number = Number(key)
    notEmptyCartList[key] = cartList[key]
    setShowHidden(2, key)
  }

  const showAllItem = (item) => {
    item.showhidden = Object.keys(item.productList).length
    setShowHidden(Object.keys(item.productList).length, item.shopId)
  }
  console.log(notEmptyCartList)

  return { notEmptyCartList, showAllItem }
}

export default {
  name: 'ShoppingContent',
  setup() {
    const { notEmptyCartList, showAllItem } = useCartListEffect()
    return { notEmptyCartList, showAllItem }
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
