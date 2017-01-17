<template>
  <div>
     <mt-header fixed title="我的评论">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
        </router-link>
      </mt-header>
      
      <div class="mt-40">
      	<div class="weui-media-box weui-media-box_appmsg" v-for="item in collection">
                    <div class="weui-media-box__hd"  @click="dianji(item.tiebaId)">
                        <img class="weui-media-box__thumb" :src="item.image" alt="">
                    </div>
                    <div class="weui-media-box__bd">
                      <div @click="dianji(item.tiebaId)">
                        <p class="weui-media-box__title" style="margin-bottom: 5px;">{{item.authorName}}<span   class="pushdate">{{item.publishTime}}</span></p>
                        <p class="weui-media-box__desc">{{item.title}}</p>
                      </div>
                        <p class="collectioncs">
                        <span ><img src="../assets/images/view.png" class="iconsty">{{item.viewNum}}</span>
                        <span class="ml8"><img src="../assets/images/comment.png" class="iconsty">{{item.commentNum}}</span>
                    <!--收藏-->
                        <span class="ml8" v-bind:class="{'hearted':item.favorite}" v-on:click='collect(item,item.id,item.tiebaId)'>
                          <template v-if='!item.favorite'>
                             <img src="../assets/images/heart.png" class="iconsty" >
                             
                          </template>
                          <template v-else>
                             <img src="../assets/images/yiheart.png" class="iconsty" >
                          </template>{{item.favoriteNum}}
                        </span> 
                     <!--点赞-->
                       <span class="ml8" v-bind:class="{'hearted':item.up}" v-on:click='heart(item,item.id,item.tiebaId)'>
                          <template v-if='!item.up'>
                          <img src="../assets/images/verygood.png" class="iconsty" >
                         
                          </template> 
                          <template v-else>
                          <img src="../assets/images/yizan.png" class="iconsty" >
                          
                          </template> {{item.upNum}}
                        </span>   
                        
                        </p>
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
    
  created(){
      this.getList()
    },
   
   methods:{
       getList:function(page){
  		var page=this.page;
      var vm=this;
  		this.$http.get(api+'/api/my/comment/topics',{  params : {page: page} }).then((response) => {
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
          
      dianji:function(tiebaId){
            location.href="#/postdetails/"+tiebaId;
      },

     
    //点赞功能
				heart: function(item,id,tiebaId,method){
					if(item.up){
            //up=true
						//alert('取消点赞成功！');
             method=this.method;
             this.$http.post(api+'/api/tieba/topic/up',{topicId:id,tiebaId:tiebaId,method:method }).then((response) => {
                      if(response.body.result == "success"){
                             Toast({
                                  message: "取消点赞成功",
                                  duration: 500
                                  });
                              this.getList()
                              item.up = false;
                      }else if(response.body.result == "failure"){
                              Toast({
                                  message: "请先登录，您没有此权限",
                                  duration: 1000
                                  });
                        }     
		       }, (response) => {
		    // error callback
		  });

		}else{
						//点赞成功，成功回调中执行以下操作
             this.$http.post(api+'/api/tieba/topic/up',{topicId:id,tiebaId:tiebaId,method:"up" }).then((response) => {
                        if(response.body.result == "success"){
                                Toast({
                                    message: "点赞成功",
                                    duration: 500
                                    });
                                  this.getList()
                              item.up = true;
                        }else if(response.body.result == "failure"){
                              Toast({
                                  message: "请先登录，您没有此权限",
                                  duration: 1000
                                  });
                        }   
             
            }, (response) => {
              // error callback
            });
                  
						
					}
				},

        //收藏
    	collect: function(item,id,tiebaId){
					if(item.favorite){
            //up=true
						//alert('取消收藏成功！');
             this.$http.post(api+'/api/tieba/topic/collect',{topicId:id,tiebaId:tiebaId,method:"cancel" }).then((response) => {
                      if(response.body.result == "success"){
                              Toast({
                                  message: "取消收藏成功",
                                  duration: 500
                                  });
                                  this.getList()
                                  item.favorite = false;
                      }else if(response.body.result == "failure"){
                                            Toast({
                                                message: "请先登录，您没有此权限",
                                                duration: 1000
                                                });
                              }    
		      }, (response) => {
		    // error callback
		  });
				
					}else{
						//当前收藏此篇文章的操作，成功回调中执行以下操作
             this.$http.post(api+'/api/tieba/topic/collect',{topicId:id,tiebaId:tiebaId,method:"collect" }).then((response) => {
                    if(response.body.result == "success"){
                            Toast({
                                message: "收藏成功",
                                duration: 500
                                });
                                this.getList()
                                item.favorite = true;
                    }else if(response.body.result == "failure"){
                              Toast({
                                  message: "请先登录，您没有此权限",
                                  duration: 1000
                                  });
                        }    
		      }, (response) => {
		    // error callback
		    });
						//alert('收藏成功！');
						
					}
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

.mint-cell img {
    vertical-align: middle;
    margin-right: 10px;
}


</style>
