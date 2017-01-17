<template>
  <div>
  	<mt-header fixed title="订单详情">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
        </router-link>
      </mt-header>
    <!--判断状态-->   
    <div v-if="numberto!==''">
      <div class="order-condition mt-40" v-if="status==='waitForRefund'">订单状态：<span><span>未入住</span></span></div>
      <div class="order-condition mt-40" v-if="status==='checkIn'">订单状态：<span><span>已入住</span></span></div>
      <div class="order-condition mt-40" v-if="status==='waitForPay'">订单状态：<span><span>未支付</span></span></div>
      <div class="order-condition mt-40" v-if="status==='waitForCheckIn'">订单状态：<span><span>未入住</span></span></div>
     
   
   <mt-cell :title="'￥'+totalPrice+'元'" ></mt-cell>
   <div class="bottom"></div>
   <div class="order-info">
			<mt-cell :title="details.name" :label="details.routes" style="min-height:70px"></mt-cell>
			<div class="item-time">
				<div class="time">
					<label>入住日期：</label>{{startdata}}入住 / {{enddata}}退房 <span style="float: right;">{{days}}晚</span>
				</div>
				<div class="count">
					<label>入住房型：</label>{{room.name}}<span style="float: right;">{{roomNum}}间</span>
				</div>
			</div>
			<div class="item-phone"> 
				<a class="hotel-num" :href="'tel:'+details.phone">&nbsp;&nbsp;拨打电话</a>
				<a class="hotel-addr">&nbsp;&nbsp;查看地图</a>
			</div>
			<div class="bottom"></div>
		</div>
		
		<div class="item-name">
				<div class="name">退款和改签</div>
				<div class="address">1.订房后2小时内可申请退房<br>2.预定人因自身原因要求变更,取消或改签,酒店将扣除预付款,改签时间直接和酒店交流沟通.</div>
			</div>
   <div class="book-info">
			<div class="time">
				<label>预定日期：</label>{{bookDate}}
				<a >联系客服</a>
			</div>
			<div class="count">
				<label>订单号码：</label>{{bianhao}}
			</div>
		</div>
		<div class="order-manage" v-if="status==='waitForRefund'">
			<a class="delete" @click="refund(numberto)">退款</a>     
			<a class="evaluate" @click=changes()>改签</a>       
		</div>
		<div class="order-manage" v-if="status==='checkIn'">
			<a class="delete" @click="delit(numberto)">删除订单</a>     
			<a class="evaluate" @click="assess()">评价</a>       
		</div>
		<div class="order-manage" v-if="status==='waitForPay'">
			<a class="delete" @click="delit(numberto)">删除订单</a>     
			<a class="evaluate" @click="pay(numberto)">支付</a>       
		</div>
		<div class="order-manage" v-if="status==='waitForCheckIn'">
			<a class="delete" @click="refund(numberto)">退款</a>     
			<a class="evaluate" @click=changes()>改签</a>       
		</div>
   </div>
	 <div v-if="numberto ==''">
		 <div style="margin-top: 80px;width: 100%;text-align: center;">无此订单</div>

	 </div>
  </div>
</template>

<script >
 import { Cell,MessageBox } from 'mint-ui';
 import {api} from '../assets/js/common'
 export default{
 	data(){
      return {
      	status:"",
        details:"",
        startdata:"",
        enddata:"",
        room:"",
        roomNum:"",
        totalPrice:"",
        tel:"",
        bianhao:"",
        numberto:"",
        bookDate:"",
		days:"",
      }
   },

 beforeRouteEnter (to, from, next) {
      next(vm => {
       
        vm.getList();
       
      })
    },

   methods:{
     
    //删除订单的请求
  	delit:function(numberto){
  		
  	   MessageBox.confirm('是否删除订单').then(action => {
          var self = this;
		  		this.$http.post(api+'/api/my/order/del',{outTradeNo:numberto}).then((response) => {
		  				 var message=response.body.message;
		  				 var title="提示";
				   MessageBox.alert(message).then(action => {
        location.href="#/order";
});
				   //this.$router.go(-1);
				   
				  }, (response) => {
				    
				    // error callback
				    }); 
		     });
		     
		     
}, 

   //退款请求
     refund:function(numberto){
  	    MessageBox.confirm('是否退款').then(action => {
          var self = this;
		  		this.$http.post(api+'/api/my/order/refund',{outTradeNo:numberto }).then((response) => {
		  				 var message=response.body.message;
		  				 //var title="提示";
				   MessageBox.alert(message,'提示').then(action => {
        location.href="#/order";
});
				  }, (response) => {
				 
				    // error callback
				    }); 
		     });
},

   //支付的请求
    pay:function(numberto){
  		var self = this;
  		this.$http.post(api+'/api/hotel/pay/exist/order',{outTradeNo:numberto }).then((response) => {	
		       if(response.body.result == "success"){
		       	   var data=JSON.parse(response.body.wxConfig);
	  			       var appId=data.appId;
	  			 	     var timeStamp=data.timeStamp;
	  			 	  	 var nonceStr=data.nonceStr;
	  			 	  	 var pg=data.package;
	  			 	  	 var signType=data.signType;
	  			 	  	 var paySign=data.paySign;
					//console.log(appId,timeStamp,nonceStr,pg,signType,paySign);
				   //微信支付开始
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
                                                   location.href="#/order";
                                                });
								}
								     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
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
     // 微信支付结束
		       }else{
		       	  var message=response.body.message;
				      MessageBox.alert(message, "提示");
		       }
		  }, (response) => {
		 
		    // error callback
		  });
  		
},

  	assess:function(){
  		 //this.$router.push('/assess');
  		 location.href="#/assess/";
  	},
    
    //改签的请求
     changes:function(){
     	 var vm=this;
     	 MessageBox({
				  title: '温馨提示',
				  message: '改签请联系客服',
				  showCancelButton: false
				});
     },
    
    //刚开始调取数据
     getList:function(){
   	   console.log(this.$route.params.outTradeNo)
   	   let outTradeNo = this.$route.params.outTradeNo;
  		this.$http.get(api+'/api/my/order/detail',{ params:{outTradeNo:outTradeNo } }).then((response) => {	
  			   this.numberto=response.body.outTradeNo;
  			   console.log(response.body)
  			   this.details=response.body.hotel;
  			   this.startdata=response.body.startDate;
  			   this.enddata=response.body.endDate;
  			   this.roomNum=response.body.roomNum;
  			   this.totalPrice=response.body.totalPrice;
  			   this.tel=response.body.phone;
  			   this.room=response.body.room;
  			   this.bookDate=response.body.bookDate;
  			   this.bianhao=response.body.outTradeNo;
  			   this.status=response.body.orderStatus;
					 this.days=response.body.days;
		  }, (response) => {
		    // error callback
		    
		  });
   	   
   },
    }
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

.greenbox{
	background-color: #77a984;
	color: #FFFFFF;
}
.mint-cell-label{
	color:red;
}



</style>
