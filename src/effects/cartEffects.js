import { computed } from 'vue'
import { useStore } from 'vuex'
// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId,
      productId,
      productInfo,
      num
    })
  }
  // 获取购物车内商品数据
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })
  // 获取商店名
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  // 获取计算属性，总价，总数
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      let count = 0
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += product.count * product.price
        } else {
          result.allChecked = false
        }
        count += product.count
      }
      if (count === 0) {
        result.allChecked = false
      }
    }
    if (typeof productList === 'undefined') {
      result.allChecked = false
    } else if (Object.keys(productList).length === 0) {
      // console.log(Object.keys(productList))
      result.allChecked = false
    }
    result.price = result.price.toFixed(2)
    return result
  })
  return { cartList, shopName, productList, calculations, changeCartItemInfo }
}
