<template>
  <div class="wrapper">
    <Toast v-show="showToast" :message="toastMessage" />
    <div class="top">
      <span class="top__icon iconfont" @click="handleBackClick">&#xe601;</span>
      <span class="top__des">{{ isEdit ? '编辑' : '新建' }}收货地址</span>
      <span class="top__save" @click="handleSaveClick">保存</span>
    </div>
    <div class="content">
      <div class="content__item">
        <span class="content__item__label">所在城市：</span>
        <input
          class="content__item__input"
          placeholder="请输入所在城市"
          type="text"
          v-model="city"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">小区/大厦/学校：</span>
        <input
          class="content__item__input"
          placeholder="请输入小区/大厦/学校"
          type="text"
          v-model="department"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">楼号-门牌号：</span>
        <input
          class="content__item__input"
          placeholder="请输入楼号-门牌号"
          type="text"
          v-model="houseNumber"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">收货人：</span>
        <input
          class="content__item__input"
          placeholder="请输入收货人"
          type="text"
          v-model="name"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">联系电话：</span>
        <input
          class="content__item__input"
          placeholder="请输入联系电话"
          type="text"
          v-model="phone"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Toast, { useToastEffect } from '../../components/Toast.vue'
import { post } from '../../utils/request'

// 跳转相关逻辑
const useJumpEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

// 新建、编辑地址数据逻辑
const useAddressListEffect = (id, addressdata, ShowToast) => {
  const router = useRouter()
  const handleSaveClick = async () => {
    // console.log(addressdata)
    if (
      !addressdata.city ||
      !addressdata.department ||
      !addressdata.houseNumber ||
      !addressdata.name ||
      !addressdata.phone
    ) {
      ShowToast('所有内容必填')
    } else {
      if (id) {
        // 编辑地址
        const result = await post(`/api/user/address/${id}`, {
          city: addressdata.city,
          department: addressdata.department,
          houseNumber: addressdata.houseNumber,
          name: addressdata.name,
          phone: addressdata.phone
        })
        if (result.errno === 0) {
          router.back()
        }
      } else {
        // 新建地址
        const result = await post('/api/user/address', {
          city: addressdata.city,
          department: addressdata.department,
          houseNumber: addressdata.houseNumber,
          name: addressdata.name,
          phone: addressdata.phone
        })
        if (result?.errno === 0) {
          router.back()
        }
      }
    }
  }
  return { handleSaveClick }
}

export default {
  name: 'AddressEdit',
  components: { Toast },
  setup() {
    const route = useRoute()
    const id = route.query.id
    const addressdata = reactive({
      city: '',
      department: '',
      houseNumber: '',
      name: '',
      phone: ''
    })
    const isEdit = ref(false)

    // console.log(id)

    // 挂载之前初始化数据
    onBeforeMount(async () => {
      if (id) {
        const result = await post(`/api/user/address/${id}`)

        if (result?.errno === 0) {
          const data = result.data
          addressdata.city = data.city
          addressdata.department = data.department
          addressdata.houseNumber = data.houseNumber
          addressdata.name = data.name
          addressdata.phone = data.phone
        }
        isEdit.value = true
      }
    })

    const { handleBackClick } = useJumpEffect()
    const { showToast, toastMessage, ShowToast } = useToastEffect()
    const { handleSaveClick } = useAddressListEffect(id, addressdata, ShowToast)
    const { city, department, houseNumber, name, phone } = toRefs(addressdata)
    return {
      handleBackClick,
      handleSaveClick,
      showToast,
      toastMessage,
      city,
      department,
      houseNumber,
      name,
      phone,
      isEdit
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
  &__save {
    margin-right: 0.18rem;
  }
}
.content {
  background: #fff;
  margin-top: 0.12rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #666;
  &__item {
    display: flex;
    overflow: hidden;
    margin: 0 0.18rem 0 0.18rem;
    padding: 0.12rem 0;
    border-bottom: 0.01rem solid #f1f1f1;
    &__input {
      flex: 1;
      border: none;
      outline: none;
      color: #3f3f3f;
      margin-right: 0.05rem;
    }
  }
}
</style>
