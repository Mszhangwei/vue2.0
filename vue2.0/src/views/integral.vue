<template>
  <div>
  	<div class="recharge-part">
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
      <mt-button size="large" type="primary" @click="yes(this.rmb)" >确定</mt-button>    
  </div>
  
  </div>
</template>

<script type="es6">
	
 import { Button } from 'mint-ui';
 import {api} from '../assets/js/common';
 export default{
 	
 	data(){
      return {
        recharge: [],
        selected:0,
        rmb:"",
      }
   },
   
   //components:{
   	   //"mt-button":{
   	   	 //props:['this.rmb'],
   	   	 //template:"<mt-button size='large' type='primary' @click='yes(this.rmb)' >确定</mt-button> ",
   	   	 //methods:{
   	   	 	//yes:function(rmb){
  		   //var rmb=this.rmb;
  		//this.$http.get(api+'/api/my/recharge',{params:{rmb:rmb}}).then((response) => {
  				//console.log(response.body);  
		  //}, (response) => {
		   //error callback
		 //});	
  	  //}
   	   	 //},
   	   //}
   //},

   methods:{
   	   //选择的方法
       choiceClick:function(index){
       this.selected=index;   
    },

    //点击获得参数值
     sure:function(rmb){
  		this.rmb=rmb;
  	},
  	
  	//点击传参
	  	yes:function(rmb){
	  		var rmb=this.rmb;
	  		this.$http.get(api+'/api/my/recharge',{params:{rmb:rmb}}).then((response) => {
	  				console.log(response.body);  
			         }, (response) => {
			           //error callback
			     });	
	  	  }
  	
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
    background-color: green;
}
.mint-button--large {
    display: block;
     width: 90%; 
    margin-left: 5%;
        margin-top: 50px;
}
</style>
