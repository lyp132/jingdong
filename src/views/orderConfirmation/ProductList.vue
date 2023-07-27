<template>
  <div class="products">
    <!-- 商店标题 -->
    <div class="products__title">{{ shopName }}</div>
    <!-- 商店内容 -->
    <div class="products__wrapper">
      <div class="products__list">
        <div class="products__info" v-for="item in productList" :key="item._id">
          <img class="products__info__img" :src="item.imgUrl" alt="" />
          <div class="products__info__detail">
            <div class="products__info__detail__name">
              {{ item.name }}
            </div>
            <div class="products__info__detail__price">
              <span> &yen; {{ item.price }} x {{ item.count }} </span>
              <span class="products__info__detail__total">
                &yen; {{ item.price * item.count }}
              </span>
            </div>
          </div>
        </div>
        <!-- 折叠 -->
        <div class="products__fold" v-if="true">
          <div>
            共计几件/几 kg
            <span class="iconfont">&#xe65e;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

export default {
  name: 'ProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)

    // console.log(shopName)
    return { productList, shopName }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
.products {
  margin: 0.38rem 0.18rem 0.38rem 0.18rem;

  background-color: #eee;

  &__title {
    padding: 0.16rem;
    background-color: $bgColor;
    color: $content-fontcolor;
    font-size: 0.16rem;
  }
  &__wrapper {
    overflow-y: scroll;
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0.49rem;
    top: 2.46rem;
  }
  &__list {
    background-color: $bgColor;
  }
  &__info {
    display: flex;
    padding: 0 0.16rem 0.16rem 0.16rem;
    background-color: $bgColor;
    position: relative;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      font-size: 0.14rem;
      flex: 1;
      &__name {
        line-height: 0.2rem;
        color: $content-fontcolor;
      }
      &__price {
        display: flex;
        margin: 0.06rem 0;
        line-height: 0.14rem;
        color: $heightlight-fontColot;
      }
      &__total {
        // position: absolute;
        flex: 1;
        text-align: right;
      }
    }
  }
  &__fold {
    height: 0.44rem;
    font-size: 0.14rem;
    color: $light-fontColor;
    div {
      background-color: $search-bgColor;
      height: 0.28rem;
      margin: 0 0.16rem;
      margin-bottom: 0.16rem;
      line-height: 0.28rem;
      text-align: center;
    }
    .iconfont {
      margin-left: 0.08rem;
    }
  }
}
</style>
