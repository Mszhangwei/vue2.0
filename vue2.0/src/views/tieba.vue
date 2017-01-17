<template>
  <div>
     <mt-header fixed title="贴吧">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
        </router-link>
      </mt-header>
   <mt-cell title="我的帖子" icon="more"  is-link @click.native="goRouter(1)" class="mt-40">
   	 <img src="../assets/images/tiezi.png" slot="icon" width="16" height="16"/>
   </mt-cell>
   <mt-cell title="我的评论" icon="more" is-link @click.native="goRouter(2)">
   	 <img src="../assets/images/pinglun.png" slot="icon" width="16" height="16"/>
   </mt-cell>
   <mt-cell title="我的私信" icon="more" is-link @click.native="goRouter(3)">
   	 <img src="../assets/images/sixin.png" slot="icon" width="16" height="16"/>
   </mt-cell>
   <mt-cell title="我的收藏" icon="more" is-link @click.native="goRouter(4)">
   	 <img src="../assets/images/shouchang.png" slot="icon" width="16" height="16"/>
   </mt-cell>
  
  </div>
</template>

<script type="es6">
 import { Cell,Picker  } from 'mint-ui';
 export default{
 	data(){
      return {
        songList: [],
       
      }
   },
   methods:{
      goRouter(index){
        switch(index){
          case 1:this.$router.push({path:'/post'});break;
          case 2:this.$router.push({path:'/comments'});break;
          case 3:this.$router.push({path:'/letter'});break;
          case 4:this.$router.push({path:'/collection'});break;
          
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
body {
    background-color: #C4C4C4;
}
.mint-cell img {
    vertical-align: middle;
    margin-right: 6px;
}
</style>
