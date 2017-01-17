<template>
  <div>
  	<div class="postfix" ><img src="../assets/images/back.png" style="width:8px" @click="$router.go(-1)"></div>
	<mt-navbar v-model="selected">
	  <mt-tab-item v-for="(item,index) in sortselect" :id="index" @click.native="select(item.type)">{{ item.name }}</mt-tab-item>
	</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected" >
	<!--全部-->
  <mt-tab-container-item :id="0">
  	<div v-for="(item,index) in tent">
  	  <navbar class="order-part" >
	      <div class="order-list" >
	            <ul class="order-list-ul">
	                <li class="order-item">
	                	   <div @click="details(item.outTradeNo)">
	                        <div class="item-part item-name">{{item.hotel.name}}</div>
	                        <div class="item-part item-info">
	                            {{item.startDate}}至{{item.endDate}} （{{item.days}}晚）<br>
	                            {{item.roomNum}}间  <span class="greenstyle">总价￥{{item.totalPrice}}元</span>
	                        </div>
	                     </div>
	                        <div class="item-part item-bottom" v-if="status[index] === 'waitForCheckIn'">
	                            <a  class="delete" @click=changes() >改签</a>
	                            <a class="more" style="float:right;" @click="refund(item.outTradeNo)"> 退款</a>
	                        </div>
	                        <div class="item-part item-bottom" v-if="status[index] === 'waitForPay'">
	                            <a  class="delete" @click="pay(item.outTradeNo)">支付</a>
	                            <a class="more" style="float:right;" @click="delit(item.outTradeNo)">删除订单</a>
	                            
	                        </div>
	                        <div class="item-part item-bottom" v-if="status[index] === 'checkIn'" >
	                            <a  class="delete" @click="assess(item.outTradeNo)">评价</a>
	                            <a class="more" style="float:right;" @click="delit(item.outTradeNo)"> 删除订单</a>
	                        </div>
	                        <div class="item-part item-bottom" v-if="status[index] === 'waitForRefund'" > 
	                           <a class="more"  @click="invoice()" >发票</a>
	                            <a class="delete"  @click="assess(item.outTradeNo)"> 评价</a>
	                             <a  class="more"  @click="delit(item.outTradeNo)">删除订单</a>
	                        
	                        </div>
	                </li>
	            </ul>
	        </div>
        </navbar>
     </div>
  </mt-tab-container-item>
  <!--未支付-->
  <mt-tab-container-item :id="1">
    <div v-for="(item,index) in tent">
  	  <navbar class="order-part" >
	      <div class="order-list" >
	            <ul class="order-list-ul">
	                <li class="order-item">
	                	 <div @click="details(item.outTradeNo)">
	                        <div class="item-part item-name">{{item.hotel.name}}</div>
	                        <div class="item-part item-info">
	                            {{item.startDate}}至{{item.endDate}} （{{item.days}}晚）<br>
	                            {{item.roomNum}}间 <span class="greenstyle">总价￥{{item.totalPrice}}元</span>
	                        </div>
	                   </div>
	                        <div class="item-part item-bottom">
	                            
	                            <a class="delete"  @click="pay(item.outTradeNo)"> 支付</a>
	                            <a  class="more" style="float:right;" @click="delit(item.outTradeNo)">删除订单</a>
	                        </div>
	                </li>
	            </ul>
	        </div>
        </navbar>
     </div>
  </mt-tab-container-item>
  <!--未入住-->
  <mt-tab-container-item :id="2">
    <div v-for="(item,index) in tent" >
  	  <navbar class="order-part" >
	       <div class="order-list" >
	            <ul class="order-list-ul">
	                <li class="order-item">
	                	 <div @click="details(item.outTradeNo)">
	                        <div class="item-part item-name">{{item.hotel.name}}</div>
	                        <div class="item-part item-info">
	                            {{item.startDate}}至{{item.endDate}} （{{item.days}}晚）<br>
	                            {{item.roomNum}}间 <span class="greenstyle">总价￥{{item.totalPrice}}元
	                        </div>
	                   </div>
	                        <div class="item-part item-bottom">
	                        	  <a class="delete"  @click=changes()> 改签</a>
	                            <a  class="more" style="float:right;" @click="refund(item.outTradeNo)">退款</a>
	                            
	                        </div>
	                </li>
	            </ul>
	        </div>
       </navbar>
    </div>
  </mt-tab-container-item>
  <!--已入住-->
  <mt-tab-container-item :id="3">
    <div v-for="(item,index) in tent" >
  	   <navbar class="order-part" >
	        <div class="order-list" >
	            <ul class="order-list-ul">
	                <li class="order-item">
	                	<div @click="details(item.outTradeNo)">
	                        <div class="item-part item-name">{{item.hotel.name}}</div>
	                        <div class="item-part item-info">
	                          <p>{{item.startDate}}至{{item.endDate}} ({{item.days}}晚)</p>  
	                           <p>{{item.roomNum}}间 <span class="greenstyle">总价￥{{item.totalPrice}}元</p> 
	                        </div>
	                   </div>     
	                        <div class="item-part item-bottom">
	                           <a class="more"  @click="invoice()" >发票</a>
	                            <a class="delete"  @click="assess(item.outTradeNo)"> 评价</a>
	                             <a  class="more"  @click="delit(item.outTradeNo)">删除订单</a>
	                        </div>
	                </li>
	            </ul>
	        </div>
        </navbar>
     </div>
  </mt-tab-container-item>
