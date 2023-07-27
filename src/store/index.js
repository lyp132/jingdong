import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
const getLocalCartList = () => {
  // {
  // 第一层级是商铺的id
  // shopId: {
  //   // 第二层是商品的id
  //   // 第二层的内容是商品内容以及购物数量
  //   shopName: '',
  //   productList: {
  //     productId: {
  //       _id: '1',
  //       name: '番茄250g/份',
  //       imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
  //       sales: 10,
  //       price: 33.6,
  //       oldPrice: 39.6,
  //       count: 2
  //     }
  //   }
  // }
  // }
  try {
    return JSON.parse(localStorage.cartList) || {}
  } catch (error) {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getLocalCartList()
  },
  getters: {
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}, showhidden: 2, shopId: ''
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        productInfo.number = 0
        product = productInfo
      }
      // product.shownum += 1
      product.count += num
      if (product.count < 0) {
        product.count = 0
      }
      // console.log(shopInfo.productList)
      if (num > 0) { product.check = true }
      shopInfo.productList[productId] = product
      // // 删除数量为空的项
      for (const key in shopInfo.productList) {
        if (shopInfo.productList[key].count === 0) {
          delete shopInfo.productList[key]
        }
      }
      // 为每一项商品排序
      const n = Object.keys(shopInfo.productList)
      for (const key in n) {
        shopInfo.productList[n[key]].number = Number(key)
      }
      shopInfo.shopId = parseInt(shopId, 10)
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 设置shopname
    shangeShopName(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 设置showhidden
    setShowHidden(state, payload) {
      const { showhidden, shopId } = payload
      const shopInfo = state.cartList[shopId]
      // console.log('11', shopInfo)
      shopInfo.showhidden = showhidden
      // console.log('22', shopInfo)

      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 改变单个商品选中状态
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    // 清空购物车
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId]?.productList
      if (products) {
        for (const i in products) {
          products[i].check = true
        }
      }
      setLocalCartList(state)
    },
    // 支付成功后清除数据
    clearCartData(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
