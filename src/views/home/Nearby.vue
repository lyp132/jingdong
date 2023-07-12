<template>
  <div class="nearby">
    <h4 class="nearby__title">附近店铺</h4>
    <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>
<script>
import { ref } from 'vue'
import ShopInfo from '../../components/ShopInfo.vue'
import { get } from '../../utils/request'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  getNearbyList()
  return { nearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup() {
    const { nearbyList } = useNearbyListEffect()
    return {
      nearbyList
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';

.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    line-height: 0.25rem;
    color: $content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}
</style>
