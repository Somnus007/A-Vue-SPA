<template>
	<div id="app">
		<swipe class="my-swipe">
			<swipe-item v-for="data in looplist">
				<img :src="data.imgUrl" @click="urladdress(data)">
			</swipe-item>
		</swipe>
		<div id="address">
			<div class="left">
				上海
			</div>
		</div>
		<div id="content">
			<div class="nav">
				<ul class="clear">
					<li class="left">
						<a href="/#/category" class="clear">
							<div class="txt">
								<p>分类</p>
								<p class="small">Classification</p>
							</div>
							<div class="icon"></div>
						</a>
					</li>
					<li class="right">
						<a href="javascript:;" class="clear">
							<div class="txt">
								<p>个人中心</p>
								<p class="small">Personal Center</p>
							</div>
							<div class="icon"></div>
						</a>
					</li>
				</ul>
			</div>
			<div id="hot">
				<h3>
					Hot today
					<span>热门演出</span>
				</h3>
				<div class="list">
					<ul class="clear">
						<li v-for="data in hotlist" @click="urladdress(data)">
							<a href="javascript:;">
								<span :style="{'background-image':'url('+data.thumbnail+')'}"></span>
								<div class="title">
									{{data.actName}}
								</div>
								<div class="time">
									{{data.date}}
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div id="stub">
				<h3>
					Stub Ticket
					<span>票尾</span>
				</h3>
				<div class="list">
					<ul class="clear">
						<li v-for="data in lastlist"  @click="urladdress(data)">
							<a href="javascript:;">
								<span :style="{'background-image':'url('+data.thumbnail+')'}"></span>
								<div class="title">
									{{data.actName}}
								</div>
								<div class="time">
									{{data.date}}
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div id="adds" v-if="isif" class="clear" >
				<div class="left">
					<img :src="adslist[0].imgUrl">
				</div>
				<div class="right">
					<div class="r-top">
						<img :src="adslist[1].imgUrl">
					</div>
					<div class="r-bottom">
						<img :src="adslist[2].imgUrl">
					</div>
				</div>
			</div>
			<div id="sale">
				<h3>
					On Sale
					<span>折扣票</span>
				</h3>
				<div class="list">
					<ul class="clear">
						<li v-for="data in discountlist" @click="urladdress(data)">
							<a href="javascript:;">
								<span :style="{'background-image':'url('+data.thumbnail+')'}"></span>
								<div class="title">
									{{data.actName}}
								</div>
								<div class="time">
									{{data.date}}
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div id="rare">
				<h3>
					Rare
					<span>稀缺票</span>
				</h3>
				<div class="list">
					<ul class="clear">
						<li v-for="data in rarelist" @click="urladdress(data)">
							<a href="javascript:;">
								<span :style="{'background-image':'url('+data.thumbnail+')'}"></span>
								<div class="title">
									{{data.actName}}
								</div>
								<div class="time">
									{{data.date}}
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="footer">
			<div class="fot-top">
				<a href="">
					<img src="../assets/hotline.png" height="43" width="91">
				</a>
				举报电话&nbsp;:&nbsp;
				<a href="tel:021-52398129">021-52398129</a>
				&nbsp;&nbsp;&nbsp;分机号:403
			</div>
			<div class="fot-bot">
				<small>版权所有 西十区Copyright2011 - 2016 All Rights Reserved 沪ICP备12004558 上海爱有网络科技有限公司</small>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

import "vue-swipe/dist/vue-swipe.css"; //css 模块化 导入
import { Swipe, SwipeItem } from 'vue-swipe';

import router from "@/router";

export default {


  data () {
    return {
    	looplist:[],
    	hotlist:[],
    	lastlist:[],
    	discountlist:[],
    	rarelist:[],
    	adslist:[],
    	isif:false,
    	isifloop:false,
    	url:"",
    }
  },
  mounted(){
  	axios.get("/ajax/home/banner").then(res=>{
  		this.looplist=res.data.result;
  	}),
  	axios.get("/ajax/home/tickets").then(res=>{
  		this.hotlist=res.data.result.hot;
  		this.lastlist=res.data.result.last;
  		this.discountlist=res.data.result.discount;
  		this.rarelist=res.data.result.rare;
  		this.adslist=res.data.result.ads;
  		if(this.adslist.length==0){
  			this.isif=false;
  		}else{
  			this.isif=true;
  		}
  		// console.log(this.hotlist)
  	})
  },
  components:{
  	swipe:Swipe,
  	"swipe-item":SwipeItem
  },
  methods:{
  /*	todisco:function(data){
  		console.log(data.url);
  		var eventid=data.url;
  		eventid=eventid.split("=");
  		var code="";
  		// router.push(`/tickets?id=${eventid[1]}`);
  	}*/
  	urladdress:function(data){
  		window.location.href = data.url
  		// console.log(data.url);
  // 		var eventid=data.url;
  // 		eventid=eventid.split("=");
  // 		var code="";
		// router.push(`/tickets?id=${eventid[1]}`);
  	},
  	banneraddress:function(data){
  		console.log(data);
  	}
  }
}
</script>

