<template>
	<div>
	<mt-header fixed title="评价酒店	">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
        </router-link>
      </mt-header>
  <div id="assess" class="assess-part">
    <div class="assess-main">
        <div class="grade">
            <span>请评分</span>
            <div>
                <span class="nochioced" v-bind:class="{chioced:(choice>0)}"v-on:click="grade(1)"></span>
                <span class="nochioced" v-bind:class="{chioced:(choice>1)}"v-on:click="grade(2)"></span>
                <span class="nochioced" v-bind:class="{chioced:(choice>2)}"v-on:click="grade(3)"></span>
                <span class="nochioced" v-bind:class="{chioced:(choice>3)}"v-on:click="grade(4)"></span>
                <span class="nochioced" v-bind:class="{chioced:(choice>4)}"v-on:click="grade(5)"></span>
            </div>
        </div>
        <div class="bottom"></div>
        <div class="label">
            <span>选择评价标签</span>
            <div>
                <span v-on:click="label_choice(1)" v-bind:class="{'choice':(cost==true)}">性价比高</span>
                <span v-on:click="label_choice(2)" v-bind:class="{'choice':(base==true)}">基础设施好</span>
                <span v-on:click="label_choice(3)" v-bind:class="{'choice':(server==true)}">服务好</span>
                <span v-on:click="label_choice(4)" v-bind:class="{'choice':(improve==true)}">待改善</span>
            </div>
        </div>
        <div class="bottom"></div>
        <div class="idea">
            <textarea placeholder="说说您的用户体验"  id="world" v-model="message" ></textarea>
            <span class="count">{{message.length}}/1000</span>
            <input type="file" @change="onFileChange" multiple id="submit" style="display:none">
            <label for="submit" ></label>
            <div  v-if="images.length>0" class="addImg" >
                <ul >
                    <li v-for="(key,image) in images"  >
                        <a href="#" >
                            <img v-bind:src="images[image]" width="60" height="60">
                        </a>
                    <span id="delete" @click='delImage(key)'>
                        &times;
                    </span >
                    </li>
                </ul>
            </div>
        </div>
        <a class="certain" @click=submit(this.choice,this.message,this.cost,this.base,this.server,this.improve)>
            评价
        </a>
    </div>

</div>
</div>
</template>

<script>
// import './assets/layer/layer.js'
 import { Cell,MessageBox,Toast } from 'mint-ui';
 import {api} from '../assets/js/common'
 import $ from 'jquery'
 var jq = $.noConflict();
 export default{
 	data(){
 		   return{
 		   	choice:0,//选择的星星个数默认为0，即评分为0
            cost:false,//性价比标签，默认为未选中
            base:false,//基础设施
            server:false,//服务
            improve:false,//待提升
            message:"",//用户评论，默认无
            images: [],
            url:[],
 		   }
    },

 
         

        methods:{
    //    tijiao
    submit:function(choice,message,cost){
        var choice=this.choice;
        var message=this.message;
        var self=this;
        var cost=this.cost;
        var base=this.base;
        var server=this.server;
        var improve=this.improve;
   	   console.log(this.$route.params.outTradeNo)
   	   let outTradeNo = this.$route.params.outTradeNo;
          if(5>this.message.length||this.message.length>1000){
                      Toast('至少输入五个字');
            //    ('请输入5-1000的字符串')	
            }else{
                 // 图片上传
                 
                var img=this.images;
                for(var i=0;i<img.length;i++){
                    console.log(1)
                    var formData = new FormData();
                        formData.append('image', $('#submit')[0].files[0]); 
                        formData.append('type', 'feedback');
                       
                        $.ajax({
                            headers: {Accept: "application/vnd.zlm.v2+json"},
                            url: api+'/api/tieba/image/upload',
                            type: 'POST',
                            cache: false,
                            data: formData,
                            processData: false,
                            contentType: false
                        }).done(function(res) {
                             self.url.push(res.url);
                              console.log(self.url)
                        }).fail(function(res) {});
                   }
                
                

                this.$http.post(api+'/api/assess',{outTradeNo:outTradeNo,
                            grade:choice,content:message,cost:cost,base:base,server:server,improve:improve }).then((response) => {   
                                var message=response.body.message;
                                MessageBox.alert(message,'提示').then(action => {
                                location.href="#/index";
                            });
                        }, (response) => {
                            // error callback
                            
                        })
            }
  		
   	   
   },



            grade:function(star){
                this.choice=star;
                console.log(this.choice)
            },
            label_choice:function(e){
                switch (e){
                    case 1:this.cost=!this.cost;break;
                    case 2:this.base=!this.base;break;
                    case 3:this.server=!this.server;break;
                    case 4:this.improve=!this.improve;break;
                }
            },
            onFileChange(e) {
                //console.log(e);
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createImage(files);

            },
            createImage(file) {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }

                var image = new Image();         
                var vm = this;
                var leng=file.length;
                for(var i=0;i<leng;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    if(vm.images.length>=3){
                        alert('只能加载3张图片');
                        return false;
                    };
                    reader.onload =function(e){
                        for(var i=0;i<vm.images.length;i++){
                            if(vm.images[i]==e.target.result){
                                return false;
                            }
                        }
                        vm.images.push(e.target.result);
                    };
                }
            },
            delImage:function(index){
                this.images.splice(index,1);
            },
            removeImage: function(e) {
                this.images = [];
            },
        },
         beforeRouteEnter (to, from, next) {
                next(vm => {
                    vm.message = '';
                    vm.images=[];
                    vm.choice='';  
                })
    }

 }
</script>
<style scoped="scoped">
   ul {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    list-style: none;
    width: 100%;
    height: 40px;
    line-height: 40px;
    /* margin-left: 10%; */
}

</style>
