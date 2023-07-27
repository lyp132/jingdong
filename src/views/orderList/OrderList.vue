<template>
  <div class="wrapper">
    <div class="title">我的订单</div>

    <div class="order" v-for="(item, index) in list" :key="index">
      <div class="order__title">
        {{ item.shopName
        }}<span class="order__status">{{
          item.isCanceled ? '已取消' : '已下单'
        }}</span>
      </div>
      <div class="order__content">
        <div class="order__content__imgs">
          <template
            v-for="(innerItem, innerIndex) in item.products"
            :key="innerIndex"
          >
            <img
              class="order__content__img"
              :src="innerItem.product.img"
              alt=""
              v-if="innerIndex <= 3"
            />
          </template>
        </div>
        <div class="order__content__info">
          <div class="order__content__info__price">￥{{ item.totalPrice }}</div>
          <div class="order__content__info__count">
            共{{ item.totalNumber }}件
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>
<script>
import { reactive, toRefs } from 'vue'
import Docker from '../../components/Docker.vue'
import { get } from '../../utils/request'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  // 定义数据
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      // console.log(orderList)
      orderList.forEach((item) => {
        const products = item.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalNumber += productItem?.orderSales || 0
          totalPrice += productItem?.orderSales * productItem?.product.price
        })
        item.totalNumber = totalNumber
        item.totalPrice = totalPrice.toFixed(2)
      })
      data.list = orderList
    }
  }
  getNearbyList()
  const { list } = toRefs(data)
  // console.log(list)
  return { list }
}
export default {
  name: 'OrderList',
  components: { Docker },
  setup() {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  left: 0;
  background-color: #f8f8f8;
}
.title {
  background-color: #fff;
  font-size: 0.16rem;
  color: #333;
  line-height: 0.44rem;
  text-align: center;
}
.order {
  margin: 0.16rem 0.18rem;
  background-color: #fff;
  padding: 0.16rem;
  &__title {
    font-size: 0.16rem;
    color: #333;
    line-height: 0.22rem;
    margin-bottom: 0.16rem;
  }
  &__status {
    float: right;
    font-size: 0.14rem;
    color: #999;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
    &__info {
      text-align: right;
      &__price {
        margin-bottom: 0.04rem;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #e93b3b;
      }
      &__count {
        line-height: 0.14rem;
        font-size: 0.12rem;
        color: #333;
      }
    }
  }
}
</style>