<style lang="scss" scoped>
	.my-swipe {
		height: 9.4rem;
		img{
			width: 100%;
		}
		.mint-swipe-indicators{
			bottom:58px;
		}
	}
	#app{
		position:relative;
	}
	#address{
		position: absolute;
		min-width: 3rem;
		height: 2rem;
		line-height: 2rem;
		padding: 0 0.7rem;
		color: #fff;
		background: rgba(0,0,0,0.54);
		text-decoration: none;
		border: 1px solid #fff;
		left: 0;
		top:1rem;
		border-top-right-radius: 3rem;
		border-bottom-right-radius: 3rem;
	}
	#content{
		padding:1rem;
		.nav{
			ul{
				background:url("../assets/left-top-border.png") no-repeat left top,url("../assets/right-bottom-border.png") no-repeat right bottom;
				background-size:25%;
				padding:2rem 0;
				li{
					float:left;
					margin:0.5rem 0;
					margin:0 auto;
				}
				a{
					padding:0 0.4rem;
					display:block;
					text-align: center;
				}
				.left,.right{
					.icon{
						background:url("../assets/category-icon.png") no-repeat center;
						width:2.7rem;
						height:2.7rem;
						background-size:cover;
					}
					.txt{
						color: #333;
						font-size:0.9rem;
						margin-top:0.4rem;
						margin-right:0.5rem;
						width: 4rem;
					}
					div{
						float:left;
					}
					.small{
						font-size:0.5rem;
					}
				}
				.right{
					float:right;
					margin-right:0.4rem;
					padding-left:0.4rem;
					border-left:1px solid #dedede;
					.icon{
						background:url("../assets/account-icon.png") no-repeat center;
						background-size:cover;
					}
				}
				.left{
					margin-left:0.4rem;
				}
			}
		}
	}
	#hot,#stub,#sale,#rare{
		h3{
			border-left: .5rem solid #333;
			font-size:1rem;
			font-weight:normal;
			color:#ff5400;
			padding-left:0.3rem;
			margin-top:1rem;
			span{
				display:block;
				font-size:0.8rem;
				border-bottom: 1px solid #333;
				color: #333;
				width:5.2rem;
				padding-right:0.5rem;
				text-align:right;
			}
		}
		.list{
			margin-top:1rem;
		}
		li{
			float:left;
			width:33.333333%;
			a{
				display:block;
				margin:0.2rem;
			    color: #333;
			}
			span{
				display:block;
				width:100%;
			    padding: 69.23% 0;
			    background-size: cover;
			}
			.title{
				overflow: hidden;
			    line-height: 1rem;
			    font-size: 0.7rem;
				height:2rem;
			    word-break: break-all;
			}
			.time{
				font-size: .1rem;
				word-break: break-all;
				line-height: 1.2rem;
				height: 1.4rem;
				display: block;
				vertical-align: top;
				overflow: hidden;
				word-wrap: false
			}
		}
	}
	#adds{
		.left{
			float:left;
			width:50%;
			padding:0.3rem;
			box-sizing: border-box;
			img{
				width:100%;
			}
		}
		.right{
			float:left;
			width:50%;
			box-sizing: border-box;
			padding:0.3rem;
			.r-top{
				margin-bottom:0.3rem;
			}
			img{
				width:100%;
			}
		}
	}
	#footer{
		text-align:center;
		font-size: 0.6rem;
		line-height:1.5rem;
		padding: 0 0.5rem;
		a{
			color:#222;
		}
		img{
			width:60px;
			height:28px;
			margin-right:0.6rem;
		    vertical-align: middle;
	        box-sizing: border-box;
		}
		.fot-bot{
			display: block;
		    margin: 1rem 0 1.3rem;
		    font-size: 0.6rem;
		    line-height: 1.5rem;
		    text-align: center;
		}
	}
</style>