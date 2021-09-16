import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import DemoBlock from './components/demo-block'
import hljs from 'highlight.js'
import 'highlight.js/scss/color-brewer.scss'

Vue.config.productionTip = false
Vue.component('demo-block', DemoBlock)
Vue.use(ElementUI)

router.afterEach(route => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
