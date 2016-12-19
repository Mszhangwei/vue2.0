<template>
	<div>
	  <div style="position: relative;margin-bottom: 10px;" v-for="item in jifen">
	    <mt-cell :title="item.order.hotelName" :value="'获得'+item.changeScore" :label="'入住：'+item.order.startDate" ></mt-cell>
	    <p class="aboutstyle">离店：{{ item.order.endDate }}</p>
	    <p class="aboutstyle2">{{ item.description }}</p>
	  </div>
  </div>
</template>

<script type="es6">
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
</style>
