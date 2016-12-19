<template>
  <div>
	<mt-navbar v-model="selected">
	  <mt-tab-item v-for="(item,index) in sortselect" :id="index" @click.native="select(item.type)">{{ item.name }}</mt-tab-item>
	</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
	<!--全部-->
  <mt-tab-container-item :id="0">
  	<div v-for="item in tent">
  	  <navbar class="order-part" >
	      <div class="order-list" >
	            <ul class="order-list-ul">
	                <li class="order-item">
	                        <div class="item-part item-name">{{item.hotel.name}}</div>
	                        <div class="item-part item-info">
	                            {{item.startDate}}至{{item.endDate}} （5晚）<br>
	                            {{item.roomNum}}间 总价{{item.totalPrice}}
	                        </div>
	                        <div class="item-part item-bottom">
	                            <a  class="delete" @click="delit(item.outTradeNo)">删除订单</a>
	                            <a class="more" style="float:right;"> 退款</a>
	                        </div>
	                </li>
	            </ul>
	        </div>
        </navbar>
     </div>
  </mt-tab-container-item>
  <!--未支付-->
  <mt-tab-container-item :id="1">
    <div v-for="item in tent">
  	  <navbar class="order-part" >
	      <div class="order-list" >
	            <ul class="order-list-ul">
	                <li class="order-item">
	                        <div class="item-part item-name">{{item.hotel.name}}</div>
	                        <div class="item-part item-info">
	                            {{item.startDate}}至{{item.endDate}} （5晚）<br>
	                            {{item.roomNum}}间 总价￥{{item.totalPrice}}元
	                        </div>
	                        <div class="item-part item-bottom">
	                            <a  class="delete" @click="delit(item.outTradeNo)">删除订单</a>
	                            <a class="more" style="float:right;" @click="pay(item.outTradeNo)"> 支付</a>
	                        </div>
	                </li>
	            </ul>
	        </div>
        </navbar>
     </div>
  </mt-tab-container-item>
  <!--未入住-->
  <mt-tab-container-item :id="2">
    <div v-for="item in tent">
  	  <navbar class="order-part" >
	       <div class="order-list" >
	            <ul class="order-list-ul">
	                <li class="order-item">
	                        <div class="item-part item-name">{{item.hotel.name}}</div>
	                        <div class="item-part item-info">
	                            {{item.startDate}}至{{item.endDate}} （5晚）<br>
	                            {{item.roomNum}}间 总价{{item.totalPrice}}
	                        </div>
	                        <div class="item-part item-bottom">
	                            <a  class="delete" @click="refund(item.outTradeNo)">退款</a>
	                            <a class="more" style="float:right;" @click=changes()> 改签</a>
	                        </div>
	                </li>
	            </ul>
	        </div>
       </navbar>
    </div>
  </mt-tab-container-item>
  <!--已入住-->
  <mt-tab-container-item :id="3">
    <div v-for="item in tent">
  	   <navbar class="order-part" >
	        <div class="order-list" >
	            <ul class="order-list-ul">
	                <li class="order-item">
	                        <div class="item-part item-name">{{item.hotel.name}}</div>
	                        <div class="item-part item-info">
	                          <p>{{item.startDate}}至{{item.endDate}} （5晚）</p>  
	                           <p>{{item.roomNum}}间 总价￥{{item.totalPrice}}</p> 
	                        </div>
	                        <div class="item-part item-bottom">
	                            <a  class="delete" @click="delit(item.outTradeNo)">删除订单</a>
	                            <a class="more" style="float:right;" @click="refund(item.outTradeNo)"> 退款</a>
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

<script type="es6">
 import { Navbar, TabItem,MessageBox,Indicator  } from 'mint-ui';
 import {api} from '../assets/js/common';
 export default{
 	data(){
      return {
        selected:{},
        listdata:[],
        sortselect:[],
      	tent:[],	
      }
},
   components:{Navbar, TabItem},
   
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
   
   
  methods:{
  	 select:function(type){
  	 	Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
         });
  		var self = this;
  		this.$http.get(api+'/api/my/order/list?page=1',{ params:{type:type } }).then((response) => {	
  			   Indicator.close();
		       self.tent=response.body.list;
		  }, (response) => {
		 
		    // error callback
		  });
  		
},

    //支付的请求
    pay:function(outTradeNo){
  		var self = this;
  		this.$http.post(api+'/api/hotel/pay/exist/order',{outTradeNo:outTradeNo }).then((response) => {	
		       //self.tent=response.body.list;
		       if(response.body.result == "success"){
		       	   var message="支付成功";
				       MessageBox.alert(message, "提示");
		       }else{
		       	  var message=response.body.message;
				      MessageBox.alert(message, "提示");
		       }
		  }, (response) => {
		 
		    // error callback
		  });
  		
},
  	
  	//删除订单的请求
  	delit:function(outTradeNo){
  	   MessageBox.confirm('是否删除订单').then(action => {
          var self = this;
		  		this.$http.post(api+'/api/my/order/del',{outTradeNo:outTradeNo }).then((response) => {
		  				 var message=response.body.message;
		  				 var title="提示";
				   MessageBox.alert(message, title);
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
     
     //退款请求跳转
     refund:function(outTradeNo){
  	    MessageBox.confirm('是否退款').then(action => {
          var self = this;
		  		this.$http.post(api+'/api/my/order/refund',{outTradeNo:outTradeNo }).then((response) => {
		  				 var message=response.body.message;
		  				 var title="提示";
				   MessageBox.alert(message, title);
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
    border-bottom: 3px solid #77a984;
    color: #77a984;
    margin-bottom: -3px;
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
    width: 92%;
    height: 40px;
    line-height: 26px;
    margin-left: 4%;
    height: 100%;
}

ul li {
    width: 100%;
    float: left;
    text-align: center;
    border: 1px solid #D2D2D2;
}
</style>
