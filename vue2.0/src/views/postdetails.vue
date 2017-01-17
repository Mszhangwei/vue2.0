<template>
  <div>
    <mt-header fixed title="帖子详情">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
        </router-link>
      </mt-header>
    <div  class="weui-media-box3 weui-media-box_appmsg mt-40">
      <div  class="weui-media-box__hd3">
        <img src="http://img.zlmhotel.com/image/jpeg/Q0XUhwljyE.jpg" alt="" class="weui-media-box__thumb3">
      </div> 
        <div class="pushdate"><span>2016-12-23</span><p class="weui-media-box__desc">终于周五了感觉身体被掏空了</p></div>
    </div>
    <p class="plr-15">xxxx</p>
    <p class="plr-10">地方v很柔软VM的v非会员的聚会的电话费入党据都市大春v和顿饭长度UR也很方便个东方雨虹是私家车</p>
    <div class="plr-15">
       <img src="../assets/images/bgground.png" style="width:100%;max-width: 100%;height:100%;">
    </div>
    <div class="bottom"></div>
    <!--大家都在看-->
    <div class="see">大家都在看</div>
    <div class="weui-media-box weui-media-box_appmsg">
      <div class="weui-media-box__hd">
         <img src="http://img.zlmhotel.com/image/jpeg/zyRaojxo3X.jpg?imageMogr2/thumbnail/300x" class="weui-media-box__thumb">
      </div> 
      <div class="weui-media-box__bd3"><p class="weui-media-box__desc">想吃点东西吗</p></div>
    </div>
    <div class="bottom"></div>
    <!--回复-->
  <div class="replace">
     <div  class="weui-media-box3 weui-media-box_appmsg">
      <div  class="weui-media-box__hd3">
        <img src="http://img.zlmhotel.com/image/jpeg/Q0XUhwljyE.jpg" class="weui-media-box__thumb3">
      </div> 
        <div class="pushdate"><span>2016-12-23</span><p class="weui-media-box__desc">终于周五了</p></div>
    </div>
    <p class="content">田野</p>
    <span class="huifu">回复</span>
  </div>
  <!--评论-->
  <div style="height:40px;"></div>
  <div class="fixfoot">
     <input placeholder="评论一下" class="input">
     <div class="zan"><img src="../assets/images/heart.png"></div>
     <div class="zan"><img src="../assets/images/verygood.png"></div>
     <div class="messgae">回复</div>
  </div>
</div> 
</template>

<script type="es6">
 import {api} from '../assets/js/common';
 export default{
 	data(){
      return {
       
      }
   },
   beforeRouteEnter (to, from, next) {
      next(vm => {
       
        vm.getList();
       
      })
    },
  //刚开始调取数据
  methods:{
     getList:function(){
   	   console.log(this.$route.params.tiebaId)
   	   let tiebaId = this.$route.params.tiebaId;
  		this.$http.get(api+'/api/tieba/topic/detail',{ params:{tiebaId:tiebaId } }).then((response) => {	
  			     
		  }, (response) => {
		    // error callback
		    
		  });
   	   
   }
  },

 }
</script>
<style scoped="scoped">




</style>
