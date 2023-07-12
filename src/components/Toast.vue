<template>
  <div class="toast">{{ message }}</div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'Toast',
  props: ['message']
}
export const useToastEffect = () => {
  const Toastdata = reactive({
    showToast: false,
    toastMessage: ''
  })

  const ShowToast = (message) => {
    console.log('222')
    Toastdata.showToast = true
    Toastdata.toastMessage = message
    setTimeout(() => {
      Toastdata.showToast = false
      Toastdata.toastMessage = ''
    }, 2000)
  }
  const { showToast, toastMessage } = toRefs(Toastdata)
  return { showToast, toastMessage, ShowToast }
}
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: $bgColor;
}
</style>
