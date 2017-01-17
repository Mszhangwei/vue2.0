<template>
  <div class="feedback-part" id="app" style="height:100%">
   <mt-header fixed title="意见反馈">
      	<router-link to="/" slot="left" >
            <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
        </router-link>
      </mt-header>
    <div class="title">请留下您的宝贵意见</div>
    <div class="choice-kind"  v-on:click="close()">
        <span >问题类型</span>&nbsp;&nbsp;&nbsp;<strong>{{titleshow}}</strong><img src="../assets/images/jiantou.png" height="14px">
    </div>
    
    <div class="bottom"></div>
    
	<div class="roomstate_select_picker" v-show='isshow'>
			<div class="roomstate_select_btn">
				<!--<a class="roomstate_select_ltbtn" @click="cancel()">取消</a>-->
				<a class="roomstate_select_rtbtn" @click="cancel()">取消</a>
			</div>
            <div class="answer">
            <div class="picker-item" v-for="item in feedback" @click="chose(item.type,item.name)">
                  {{item.name}}
            </div>
            </div>
		</div>
    <div class="proplem">
        <textarea placeholder="请简要描述您遇到的问题，我们会尽快为您解决（最少五个字）"     id="world" v-model="message" ></textarea>
		
        <span class="count">{{message.length}}/1000</span>
        <input type="file"  @change="onFileChange" multiple id="submit" style="display: none">
        <label for="submit" v-on:click="choiceImg()"></label>
        <strong>（上传图片，最多上传3张）</strong>
        <div  v-if="images.length>0" class="addImg" >
            <ul >
                <li v-for="(key,image) in images"  >
                    <a href="#" >
                        <img :src="images[image]" width="60" height="60">
                    </a>
                    <span id="delete" @click='delImage(key)'>
                        &times;
                    </span >
                </li>
            </ul>
        </div>
	
    </div>
    <div class="bottom"></div>
    <span class="certain" @click="validate(this.type,this.titleshow)">提交</span>
</div>
</template>
<script>

 import { Cell,Picker,MessageBox,Toast } from 'mint-ui';
 import {api} from '../assets/js/common'
 import $ from 'jquery'
 var jq = $.noConflict();
 export default{
 	data(){
      return {
        images:[],
        message:'',
        type:"",
        url:[],
        // askkind:["App建议",'发票索取','投诉酒店','项目合作','其他问题'],
        kindshow:"发票所取",
        isshow:false,
        show:1,
		titleshow:"",
		
        feedback:[
      	{name:"app建议",type:"proposal"},
      	{name:"发票索取",type:"invoice"},
      	{name:"投诉酒店",type:"complain"},
      	{name:"项目合作",type:"cooperation"},
      	{name:"其他问题",type:"others"},
     
      ],
      }
   },

    methods: {
     
//点击取消
	cancel:function(){
		  this.isshow=false;
	},
	sure:function(){
		  this.isshow=false;
	},
    chose:function(type,name){
         this.isshow=false;
         this.type=type;
         this.titleshow=name;

    },

  //滑动的代码
	onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
		
      }
	  this.titleshow=values[0];

    },
	  
        // chiocekind:function(){
        //   this.isshow=true;
        //     jq('#submit').prop({disabled:true})
        //    console.log(jq('#submit')[0])
        // },
      
        close:function(){
            this.isshow=true;
        },
        choiceImg:function(){
            jq('#submit').prop({disabled:false});
        },
        onFileChange(e) {
           // console.log(e);
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)return;
            this.createImage(files);

        },
        createImage(file) {
            if(typeof FileReader==='undefined'){
                alert('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
    //console.log(file)
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
                   // console.log(e)
                    for(var i=0;i<vm.images.length;i++){
                        if(vm.images[i]==e.target.result){
                            return false;
                        }
                    };
                    vm.images.push(e.target.result);
                };
            }
			 //console.log(vm.images)
        },
		
        delImage:function(index){
            this.images.splice(index,1);
        },
        removeImage: function(e) {
            this.images = [];
        },
        //确定按钮
        
        validate:function(message,type){ 
           
            var msg=this.message;
            var type=this.type;
            var self = this;
            var titleshow=this.titleshow;
            //console.log(this.images)
            if(5>this.message.length||this.message.length>1000){
                Toast('至少输入五个字');	
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
                             self.url.push(res.url)
                              //console.log(self.url)
                        }).fail(function(res) {});
                   }
                

            //字数的请求
                   this.$http.post(api+'/api/feedback',{content:msg,type:type}).then(function(response){
                        if(response.body.result == "success"){
                                        var message=response.body.message;
                                        //var title="提示";
                                MessageBox.alert(message,'提示').then(action => {
                                location.href="#/index";
                                     });
                        }else{
                                
                        }   	
                    }, function(response){
                    // 响应错误回调
                    })
        }
           
			
            
        },
    },
     beforeRouteEnter (to, from, next) {
      next(vm => {
          vm.titleshow = '';
          vm.message='';
          vm.images=[];
      })
    }

 }
</script>
<style scoped="scoped">
.roomstate_select_picker{
 position:fixed;
 bottom:50px;
 left:0px;
 right:0px;
 top:0px;
 background:rgba(0,0, 0, 0.5);
 z-index:999;
}

.roomstate_select_picker .roomstate_select_btn{
 background-color:#EEEEEE;
 padding: 10px 10px;
 position:fixed;
 bottom:230px;
 left:0px;
 right:0px;
 z-index:100;
}
.roomstate_select_picker .roomstate_select_btn .roomstate_select_rtbtn{
    float: right;
}

.picker {
 height:150px;
 position:fixed;
 bottom:0px;
 left:0px;
 right:0px;
 background:#FFFFFF;
}
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
.picker-item {
    height: 36px;
    background-color: #ffffff;
    line-height: 36px;
    padding: 0 10px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #707274;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.picker-item:hover{
   
    background-color: #EEEEEE;
    
}

.answer{
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    text-align: center
}
</style>
