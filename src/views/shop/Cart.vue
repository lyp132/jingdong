<template>
  <div class="mask" v-if="showCart" @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => setCartItemsChecked(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allChecked ? '&#xe652;' : '&#xe66c;'"
          ></span>
          全选
        </div>
        <div
          class="product__header__clear"
          @click="() => cleanCartProducts(shopId)"
        >
          清空购物车
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe652;' : '&#xe66c;'"
            @click="
              () => {
                changeCartItemChecked(shopId, item._id)
              }
            "
          ></div>
          <img :src="item.imgUrl" alt="" class="product__item__img" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin"
                >&yen;{{ item.oldPrice }}</span
              >
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus iconfont"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, -1)
                }
              "
              >&#xe8b1;</span
            >
            {{ cartList?.[shopId]?.productList?.[item._id]?.count || 0 }}
            <span
              class="product__number__plus iconfont"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, 1)
                }
              "
              >&#xe602;</span
            >
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price"
          >&yen;{{ calculations.price }}</span
        >
      </div>
      <router-link
        :to="{ path: `/orderConfirmation/${shopId}` }"
        v-show="calculations.price > 0"
      >
        <div class="check__btn">去结算</div>
      </router-link>
      <div class="check__btn" v-show="calculations.price <= 0">去结算</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'
const useCartEffect = (showCart) => {
  const store = useStore()
  // 计算购物车内商品数量

  // 计算商品总价

  // 判断是否为全选状态

  // 判断单个商品是否选中
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  // 清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
    showCart.value = false
  }
  // 购物车内容全选
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }
  // console.log(total.value)
  return {
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked
  }
}
// 控制购物车显示和隐藏
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}
export default {
  name: 'Cart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const { cartList, changeCartItemInfo, productList, calculations } =
      useCommonCartEffect(shopId)

    const { changeCartItemChecked, cleanCartProducts, setCartItemsChecked } =
      useCartEffect(showCart)
    return {
      cartList,
      calculations,
      productList,
      shopId,
      showCart,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      handleCartShowChange
    }
  }
}
</script>

<style  lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
.cart {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0.52rem;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}
.product {
  overflow-y: scroll;
  background-color: $bgColor;
  flex: 1;
  &__header {
    display: flex;
    line-height: 0.52rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &__icon {
      width: 0.2rem;
      height: 0.2rem;
      margin-left: 0.18rem;
      margin-right: 0.08rem;
      vertical-align: top;
      color: #0091ff;
      font-size: 0.2rem;
    }
    &__clear {
      flex: 1;
      margin-right: 0.18rem;
      text-align: right;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;

    &__checked {
      line-height: 0.5rem;
      margin-right: 0.2rem;
      color: #0091ff;
      font-size: 0.2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: red;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      .iconfont {
        font-size: 0.2rem;
      }
      &__minus {
        color: $medium-fontColor;
      }
      &__plus {
        color: $btn-bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
.check {
  display: flex;
  height: 0.49rem;
  border-top: 0.01rem solid $ocntent-bgColor;
  line-height: 0.49rem;
  &__icon {
    position: relative;
    width: 0.76rem;
    &__img {
      display: block;
      width: 0.28rem;
      height: 0.26rem;
      margin: auto;
      margin-top: 0.11rem;
    }
    &__tag {
      position: absolute;
      top: 0.04rem;
      left: 0.45rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $heightlight-fontColot;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: $bgColor;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    margin-left: 0.08rem;
    color: $content-fontcolor;
    &__price {
      font-size: 0.18rem;
      color: #e93b3b;
    }
  }
  &__btn {
    width: 0.98rem;
    font-size: 0.14rem;
    text-align: center;
    color: $bgColor;
    background-color: #4fb0f9;
  }
  a {
    text-decoration: none;
  }
}
</style>
