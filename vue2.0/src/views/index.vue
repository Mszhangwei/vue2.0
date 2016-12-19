<template>
  <div >
  	<div class="first" >
  		 <img :src="dizhi" class="imgstyle"/>
  		 <p>{{name}}</p>
  	</div>
  	
   <div class="m-part2  clearfix">
       <div class="xinyong clearfix" @click="goRouter(7)">
           <div>
             <span>账户积分</span>
             <span class="mt7">查看额度</span>
           </div>
           <div>{{ jifen }}积分</div>
        </div>
       <div class="quyou clearfix" @click="goRouter(6)"> 充值积分
           <span style="float:right;display: inline-block">
                <img class="arrow-right" src="../assets/images/jiantou.png" alt="">
           </span>
       </div>
    </div>
   
   
   <mt-cell title="酒店订单" icon="more"  is-link  @click.native="goRouter(1)">
   	 <img src="../assets/images/jiudian.png" slot="icon" width="18" height="18"/>
   </mt-cell>
   <mt-cell title="贴吧列表" icon="more" is-link @click.native="goRouter(2)">
   	 <img src="../assets/images/tieba.png" slot="icon" width="18" height="18"/>
   </mt-cell>
   <mt-cell title="会议订单" icon="more" is-link @click.native="goRouter(3)">
   	 <img src="../assets/images/write.png" slot="icon" width="18" height="18"/>
   </mt-cell>
   <mt-cell title="商城订单" icon="more" is-link>
   	 <img src="../assets/images/shop.png" slot="icon" width="18" height="18"/>
   </mt-cell>
   <mt-cell title="意见反馈" icon="more" is-link>
   	 <img src="../assets/images/form.png" slot="icon" width="18" height="18"/>
   </mt-cell>

  </div>
</template>

<script type="es6">
 import { Cell } from 'mint-ui';
 import {api} from '../assets/js/common';
 import Vue from 'vue'
 export default{
 	data(){
      return {
        name: "",
        jifen:"",
        dizhi:"",
        gridData:[],
      }
   },
   methods:{
      goRouter(index){
        switch(index){
          case 1:this.$router.push({path:'hotel'});break;       //酒店菜单
          case 2:this.$router.push({path:'tieba'});break;
          case 3:this.$router.push({path:'huiyi'});break;
          case 4:this.$router.push({path:'singer'});break;
          case 5:this.$router.push({path:'ringtone'});break;
          case 6:this.$router.push({path:'integral'});break;    //积分充值
          case 7:this.$router.push({path:'about'});break;       //账户积分余额
        }
      },

   },
   //个人主页获得头像，名字，积分
   created: function() {
	  var self = this;
	  self.$http.get(api+'/api/my/home/config').then(function(response){
	  	   if(response.body.result == "success"){
	  	   	self.gridData=response;
	  	   	self.name=response.body.nickName;
	  	   	self.jifen=parseInt(response.body.score);
	  	   	self.dizhi=response.body.avatar;
	  	   	
	  	   }else{
	  	     	
	  	   }
	  	    //self.gridData=response;
	  	    	
     }, function(response){
	// 响应错误回调
     });
 },
 }
</script>
<style scoped="scoped">

  p {
    display: block;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
body {
    background-color: #C4C4C4;
}
.mint-cell img {
    vertical-align: middle;
    margin-right: 10px;
}

</style>
