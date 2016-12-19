<template>
   <div>
      <mt-header fixed title="贴吧">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click="routerBack()"></mt-button>
        </router-link>
      </mt-header>
   </div>
  
</template>

<script type="es6">
  import { Navbar, Header} from 'mint-ui';
  export default {
    name:'head-nav',
    data(){
      return {
       headNav:{}
      }
    },
    components:{Navbar,},
    methods:{
      routerBack(){
        this.$router.go(-1);
      }
    },
  }
</script>

<style>
  .mint-tab-item{padding: 12px 0 !important;}
  .mint-tab-item-label{font-size: 16px !important;}
  .logo-container {
    background-color: green;
    overflow: hidden;
    height: 51px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1050;
    text-align: center;
    line-height: 51px;
    color:#ffffff;
}
</style>
