<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">
        &#xe601;
      </div>
      确认订单
    </div>
    <!-- 收货地址 -->
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">
        {{
          showSubmitBtn
            ? `${addressdata.city}${addressdata.department}${addressdata.houseNumber}`
            : '请选择收货地址'
        }}
      </div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">{{ addressdata.name }}</span
        ><span class="top__receiver__info__phone">{{ addressdata.phone }}</span>
      </div>
      <router-link :to="`/addressSelect?path=${path}`">
        <div class="iconfont top__receiver__icon">&#xe601;</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '../../utils/request'

export default {
  name: 'TopArea',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const addressdata = reactive({
      city: '',
      department: '',
      houseNumber: '',
      name: '',
      phone: ''
    })
    const path = route.path
    const addressId = route.query.addressId
    const handleBackClick = () => {
      router.back()
    }
    onBeforeMount(async () => {
      if (addressId) {
        const result = await get(`/api/user/address/${addressId}`)
        if (result?.errno === 0) {
          const resultData = result.data
          addressdata.city = resultData.city
          addressdata.department = resultData.department
          addressdata.houseNumber = resultData.houseNumber
          addressdata.name = resultData.name
          addressdata.phone = resultData.phone
        }
      }
    })
    return {
      showSubmitBtn: route.query.addressId,
      path,
      addressdata,
      handleBackClick
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
.top {
  position: relative;
  height: 1.58rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  &__header {
    position: relative;
    padding: 0.22rem;
    padding-left: 0.18rem;
    text-align: center;
    font-size: 0.16rem;
    color: $bgColor;
    line-height: 0.22rem;
    &__back {
      position: absolute;
      font-size: 0.22rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    background-color: $bgColor;
    border-radius: 4px;
    color: $content-fontcolor;
    &__title {
      font-size: 0.16rem;
      line-height: 0.22rem;
      padding: 0.16rem 0 0.14rem 0.16rem;
    }
    &__address {
      font-size: 0.14rem;
      line-height: 0.2rem;
      padding-left: 0.16rem;
    }
    &__info {
      font-size: 0.12rem;
      line-height: 0.17rem;
      color: $medium-fontColor;
      padding: 0.06rem 0 0.16rem 0.16rem;
      &__name {
        padding-right: 0.06rem;
      }
    }
    &__icon {
      position: absolute;
      top: 0.5rem;
      right: 0.16rem;
      color: $medium-fontColor;
      font-size: 0.2rem;
      transform: rotate(180deg);
    }
  }
}
</style>
