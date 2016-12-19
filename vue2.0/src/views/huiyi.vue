<template>
  <div>

   <mt-cell title="我的帖子" icon="more"  is-link @click.native="goRouter(1)">
   	 <img src="../assets/images/tiezi.png" slot="icon" width="18" height="18"/>
   </mt-cell>
   <mt-cell title="我的评论" icon="more" is-link @click.native="goRouter(2)">
   	 <img src="../assets/images/pinglun.png" slot="icon" width="18" height="18"/>
   </mt-cell>
   <mt-cell title="我的私信" icon="more" is-link @click.native="goRouter(3)">
   	 <img src="../assets/images/sixin.png" slot="icon" width="18" height="18"/>
   </mt-cell>
   <mt-cell title="我的收藏" icon="more" is-link @click.native="goRouter(4)">
   	 <img src="../assets/images/shouchang.png" slot="icon" width="18" height="18"/>
   </mt-cell>
   

  </div>
</template>

<script type="es6">
 import { Cell } from 'mint-ui';
 export default{
 	data(){
      return {
        songList: []
      }
   },
   methods:{
      goRouter(index){
        switch(index){
          case 1:this.$router.push({path:''});break;
          case 2:this.$router.push({path:''});break;
          case 3:this.$router.push({path:''});break;
          case 4:this.$router.push({path:''});break;
          
        }
      }
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
    margin-right: 10px;
}
</style>
