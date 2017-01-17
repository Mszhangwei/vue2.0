import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const route = new VueRouter({
	routes:[{
    path:'/index',component:require('../views/index')
  },{
    path:'/hotel',component:require('../views/hotel')
  },{
    path:'/tieba',component:require('../views/tieba')
  },{
    path:'/nomoney',component:require('../views/nomoney')
  },{
    path:'/order',component:require('../views/order')
  },{
    path:'/details/:outTradeNo',component:require('../views/details')
  },{
    path:'/letter',component:require('../views/letter')
  },{
    path:'/collection',component:require('../views/collection')
  },{
    path:'/comments',component:require('../views/comments')
  },{
    path:'/post',component:require('../views/post')
  },{
    path:'/bill',component:require('../views/bill')
  },{
    path:'/integral',component:require('../views/integral')
  },{
    path:'/about',component:require('../views/about')
  },{
    path:'/feedback',component:require('../views/feedback')
  },{
    path:'/assess/:outTradeNo',component:require('../views/assess')
  }
//,
//{
//  path:'/checkin',component:require('../views/checkin'), name: 'checkin'
//}
  ,{
    path:'/postdetails/:tiebaId',component:require('../views/postdetails')
  },{
    path:'*',redirect:'/index'
  }
  
]
   
})

export default route;