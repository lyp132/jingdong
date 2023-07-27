<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__edit"><span class="iconfont">&#xe6b6;</span></div>
      <div class="top__content">
        <img
          class="top__content__img"
          src="../../assets/basket@3x.png"
          alt=""
        />
        <div class="top__content__name">热心市民李先生</div>
        <div class="top__content__id">ID: 1069643013</div>
        <div class="top__content__resource">
          <div>
            <div class="top__content__resource__top">红包</div>
            <div class="top__content__resource__bottom">218</div>
          </div>
          <div>
            <div class="top__content__resource__top">优惠券</div>
            <div class="top__content__resource__bottom">12张</div>
          </div>
          <div>
            <div class="top__content__resource__top">鲜豆</div>
            <div class="top__content__resource__bottom">88</div>
          </div>
          <div>
            <div class="top__content__resource__top">白条</div>
            <div class="top__content__resource__bottom">1000</div>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="middle__item">
        <span class="middle__item__left iconfont money">&#xe604;</span>
        <span class="middle__item__des">我的钱包</span>
        <span class="middle__item__right iconfont">&#xe601;</span>
      </div>
      <div class="middle__item">
        <span class="middle__item__left iconfont address">&#xe60e;</span>
        <span class="middle__item__des">我的地址</span>
        <span class="middle__item__right iconfont" @click="toMyAddress"
          >&#xe601;</span
        >
      </div>
      <div class="middle__item">
        <span class="middle__item__left iconfont help">&#xe641;</span>
        <span class="middle__item__des">客服与帮助</span>
        <span class="middle__item__right iconfont">&#xe601;</span>
      </div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import { useRouter } from 'vue-router'
import Docker from '../../components/Docker'

const useJumpEffect = () => {
  const router = useRouter()
  const toMyAddress = () => {
    router.push({ name: 'MyAddressList' })
  }
  return { toMyAddress }
}
export default {
  name: 'Mine',
  components: { Docker },
  setup() {
    const { toMyAddress } = useJumpEffect()
    return { toMyAddress }
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
}
.top {
  height: 2.5rem;
  width: 100%;
  background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  border-bottom-left-radius: 50% 0.68rem;
  border-bottom-right-radius: 50% 0.68rem;
  &__edit {
    padding: 0.21rem 0.21rem 0.32rem 0;
    text-align: right;
    .iconfont {
      font-size: 0.22rem;
      color: #fff;
    }
  }
  &__content {
    margin: 0 0.12rem;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    &__img {
      width: 0.94rem;
      height: 0.94rem;
      transform: translateY(-50%);
      border-radius: 50%;
    }
    &__name {
      margin-top: -0.47rem;
      margin-bottom: 0.02rem;
      font-size: 0.24rem;
      line-height: 0.36rem;
      color: #262628;
    }
    &__id {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #c1c0c9;
    }
    &__resource {
      display: flex;
      justify-content: space-around;
      border-top: 0.01rem solid #f1f1f1;
      margin-top: 0.12rem;
      padding: 0.12rem 0 0.16rem 0;
      &__top {
        font-size: 0.12rem;
        line-height: 0.17rem;
        color: #c1c0c9;
      }
      &__bottom {
        font-size: 0.2rem;
        line-height: 0.28rem;
        color: #262628;
      }
    }
  }
}
.middle {
  margin: 0.4rem 0.18rem 0 0.18rem;
  height: 1.46rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  &__item {
    flex: 1;
    display: flex;
    align-items: center;
    &__left {
      margin: 0 0.16rem;
    }

    &__des {
      flex: 1;
      font-size: 0.14rem;
      color: #262626;
    }
    &__right {
      text-align: right;
      color: #c2c4ca;
      margin-right: 0.16rem;
      transform: rotate(180deg);
    }
    .money {
      color: #ed4a47;
    }
    .address {
      color: #32c5ff;
    }
    .help {
      color: #9925fe;
    }
  }
}
</style>
