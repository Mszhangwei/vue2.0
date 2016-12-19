<template>
  <div id="app2">
    <k-head></k-head>
    <div style="margin-top: 40px;"> 
    	<keep-alive>
      <router-view class="view"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import kHead from './component/header/head'
export default {
  data () {
    return {
    }
  },
  components: { kHead }
}


</script>

<style>
body {
    display: block;
    margin: 0px;
    padding: 0px;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    background-color: #E4E4E4;
}
ul{
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    list-style: none;
    width: 80%;
    height: 40px;
    line-height: 40px;
    margin-left: 10%;
}
ul li{
	width:33.3%;
	float: left;
	text-align: center;
}
a:-webkit-any-link {
    color: black;
    text-decoration: none;
    cursor: auto;
}
.mint-header {
    
    background-color: green!important;
    }
ul li a.router-link-active{color:green;}
</style>
