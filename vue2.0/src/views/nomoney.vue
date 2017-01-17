<template>
	<div>
		<mt-header fixed title="我的退款">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
        </router-link>
      </mt-header>
     <div class="mt-40">
	  <div class="order-part" v-for="(item,index) in refund">
	    <div class="order-list" >
	            <ul class="order-list-ul">
	                <li class="order-item">
	                        <div class="item-part item-name">
	                           {{item.hotel.name}}
	                        </div>
	                        <div class="item-part item-info">
                            <span>{{item.startDate}}至{{item.endDate}}（{{item.days}}晚）</span><br />
	                          <span>{{item.roomNum}}间<label class="notpaysy">总价：￥{{item.totalPrice}}元</label></span>
	                        </div>
	                        <div class="item-part nomoney">
	                        	
	                          <div class="ranLine" v-if="orderstatus[index]==='waitForRefund'">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="ranLine2" v-if="orderstatus[index]==='refunded'">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
	                          <div class="tuikuan" >
	                          	<span style="float:left;">业务已受理</span> 
	                          	<span >退款中</span>
	                          	<span style="float:right;">退款成功</span>
	                          </div>
	                        </div>
	                        <div class="item-part item-bottom" >
	                            <a  class="more" style="float:right;" @click="delte(item.outTradeNo)">删除订单</a>
	                        </div>
	                </li>
	                <span style="font-size: 12px;">退款将在24小时内入账，如有疑问，请<label style="color:#8a6e59;">联系客服</label></span>
	            </ul>
	            
	        </div>
        </div>
      </div>
  </div>
</template>

<script>
  import { api } from '../assets/js/common';
  import { Cell,Progress,MessageBox } from 'mint-ui';
 
 export default{
 	data(){
      return {
      type:"unRefund",
      refund:[],
      orderstatus:[],
    }
  },
   //components:{Progress},
     //获取退款列表
  	created:function(type){
  		var type=this.type;
       var vm=this;
  		this.$http.get(api+'/api/my/refund/list?page=1',{ params:{type:type } }).then((response) => {
  			if(response.body.result == "success"){
  		     vm.refund=response.body.list;
  		     for(var i=0;i<response.body.list.length;i++){
  		     	vm.orderstatus.push(response.body.list[i].orderStatus);
  		        }
  		     
  			}   
		  }, (response) => {
		    // error callback
		  });
  		
  	  },
  	methods:{  
  	 delte:function(outTradeNo){
  	 	
  	   MessageBox.confirm('是否删除订单').then(action => {
          var self = this;
		  		this.$http.post(api+'/api/my/refund/del',{outTradeNo:outTradeNo }).then((response) => {
		  				 var message=response.body.message;
		  				 var title="提示";
				   MessageBox.alert(message, title);
				   window.location.reload()
				  }, (response) => {
				 
				    // error callback
				    }); 
		     });
    },
   
  },
 
 }
</script>
<style scoped="scoped">
ul {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    list-style: none;
    width: 90%;
   
    line-height: 40px;
    margin-left: 5%;
    height: 310px;
}

ul li {
    width: 100%;
    float: left;
    text-align: center;
    -webkit-box-shadow:0 0 10px #D2D2D2;  
  -moz-box-shadow:0 0 10px #D2D2D2;  
  box-shadow:0 0 10px #D2D2D2;
}

.order-part .order-list .order-list-ul .order-item .item-info{
	
    border-bottom: 1px solid #ddd;
    height:55px;
    font-size: 14px;
    color: #999;
    text-align: left;
    line-height: 22px;
    padding-top:10px;
}
.order-part .order-list{
	padding:0px;
	width:100%;
	
}

.mt-progress {
    height: 40px;
    line-height: 40px;
}


</style>
