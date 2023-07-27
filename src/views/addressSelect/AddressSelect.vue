<template>
  <div class="wrapper">
    <div class="top">
      <span class="top__icon iconfont" @click="handleBackClick">&#xe601;</span>
      <span class="top__des">地址选择</span>
    </div>
    <div class="address">
      <div
        class="myAddress"
        v-for="item in addressList"
        :key="item._id"
        @click="
          () => {
            handleAddressClick(item._id)
          }
        "
      >
        <div class="myAddress__left">
          <div class="myAddress__left__top">
            <span class="myAddress__left__top__name">{{ item.name }}</span>
            <span class="myAddress__left__top__phone">{{ item.phone }}</span>
          </div>
          <span class="myAddress__left__detail"
            >{{ item.city }}市 {{ item.department }}{{ item.houseNumber }}
          </span>
        </div>
        <div class="myAddress__right">
          <span class="iconfont" @click="handleAddressEdit(item._id)"
            >&#xe601;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '../../utils/request'

// 跳转相关逻辑
const useJumpEffect = () => {
  const router = useRouter()
  const route = useRoute()
  const handleBackClick = () => {
    router.back()
  }
  const handleAddressClick = (addressId) => {
    const path = route.query.path
    // console.log(path)
    router.push(`${path}?addressId=${addressId}`)
  }
  const handleAddressEdit = (id) => {
    router.push(`/addressEdit?id=${id}`)
  }
  return { handleBackClick, handleAddressClick, handleAddressEdit }
}
// 地址数据获取逻辑
const useAddressListEffect = () => {
  const addressdata = reactive({ addressList: [] })
  const getAddressList = async () => {
    const result = await get('/api/user/address')
    if (result?.errno === 0 && result?.data?.length) {
      addressdata.addressList = result.data
    }
  }
  getAddressList()
  const { addressList } = toRefs(addressdata)
  return { addressList }
}
export default {
  name: 'MyAddressList',
  setup() {
    const { handleBackClick, handleAddressClick, handleAddressEdit } =
      useJumpEffect()
    const { addressList } = useAddressListEffect()
    return {
      handleBackClick,
      handleAddressClick,
      handleAddressEdit,
      addressList
    }
  }
}
</script>
  <style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  left: 0;
  background-color: #f8f8f8;
}
.top {
  display: flex;
  align-items: center;
  height: 0.44rem;
  background-color: #fff;
  font-size: 0.16rem;
  color: #333;
  a {
    text-decoration: none;
  }
  &__icon {
    margin-left: 0.18rem;
    font-size: 0.2rem;
    color: #b6b6b6;
  }
  &__des {
    flex: 1;
    text-align: center;
  }
}
.address {
  margin: 0.16rem 0.18rem;
}
.myAddress {
  display: flex;
  background-color: #fff;
  margin-bottom: 0.18rem;
  border-radius: 0.04rem;
  align-items: center;
  &__left {
    flex: 1;
    margin-left: 0.16rem;
    margin-bottom: 0.18rem;
    &__top {
      margin: 0.18rem 0 0.08rem 0;
      color: #999;
      display: flex;
      &__name {
        flex: 1;
      }
      &__phone {
        flex: 1;
      }
    }
    &__detail {
      font-size: 0.14rem;
      line-break: 0.2rem;
      color: #333;
    }
  }
  &__right {
    transform: rotate(180deg);
    text-align: center;
    margin-right: 0.16rem;
    margin-left: 0.4rem;
  }
}
</style>
  