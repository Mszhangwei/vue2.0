<template>
  <div>
     <mt-header fixed title="我的私信">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
        </router-link>
      </mt-header>
      
      <div class="mt-40">
      	<div class="weui-media-box weui-media-box_appmsg" v-for="item in collection">
                    <div class="weui-media-box__hd2">
                        <img class="weui-media-box__thumb2" :src="item.image" alt="">
                    </div>
                    <div class="weui-media-box__bd2">
                        <p class="weui-media-box__title" style="margin-bottom: 5px;">{{item.authorName}}<span   class="pushdate">{{item.publishTime}}</span></p>
                        <p class="weui-media-box__desc">{{item.title}}</p>
                       
                    </div>
                </div>
     </div>
  </div>
</template>

<script>
 import { Cell,Toast } from 'mint-ui';
 import {api} from '../assets/js/common';
 export default{
 	data(){
      return {
         collection:[],
         page:1,
         data:[],
         method:"cancel",
         upNum:"",
        //  heartnum:[],
       
      }
   },
    
  mounted:function(page){
  		var page=this.page;
      var vm=this;
  		this.$http.get(api+'/api/my/collection/list',{  params : {page: page} }).then((response) => {
  			if(response.body.result == "success"){
  		     vm.collection=response.body.list;
              //  for(var i=0; i<response.body.list.length;i++){
              //     vm.heartnum.push(response.body.list[i].upNum);
              //      console.log(vm.heartnum)
              //  }
  			}else{
  				
  			  }   
		  }, (response) => {
		    // error callback
		  });
  		
  	  },
   
   methods:{
      
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

.mint-cell img {
    vertical-align: middle;
    margin-right: 10px;
}


</style>
