<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe630;</span>
    北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe7e5;</span>
  </div>
  <div class="search">
    <label for="prodectSearch">
      <span class="iconfont">&#xe65c;</span>
    </label>
    <input type="text" id="prodectSearch" placeholder="山姆会员商店优惠商品" />
  </div>
  <div class="banner">
    <img
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt=""
      class="banner__img"
    />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="(item, index) in iconList" :key="index">
      <!-- <img
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgname}.png`"
        class="icons__item__img"
      /> -->
      <img :src="item.imgname" class="icons__item__img" />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup() {
    const iconList = [
      // { imgname: '超市', desc: '超市便利' },
      // { imgname: '菜市场', desc: '菜市场' },
      // { imgname: '水果店', desc: '水果店' },
      // { imgname: '鲜花', desc: '鲜花绿植' },
      // { imgname: '医药健康', desc: '医药健康' },
      // { imgname: '家居', desc: '家居时尚' },
      // { imgname: '蛋糕', desc: '烘焙蛋糕' },
      // { imgname: '签到', desc: '签到' },
      // { imgname: '大牌免运', desc: '大牌免运' },
      // { imgname: '红包', desc: '红包套餐' }
      { imgname: require('../../assets/超市.png'), desc: '超市便利' },
      { imgname: require('../../assets/菜市场.png'), desc: '菜市场' },
      { imgname: require('../../assets/水果店.png'), desc: '水果店' },
      { imgname: require('../../assets/鲜花.png'), desc: '鲜花绿植' },
      { imgname: require('../../assets/医药健康.png'), desc: '医药健康' },
      { imgname: require('../../assets/家居.png'), desc: '家居时尚' },
      { imgname: require('../../assets/蛋糕.png'), desc: '烘焙蛋糕' },
      { imgname: require('../../assets/签到.png'), desc: '签到' },
      { imgname: require('../../assets/大牌免运.png'), desc: '大牌免运' },
      { imgname: require('../../assets/红包.png'), desc: '红包套餐' }
    ]
    return { iconList }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  // @include color1;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    top: 0.17rem;
    right: 0;
    font-size: 0.2rem;
  }
  color: $content-fontcolor;
}
.search {
  margin-bottom: 0.12rem;
  height: 0.32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: 0.16rem;
  display: flex;
  .iconfont {
    display: inline-block;
    padding: 0.08rem 0.04rem 0.08rem 0.16rem;
  }
  input {
    flex: 1;
    background: #f5f5f5;
    border-radius: 0.16rem;
    padding: 0.08rem 0.1rem;
    border: 0;
    font-size: 0.14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 0.86rem;
  &__img {
    height: 0.86rem;
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 0.16rem;
  &__item {
    width: 20%;
    margin-top: 0.16rem;
    &__img {
      display: block;
      margin: 0 auto;
      width: 0.4rem;
      height: 0.4rem;
    }
    &__desc {
      margin: 0.06rem 0rem 0rem 0rem;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap {
  height: 0.1rem;
  background: $ocntent-bgColor;
  margin: 0 -0.18rem;
}
</style>
