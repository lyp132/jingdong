<template>
  <div class="shop">
    <img :src="item.imgUrl" alt="" class="shop__img" />
    <div
      class="shop__content"
      :class="{
        shop__content: true,
        'shop__content--bordered': hideBorder ? false : true
      }"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售: {{ item.sales }}</span>
        <span class="shop__content__tag"> 起送: {{ item.expressLimit }} </span>
        <span class="shop__content__tag">
          基础运费: {{ item.expressPrice }}
        </span>
      </div>
      <p class="shop__content__highlight">
        {{ item.slogan }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.shop {
  padding-top: 0.12rem;
  display: flex;
  &__img {
    width: 0.56rem;
    height: 0.56rem;
    margin-right: 0.16rem;
  }

  &__content {
    flex: 1;
    color: $content-fontcolor;
    &--bordered {
      border-bottom: 0.01rem solid $ocntent-bgColor;
    }
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
    }
    &__tags {
      margin-top: 0.08rem;
    }
    &__tag {
      line-height: 0.18rem;
      font-size: 0.13rem;
      margin-right: 0.16rem;
    }
    &__highlight {
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $heightlight-fontColot;
      margin: 0.08rem 0 0.12rem 0;
    }
  }
}
</style>