</mt-tab-container>

  </div>
</template>

<script>
 import { Navbar, TabItem,MessageBox,Indicator  } from 'mint-ui';
 import {api} from '../assets/js/common'
 export default{
 	data(){
      return {
        selected:0,
        listdata:[],
        sortselect:[],
      	tent:[],         //中途内容
      	status:[],      //订单状态
      	startDate:"",
      	endDate:"",
      	Period:[],    //住了几晚
      	newItem:"",
      	type:"",
      	//outTradeNo:"",
      }
},
   components:{Navbar, TabItem},
   
   beforeRouteEnter (to, from, next) {
      next(vm => {
		//      console.log(1) 
		//       window.location.reload()
		   vm.select(vm.type)
		      })
    },
   
   //订单配置
   created:function(){
   	   var self = this;
  		this.$http.get(api+'/api/my/order/config').then((response) => {	
  			  if(response.body.result == "success"){
  			  	 self.sortselect=response.body.list;
  			  }else{
  			  	// error callback
  			  }  
		  }, (response) => {
		    // error callback
		    
		  });
   	   
   },
   
   mounted() {
   	  this.select('all');
   },
   
  methods:{
  	 select:function(type){
  	 	Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
         });
  		var self = this;
  		this.type=type;
  		//获取酒店分菜单数据
  		this.$http.get(api+'/api/my/order/list?page=1',{ params:{type:type } }).then((response) => {	
  			   Indicator.close();
		       self.tent=response.body.list;
		       
		       for (var i=0;i<response.body.list.length;i++)
               {
               	self.status.push(response.body.list[i].orderStatus);
               	//酒店点击按钮
               	self.startDate=response.body.list[i].startDate.toLocaleString().substr(5);
               	self.endDate=response.body.list[i].endDate.toLocaleString().substr(5);
               	var x = new Date(self.endDate) - new Date(self.startDate);
               	self.Period.push(x/(3600000*24));
               	//console.log(self.Period);	
                }
		  }, (response) => {
		    // error callback
		  }); 		
   },
   
   
    //支付的请求
    pay:function(outTradeNo){
  		var self = this;
  		this.$http.post(api+'/api/hotel/pay/exist/order',{outTradeNo:outTradeNo }).then((response) => {	
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
  	//未入住详情
  	notdetails:function(outTradeNo){
  		    
          var self = this;
		  		this.$http.post(api+'/api/my/order/del',{outTradeNo:outTradeNo }).then((response) => {
		  				this.$router.push('/notdetails');
				  }, (response) => {
				 
				    // error callback
				    }); 
		   
  	},
  	//发票点击
  	invoice:function(){
  		 var vm=this;
     	 MessageBox({
				  title: '温馨提示',
				  message: '发票均由您消费酒店开设，给您带来不便请谅解。',
				  showCancelButton: false
				});
		  				
  	},
  	
  	//详情点击
  	details:function(outTradeNo){
  		  console.log(outTradeNo)
		  	//this.$router.push({ name: 'details', params: { outTradeNo: outTradeNo }});
		  	location.href="#/details/"+outTradeNo;
  	},
  	
  	//评价跳转
  	assess:function(outTradeNo){
  		 //this.$router.push('/assess');
  		 location.href="#/assess/"+outTradeNo;
  	},
  	
  	 
  	//删除订单的请求
  	delit:function(outTradeNo,type){
  		
  	   MessageBox.confirm('是否删除订单').then(action => {
          var self = this;
		  		this.$http.post(api+'/api/my/order/del',{outTradeNo:outTradeNo }).then((response) => {
		  				 var message=response.body.message;
		  				 var title="提示";
				   MessageBox.alert(message, title);
				   this.select(this.type);
				   
				  }, (response) => {
				 
				    // error callback
				    }); 
		     });
		     
		     
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
     
     //退款请求
     refund:function(outTradeNo,type){
  	    MessageBox.confirm('是否退款').then(action => {
          var self = this;
		  		this.$http.post(api+'/api/my/order/refund',{outTradeNo:outTradeNo }).then((response) => {
		  				 var message=response.body.message;
		  				 var title="提示";
				   MessageBox.alert(message, title);
				   this.select(this.type);
				  }, (response) => {
				 
				    // error callback
				    }); 
		     });
},
     
   }
 }
</script>
<style scoped="scoped">
  .mint-tab-container{
  	margin-top: 3px;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #8a6e59;
    color: #8a6e59;
    margin-bottom: 0px;
    background-color:#77a984 ;
    font-size: 12px;
}

ul {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    list-style: none;
    width: 94%;
    height: 40px;
    line-height: 26px;
    margin-left: 3%;
    height: 100%;
}

ul li {
    width: 100%;
    height:169px;
    float: left;
    text-align: center;
    /*border: 1px solid #D2D2D2;*/
    -webkit-box-shadow:0 0 10px #D2D2D2;  
  -moz-box-shadow:0 0 10px #D2D2D2;  
  box-shadow:0 0 10px #D2D2D2;
}
.mint-navbar .mint-tab-item {
    padding: 17px 0;
    font-size: 12px!important;
    background-color:#77a984 ;
    color: #FFFFFF;
}
</style>
