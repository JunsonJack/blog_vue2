import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {router} from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'moment'

// 时间格式化
Vue.prototype.$moment = moment

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(mavonEditor)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


