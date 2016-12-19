<template>
	<div>
	  <div class="order-part" >
	    <div class="order-list" >
	            <ul class="order-list-ul">
	                <li class="order-item">
	                        <div class="item-part item-name">
	                           杭州四季酒店
	                        </div>
	                        <div class="item-part item-info">
	                          <span>11.12至12.11（5晚）</span><br />
	                           <span>共￥123元</span>
	                        </div>
	                        <div class="item-part nomoney">
	                          <span>qq至qqq（5晚）</span>
	                          
	                        </div>
	                        <div class="item-part item-bottom">
	                            <a  class="delete">删除订单</a>
	                        </div>
	                </li>
	                <span style="font-size: 12px;">退款将在24小时内入账，如有疑问，请联系客服</span>
	            </ul>
	        </div>
        </div>
  </div>
</template>

<script type="es6">
  import { api } from '../assets/js/common';
  import { Cell } from 'mint-ui';
 
 export default{
 	data(){
      return {
      type:"refund",
      tuikuan:"",
    }
  },
     //获取退款列表
  	created:function(type){
  		var type=this.type;
       var vm=this;
  		this.$http.get(api+'/api/my/refund/list?page=1',{ params:{type:type } }).then((response) => {
  			if(response.body.result == "success"){
  		     vm.tuikuan=response.body.list;
  			}   
		  }, (response) => {
		    // error callback
		  });
  		
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
    width: 92%;
   
    line-height: 40px;
    margin-left: 4%;
    height: 265px;
}

ul li {
    width: 100%;
    float: left;
    text-align: center;
    border: 1px solid #D2D2D2;
}

.order-part .order-list .order-list-ul .order-item .item-info{
	
    border-bottom: 1px solid #ddd;
    height:45px;
    font-size: 14px;
    color: #999;
    text-align: left;
    line-height: 22px;
    padding: 5px 10px;
}
.order-part .order-list{
	padding:0px;
	width:100%;
	
}
.order-part .order-list .order-list-ul .order-item .nomoney {
    height: 55px;
    line-height: 55px;
    font-size: 16px;
    color: #2d2d2d;
    border-bottom: 1px solid #ddd;
    text-align: left;
}
</style>
