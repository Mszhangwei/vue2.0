<template>
  <div>
	   <mt-cell title="我的订单" icon="more"  is-link @click.native="goRouter(1)">
	   	 <img src="../assets/images/order.png" slot="icon" width="18" height="18"/>
	   </mt-cell>
	   <mt-cell title="我的退款" icon="more" is-link @click.native="goRouter(2)">
	   	 <img src="../assets/images/money.png" slot="icon" width="18" height="18"/>
	   </mt-cell>
	   <mt-cell title="我的发票" icon="more" is-link @click.native="goRouter(3)">
	   	 <img src="../assets/images/invoice.png" slot="icon" width="18" height="18"/>
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
          case 1:this.$router.push({path:'order'});break;        //订单列表
          case 2:this.$router.push({path:'nomoney'});break;      //退款
          case 3:this.$router.push({path:'bill'});break;         //发票
          
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
