<template>
	<div id="ahaha">
		<div id="searchbox" class="clear">
			<span class="left" @click="searchboxback">
				<i class="iconfont icon-back"></i>
			</span>
			<div class="center">
				<div class="search-input">
					<input type="text" name="" placeholder="请输入演出/明星/活动" id="word" @input="searchinput" @blur="blurinput" @focus="focusinput" v-model="inputtxt">
				</div>
			</div>
		</div>
		<div id="hotsearch">
			<h3>热门搜索</h3>
			<ul>
				<li>
					<a href="http://m.xishiqu.com/search?q=%E9%80%86%E7%88%B1%E7%AD%94%E9%A2%98%E5%8D%A1">逆爱答题卡</a>
				</li>
				<li>
					<a href="http://m.xishiqu.com/search?q=%E6%9E%97%E5%BF%86%E8%8E%B2">林忆莲</a>
				</li>
				<li>
					<a href="http://m.xishiqu.com/search?q=%E5%92%AA%E5%92%95%E6%B1%87">咪咕汇</a>
				</li>
				<li>
					<a href="http://m.xishiqu.com/search?q=%E6%91%87%E6%BB%9A%E5%B9%B4%E4%BB%A3">摇滚年代</a>
				</li>
				<li>
					<a href="http://m.xishiqu.com/search?q=%E4%B8%8D%E7%9C%A0%E4%B9%8B%E5%A4%9C">不眠之夜</a>
				</li>
				<li>
					<a href="http://m.xishiqu.com/search?q=UFC">UFC</a>
				</li>
				<li>
					<a href="http://m.xishiqu.com/search?q=%E6%B3%BD%E8%A5%BF%E7%94%B7%E5%AD%A9">泽西男孩</a>
				</li>
				<li>
					<a href="http://m.xishiqu.com/search?q=%E5%BC%A0%E5%AD%A6%E5%8F%8B">张学友</a>
				</li>
			</ul>
		</div>
		<div id="history">
			<h3>历史搜索记录</h3>
			<ul>
				<li>
					<a href="http://m.xishiqu.com/search?q=%E9%80%86%E7%88%B1%E7%AD%94%E9%A2%98%E5%8D%A1">咪咕会</a>
				</li>
			</ul>
		</div>
		<div id="list" v-show="islistshow">
			<ul>
				<li v-for="data in txtlist">
					<div class="list clear">
						<div class="title over">
							{{data.result}}
						</div>
						<div class="area">
							{{data.area}}
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from "axios"

export default {

  name: 'search',

  data () {
    return {
    	inputtxt:"",
    	txtlist:[],
    	islistshow:false
    }
  },
  methods:{
  	searchboxback:function(){
  		history.go(-1);
  	},
  	searchinput:function(){
  		// console.log(this.inputtxt);
  		// http://m.xishiqu.com/ajax/keywords?q=a
	  	axios.get(`/ajax/keywords?q=${this.inputtxt}`).then(res=>{
	  		console.log(res);
	  		this.txtlist=res.data.result;
	  		this.islistshow=true;
  		})
  	},
  	blurinput:function(){
  		
  		setTimeout(function(){
  			this.islistshow=false;
  			// console.log(2222);
  		},500);
  	},
  	focusinput:function(){
  		this.islistshow=true;
  	}
  },
  mounted(){

  }
}
</script>

<style src="@/assets/iconfont/iconfont.css"></style>
<style lang="scss" scoped>
	#searchbox{
		width:100%;
		height:3rem;
	    padding: 0 0.5rem;
	    box-sizing: border-box;
	    .left{
	    	float:left;
		    font-size: 1rem;
		    line-height: 3rem;
		    color: #999;
		    text-decoration: none;
		    margin-left:0.5rem;
		    display:block;
		    width:1rem;
	    }
	    .center{
	    	float:left;
	    	margin:0 auto;
	    	box-sizing:border-box;
	    	input{
			    border: none;
			    border-radius: 4px;
			    background: #efefef;
			    width: 100%;
			    height: 2rem;
			    text-indent: 1rem;
			    display: block;
			    vertical-align: middle;
			    margin: .5rem 0;
			    font-size: 0.6rem;
			    margin-left:2.8rem;
			    padding:0 1rem 0 0;
			    box-sizing: border-box;
	    	}
	    }
	}
	#ahaha{
	    box-sizing: border-box;
	}
	#list{
		box-sizing:border-box;
		left: 0;
		top:3rem;
		background-color: #fff;
		.title{
			width:80%;
			float:left;
		}
		.area{
			float:right;
			width:20%;
			text-align: right;
		}
		ul{
			box-sizing:border-box;
		    border-top: 1px solid #dedede;
		    li{
		    	box-sizing:border-box;
	    	    border-bottom: 1px solid #dedede;
	    	    font-size:0.9rem;
	    	    padding:1rem 0;
	    		padding:1rem 1rem;
		    }
		}
	}
	#hotsearch,#history{
	    box-sizing: border-box;
		h3{
		    margin: 0;
		    padding: 1rem;
		    color: #999;
		    font-weight: normal;
		    font-size: 0.9rem;
		    line-height: 1.42857;
		    border-bottom: 1px solid #dedede;
		    background-color: #f5f5f5;
		}
		ul{
			display:flex;
			overflow: hidden;
		    border-bottom: 1px solid #dedede;
			li{
			    flex: 0 0 25%;
			    text-align: center;
			    border-left: 1px solid #dedede;
			    text-overflow: ellipsis;
			    overflow: hidden;
			    white-space: nowrap;
			    color: #333;
			    font-size: 0.8rem;
			    padding:1rem 0;
			}
		}
	}
</style>