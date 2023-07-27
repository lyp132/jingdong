<template>
  <div class="order">
    <div class="order__price">实付金额 &yen; {{ calculations.price }}</div>
    <div
      v-show="showSubmitBtn"
      class="order__btn"
      @click="() => handleShowConfirmChange(true)"
    >
      提交订单
    </div>
  </div>
  <!-- 蒙层  -->
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--left"
          @click="() => hanleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--right"
          @click="() => hanleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
  <div class="mask" v-show="successMessage">
    <div class="mask__content">
      <div class="mask__content__cancle">
        <span class="iconfont" @click="successCancle">&#xe61d;</span>
      </div>
      <div class="mask__content__success">
        <span class="iconfont">&#xe614;</span>
      </div>
      <div class="mask__content__des">支付成功，等待配送</div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../..//effects/cartEffects'
import { post } from '../..//utils/request'

// 下单相关逻辑
const useMakeOrderEffect = (
  shopId,
  shopName,
  productList,
  ShowToast,
  maskdata,
  addressId
) => {
  const router = useRouter()
  const store = useStore()

  const hanleConfirmOrder = async (isCanceled) => {
    const products = []
    // console.log(productList.value)
    for (const item in productList.value) {
      const product = productList.value[item]
      products.push({ id: parseInt(product._id), num: product.count })
    }
    // console.log(products)
    try {
      const result = await post('/api/order', {
        addressId,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      // 订单支付成功
      if (result?.errno === 0 && isCanceled === false) {
        ShowToast(maskdata)
        setTimeout(() => {
          // store.commit('clearCartData', { shopId })
          // router.push({ name: 'OrderList' })
          console.log('111')
        }, 5000)
      } else if (result?.errno === 0 && isCanceled === true) {
        router.push({ path: `/shop/${shopId}` })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const successCancle = () => {
    store.commit('clearCartData', { shopId })
    router.push({ name: 'OrderList' })
  }

  return { hanleConfirmOrder, successCancle }
}
// 蒙层展示相关逻辑
const useShowMaskEffect = (maskdata) => {
  // console.log('1111')
  const handleShowConfirmChange = (status) => {
    maskdata.showConfirm = status
  }
  // 支付成功
  const ShowToast = (maskdata) => {
    maskdata.showConfirm = false
    maskdata.successMessage = true
    console.log('支付成功')
  }
  return { handleShowConfirmChange, ShowToast }
}

export default {
  name: 'Order',
  setup() {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const addressId = route.query.addressId
    // 控制遮罩层是否显示
    const maskdata = reactive({ showConfirm: false, successMessage: false })
    // 蒙层展示相关逻辑
    const { handleShowConfirmChange, ShowToast } = useShowMaskEffect(maskdata)
    const { calculations, productList, shopName } = useCommonCartEffect(shopId)
    const { hanleConfirmOrder, successCancle } = useMakeOrderEffect(
      shopId,
      shopName,
      productList,
      ShowToast,
      maskdata,
      addressId
    )
    const { showConfirm, successMessage } = toRefs(maskdata)

    return {
      showSubmitBtn: !!addressId,
      calculations,
      showConfirm,
      successMessage,
      handleShowConfirmChange,
      hanleConfirmOrder,
      successCancle
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.48rem;
  line-height: 0.48rem;
  background-color: $bgColor;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
  }
  &__btn {
    text-align: center;
    width: 0.98rem;
    background: #4fb0f9;
    color: $bgColor;
    font-size: 0.14rem;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3rem;
    transform: translate(-50%, -50%);
    background: #ffffff;
    text-align: center;
    border-radius: 0.04rem;
    &__title {
      margin: 0.28rem 0 0 0;
      font-size: 0.18rem;
      line-height: 0.25rem;
      color: #333;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #666;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      font-size: 0.14rem;

      border-radius: 16px;
      &--left {
        margin-right: 0.12rem;
        border: 1px solid #4fb0f9;
        color: #4fb0f9;
      }
      &--right {
        margin-left: 0.12rem;
        background-color: #4fb0f9;
        color: #fff;
      }
    }
    &__cancle {
      text-align: right;
      margin: 0.12rem 0.12rem 0 0;
      color: #666;
    }
    &__success {
      color: #000;
      margin-top: 0.16rem;
      .iconfont {
        font-size: 0.4rem;
      }
    }
    &__des {
      margin: 0.24rem 0 0.32rem 0;
      font-size: 0.18rem;
      line-height: 0.25rem;
      color: #333;
    }
  }
}
</style>
