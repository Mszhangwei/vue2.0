<template>
  <div>
  	<div class="bgeee"></div>
  	<mt-header fixed title="充值">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
        </router-link>
      </mt-header>
  	<div class="recharge-part mt-40">
       <div class="price-choice">
            <div class="choice-box" 
		            	v-on:click="choiceClick(index)" 
		            	v-bind:class="{'selected':(selected==index)}"  
		            	v-for="(item,index) in recharge" 
		            	@click="sure(item.rmb)">
                <span class="cash" >{{ item.rmb }}元</span>
                <span class="coin">{{ item.score }}个积分</span>
            </div>
       </div>
      <mt-button size="large" type="primary" @click="confirm(this.rmb)" >确定</mt-button>    
  </div>
  
  </div>
</template>

<script>
	
 import { Button,MessageBox } from 'mint-ui';
 import {api} from '../assets/js/common';
 export default{
 	
 	data(){
      return {
        recharge: [],
        selected:0,
        rmb:"",
        
      }
   },
   

   methods:{
   	   //选择的方法
       choiceClick:function(index){
       this.selected=index;   
    },
    

    //点击获得参数值
     sure:function(rmb){
  		this.rmb=rmb;
  	},
  	
  	//点击传rmb参数，获取支付接口
	  	confirm:function(rmb){
	  		var rmb=this.rmb;
	  		this.$http.get(api+'/api/my/recharge',{params:{rmb:rmb}}).then((response) => {		
	  			 if(response.body.result=="success"){
	  			 	     var data=JSON.parse(response.body.config);
	  			       var appId=data.appId;
	  			 	     var timeStamp=data.timeStamp;
	  			 	  	 var nonceStr=data.nonceStr;
	  			 	  	 var pg=data.package;
	  			 	  	 var signType=data.signType;
	  			 	  	 var paySign=data.paySign;
	  			 	  	//console.log(appId,timeStamp,nonceStr,pg,signType,paySign);
	  			 	  	 	  
	  			 	  //微信支付调取
	  			 	  function onBridgeReady(){
							   WeixinJSBridge.invoke(
							       'getBrandWCPayRequest', {
							           "appId" : appId,     //公众号名称，由商户传入     
							           "timeStamp" : timeStamp,         //时间戳，自1970年以来的秒数     
							           "nonceStr" : nonceStr, //随机串     
							           "package" : pg,     
							           "signType" : signType,         //微信签名方式：     
							           "paySign" : paySign //微信签名 
							           
							       },
							       function(res){     
							           if(res.err_msg == "get_brand_wcpay_request：ok" ) {
										    MessageBox.alert('充值成功').then(action => {
                                                   location.href="#/index";
                                                });
							           	    //  MessageBox.alert("提示", "充值成功");
							           	    //  location.href="#/index";
							           }// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。                                     
							           else{
							           	MessageBox.alert('充值失败','提示');
							           }
							       }
							   ); 
							}
							if (typeof WeixinJSBridge == "undefined"){
							   if( document.addEventListener ){
							       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
							   }else if (document.attachEvent){
							       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
							       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
							   }
								}else{
								   onBridgeReady();
								}
								//微信支付结束
	  			   }else{
	  			 	    
	  			         }
	  				
			         }, (response) => {
			           //error callback
			           console.log(response.body.result); 
			     });	
	  	  },
	  	  
	  	 
	  	  
	  	  
  	
  },
  
  

   created: function() {
	  var self = this;
	  self.$http.get(api+'/api/my/recharge/config').then(function(response){
	  	   if(response.body.result == "success"){
	  	   	self.recharge=response.body.list;
	  	   }else{
	  	     	
	  	   }   	
     }, function(response){
	   // 响应错误回调
     });
   },
 }
</script>
<style scoped="scoped">
.mint-button--primary {
    color: #fff;
    background-color: #77a984;
}
.mint-button--large {
        display: block;
    width: 84%;
    margin-left: 8%;
    margin-top: 50px;
}
</style>
