<template>
  <div>
		<mt-navbar v-model="selected">
		  <mt-tab-item v-for="(item,index) in fapiao" :id="index" @click.native="select(item.type)">{{ item.name }}</mt-tab-item> 
		</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
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
	                            <a class="more" style="float:right;"> 问题反馈</a>
	                        </div>
	                </li>
	            </ul>
	        </div>
        </navbar>
     </div>
  </mt-tab-container-item>
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
	                            <a class="more" style="float:right;">问题反馈</a>
	                            <a  class="delete" @click="delit(item.outTradeNo)">删除订单</a>
	                        </div>
	                </li>
	            </ul>
	            <span style="font-size: 12px;">非常感谢您使用住了吗酒店订房系统，住了吗系统是酒店直销订房，所有发票均有酒店开出，如有问 题请反馈，谢谢！给您带来不便，敬请谅解！</span>
	        </div>
        </navbar>
    </div>
  </mt-tab-container-item>
  
  
</mt-tab-container>
  </div>
</template>

<script type="es6">
 import { Navbar, TabItem,MessageBox } from 'mint-ui';
 import {api} from '../assets/js/common';
 export default{
 	data(){
      return {
        selected:{},
        listdata:[],
        fapiao:[],
      	tent:[],	
      }
},
   components:{Navbar, TabItem},
   
   created:function(){
   	  var self = this;
  		this.$http.get(api+'/api/my/invoice/config').then((response) => {	
  			if(response.body.result=="success"){
  				self.fapiao=response.body.list;
  			 }
		       
		  }, (response) => {
		 
		    // error callback
		  });
   	  
   	
   },
   
   
  methods:{
  	 select:function(type){
  		var self = this;
  		this.$http.get(api+'/api/my/invoice/list?page=1',{ params:{type:type } }).then((response) => {	
		       self.tent=response.body.list;
		  }, (response) => {
		 
		    // error callback
		  });
  		
},
  	
  	//删除发票的请求
  	delit:function(outTradeNo){
  	   MessageBox.confirm('是否删除订单').then(action => {
          var self = this;
		  		this.$http.post(api+'/api/my/invoice/del',{outTradeNo:outTradeNo }).then((response) => {
		  				 var message=response.body.message;
		  				 var title="提示";
				   MessageBox.alert(message, title);
				  }, (response) => {
				    // error callback
				    }); 
		     });
},
     
     //退款请求跳转
     refund: function(){
     	  MessageBox.confirm('是否退款?').then(action => {
           this.$router.push({ path: 'nomoney' });
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
    
    line-height: 26px;
    margin-left: 4%;
    height: 175px;
}

ul li {
    width: 100%;
    float: left;
    text-align: center;
    border: 1px solid #D2D2D2;
}
</style>
