<template>
  <div class="wrapper">
    <img src="../../assets/编组.svg" alt="" class="wrapper__img" />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="text"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="请输入密码"
        autocomplete="new-password"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="text"
        placeholder="确认密码"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">
      已有账号去登陆
    </div>
    <Toast v-if="showToast" :message="toastMessage" />
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import Toast, { useToastEffect } from '../../components/Toast.vue'
import { post } from '../../utils/request'
// 处理注册相关逻辑
const useRegisterClick = (ShowToast) => {
  const router = useRouter()
  const Registerdata = reactive({
    username: '',
    password: '',
    ensurement: ''
  })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: Registerdata.username,
        password: Registerdata.password
      })
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        ShowToast('注册失败')
      }
    } catch (error) {
      ShowToast('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(Registerdata)
  return { username, password, ensurement, handleRegister }
}
// 处理登录跳转
const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}
export default {
  name: 'Register',
  components: { Toast },
  setup() {
    const { showToast, toastMessage, ShowToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } =
      useRegisterClick(ShowToast)
    const { handleLoginClick } = useLoginEffect()

    return {
      username,
      password,
      ensurement,
      showToast,
      toastMessage,
      handleLoginClick,
      handleRegister
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0.4rem;
  right: 0.4rem;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    height: 0.48rem;
    width: 100%;
    background: #f9f9f9;
    border-radius: 0.08rem;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    margin-bottom: 0.16rem;
    &__content {
      font-size: 0.16rem;
      line-height: 0.24rem;
      border: none;
      outline: none;
      background: none;
      padding: 0;
      overflow: hidden;
      margin: 0.12rem 0 auto 0.16rem;
      color: $content-notice-font-color;
      width: 90%;
    }
  }
  &__register {
    &-button {
      height: 0.48rem;
      width: 100%;
      font-size: 0.16rem;
      line-height: 0.48rem;
      text-align: center;
      background: $btn-bgColor;
      margin-top: 0.32rem;
    }
    &-link {
      font-size: 0.14rem;
      line-height: 0.2rem;
      margin-top: 0.16rem;
      text-align: center;
      color: $content-notice-font-color;
    }
  }
}
</style>
