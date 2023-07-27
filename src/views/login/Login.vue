<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <Toast v-if="showToast" :message="toastMessage" />
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import Toast, { useToastEffect } from '../../components/Toast.vue'
import { post } from '../../utils/request'

const useLoginEffect = (ShowToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      if (data.username === '' || data.password === '') {
        ShowToast('请重新输入')
      } else {
        const result = await post('/api/user/login', {
          username: data.username,
          password: data.password
        })
        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          ShowToast('登陆失败')
        }
      }
    } catch (error) {
      console.log('111')
      ShowToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}
const useRegisterClick = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
    console.log('000')
  }
  return { handleRegisterClick }
}

export default {
  name: 'Login',
  components: { Toast },
  setup() {
    const { showToast, toastMessage, ShowToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(ShowToast)
    const { handleRegisterClick } = useRegisterClick()
    return {
      handleLogin,
      handleRegisterClick,
      username,
      password,
      showToast,
      toastMessage
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);

  &__img {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    background: #f9f9f9;
    border-radius: 0.06rem;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    padding: 0 0.12rem;
    &__content {
      font-size: 0.16rem;
      line-height: 0.2rem;
      margin-top: 0.14rem;
      border: none;
      outline: none;
      background: none;
      width: 100%;
      color: $content-notice-font-color;
    }
  }
  &__login-button {
    height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    font-size: 0.16rem;
    line-height: 0.48rem;
    text-align: center;
    color: $bgColor;
    border-radius: 0.04rem;
    background: $btn-bgColor;
  }
  &__login-link {
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: $content-notice-font-color;
    text-align: center;
  }
}
</style>
