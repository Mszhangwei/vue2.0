<template>
  <div >
  	<mt-header fixed title="账户积分">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
        </router-link>
      </mt-header>
      <div class="mt-40">
  <div class="main-interface" v-for="item in jifen" >
  	 <!--支出-->
  	    <div v-if="item.changeMethod=='payment'">
        <h1 class="main-head">{{item.order.hotelName}}</h1>
        <div class="time">
            <div> <span>入店:</span>{{item.order.startDate}}<br>  <span>离店:</span>{{ item.order.endDate }}</div>
        </div>
        <div class="getIntegral">
            <span class="git">消费:{{item.changeScore}}分</span>
        </div>
        <div class="situation">
            <span>{{item.description}}</span> 
        </div>
       </div>
       <!--充值-->
       <div v-if="item.changeMethod=='recharge'">
        <h1 class="main-head">{{item.order.hotelName}}</h1>
        <div class="time">
            <div>{{ item.order.endDate }}</div>
        </div>
        <div class="getIntegral">
            <span class="pay">充值:{{item.changeScore}}分</span>
        </div>
        <div class="situation">
            <span>{{item.description}}</span> 
        </div>
       </div>
       <!--获得-->
       <div v-if="item.changeMethod=='rebate'">
        <h1 class="main-head">{{item.order.hotelName}}</h1>
        <div class="time">
            <div> <span>入店:</span>{{item.order.startDate}}<br>  <span>离店:</span>{{ item.order.endDate }}</div>
        </div>
        <div class="getIntegral">
            <span class="pay">获得:{{item.changeScore}}分</span>
        </div>
        <div class="situation">
            <span>{{item.description}}</span> 
        </div>
       </div>
    </div>
    </div>
    </div>
</template>

<script>
  import { api } from '../assets/js/common';
  import { Cell } from 'mint-ui';
 
 export default{
 	data(){
      return {
      page:1,
      jifen:[],
    }
  },
 
  	created:function(_data){
  		var page=this.page;
       var vm=this;
  		this.$http.get(api+'/api/my/score/list',{  params : {page: page} }).then((response) => {
  			if(response.body.result == "success"){
  		     vm.jifen=response.body.list;
  			}else{
  				
  			  }   
		  }, (response) => {
		    // error callback
		  });
  		
  	  },
   
    methods:{
     
    },
 
 }
</script>
<style scoped="scoped">
 .mint-cell{
 	   height:95px;
 }
 
 p {
    display: block;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
.mint-cell-title {
    padding-left: 10px;
    margin-top: 20px;
}
</style>
