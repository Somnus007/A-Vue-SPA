<template>
	<div id="cate">
		<searchbox></searchbox>
		<div id="filter">
			<ul class="clear">
				<li class="category" @click="catelistshow">
					<a href="javascript:;">
						<i class="iconfont icon-category"></i>
						演唱会
					</a>
				</li>
				<li class="date">
					<a href="javascript:;">
						日历
						<i class="iconfont icon-less"></i>
					</a>
				</li>
				<li class="order" @click="orderlistshow">
					<a href="javascript:;">
						排序
						<i class="iconfont icon-less"></i>
					</a>
				</li>
			</ul>
			<div class="tab-content">
				<div class="category-list" v-show="iscatelistshow">
					<ul @click="ulshow($event,'演唱会')">
						<li>全部</li>
						<li>演唱会</li>
						<li>话剧歌剧</li>
						<li>音乐会</li>
						<li>儿童亲子</li>
						<li>舞蹈芭蕾</li>
						<li>曲艺杂技</li>
						<li>体育赛事</li>
						<li>休闲娱乐</li>
						<li>电影</li>
					</ul>
<!-- 					<div class="close" @click="iscatelistshow=!iscatelistshow"><i class="iconfont icon-less"></i></div>
 -->				</div>
				<div class="order-list" v-show="isorderlistshow">
					<ul @click="ulshow($event)">
						<li>默认排序</li>
						<li>按最热</li>
						<li>按价格</li>
					</ul>
<!-- 					<div class="close" @click="isorderlistshow=!isorderlistshow"><i class="iconfont icon-less"></i></div>
 -->				</div>
			</div>
		</div>
		<div id="movie-list">
			<div class="loading-gif" v-if="loadingshow">
				<img src="../assets/loading.gif" height="250" width="250">
			</div>
			<ul>
				<li v-for="data in activelist" @click="intodetail(data.eventId,data.actCode)">
					<a href="javascript:;">
						<div class="movie-img">
							<img :src="data.actImgUrl">
						</div>
						<div class="movie-info">
							<h3>{{data.actName}}</h3>
							<div class="data-i">{{data.actFrom}}</div>
							<div class="data-ad">{{data.address}}{{data.name}}</div>
							<div class="data-other">
								<span class="status">{{data.actStatusName}}</span>
								<span class="price">¥{{data.lowPrice}}</span>
								<span>起</span>
							</div>
						</div>
					</a>
				</li>
			</ul>
			<div class="more" @click="loadingmore" v-show="showloading"><a href="javascript:;">加载更多</a></div>
			<div class="more" @click="loadingmore" v-show="showall"><a href="javascript:;">全部加载完毕</a></div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { Indicator } from 'mint-ui';

import router from "@/router";
import searchbox from "@/components/common/searchbox"

export default {

  name: 'category',

  data () {
    return {
    	loadingshow:false,
    	activelist:[],
    	iscatelistshow:false,
    	isorderlistshow:false,
    	current:1,
    	isloading:true,
    	showloading:true,
    	showall:false,
    	frontCate:"",
    	date:"",
    	order:"",
    }
  },
  mounted(){
  	this.loadingshow=true;
  	axios.get("/ajax/activity/list?frontCate=yanchanghui&date=&order=&page=1").then(res=>{
  		this.activelist=res.data.result.list;
  		// console.log(this.activelist);
  	})
	this.loadingshow=false;
  },
  methods:{
  	catelistshow:function(){
  		this.iscatelistshow=!this.iscatelistshow;
  		this.isorderlistshow=false;
  	},
  	orderlistshow:function(){
  		this.isorderlistshow=!this.isorderlistshow;
  		this.iscatelistshow=false;
  	},
  	loadingmore:function(){
  		this.current++;
  		if(this.isloading==true){
		  	axios.get("/ajax/activity/list",{
		  		params:{
			  		frontCate:"yanchanghui",
			  		date:"",
			  		order:"",
			  		page:this.current
		  		}
		  	}).then(res=>{
		  		this.activelist=[...this.activelist,...res.data.result.list];
		  		if(res.data.result.list.length<20){
		  			this.isloading=false;
		  			this.showloading=false;
		  			this.showall=true;
		  		}
		  	})
  		}else{
  			this.isloading=false;
  			return;
  		}
  	},
  	loadingother:function(frontCate,order){
  		// console.log(order);
	  	this.loadingshow=true;
	  	axios.get("/ajax/activity/list",{
	  		params:{
		  		frontCate:frontCate,
		  		date:"",
		  		order:order,
		  		page:1
	  		}
	  	}).then(res=>{
	  		this.activelist=res.data.result.list
  		  	this.loadingshow=false;
	  	})
  	},
  	ulshow:function(value,a){
  		this.isorderlistshow=false;
  		this.iscatelistshow=false;
  		var val=value.target.innerHTML;
  		// console.log(val)
  		// console.log(value.target.parentNode);
  		// console.log(a);
  		switch(val){
  			case "全部":
  				this.frontCate="";
  				break;
  			case "演唱会":
  				this.frontCate="yanchanghui";
  				break;
  			case "话剧歌剧":
  				this.frontCate="huajugeju";
  				break;
  			case "音乐会":
  				this.frontCate="yinyuehui";
  				break;
  			case "儿童亲子":
  				this.frontCate="ertongqinzi";
  				break;
  			case "舞蹈芭蕾":
  				this.frontCate="wudaobalei";
  				break;
  			case "曲艺杂技":
  				this.frontCate="quyizaji";
  				break;
  			case "体育赛事":
  				this.frontCate="tiyusaishi";
  				break;
  			case "休闲娱乐":
  				this.frontCate="xiuxianyule";
  				break;
  			case "电影":
  				this.frontCate="dianying";
  				break;
  			case "默认排序":
  				this.order=1;
  				break;
  			case "按最热":
  				this.order=3;
  				break;
  			case "按价格":
  				this.order=7;
  				break;
  		}
  		var frontCate=this.frontCate;
  		var order=this.order;
  		// console.log(this.order)
  		this.loadingother(frontCate,order);
  	},
  	intodetail:function(id,code){
  		router.push(`/tickets?id=${id}&code=${code}`);
  		// console.log(id,code)
  		// console.log(typeof id)
  		// console.log(typeof code)
  	}
  },
  components:{
  	searchbox,
  }
}
</script>

<style src="@/assets/iconfont/iconfont.css"></style>
<style lang="scss" scoped>
	#filter{
		border-top:1px solid #dedede;
		border-bottom:1px solid #dedede;
		position:relative;
		ul{
			padding:1rem 0;
			li{
				float: left;
				width:33.3333333%;
				display:table-cell;
			    text-align: center;
			    box-sizing: border-box;
			    i{
			    	content: "\xe699";
			    	width:0.65rem;
			    	height:0.8rem;
			    	position: absolute;
			    	left:14px;
			    	top:0;
			    }
			}
			.category{
				border-right:1px solid #dedede
			}
			.date{
				border-right:1px solid #dedede
			}
			a{
				color:#999;
				width:100%;
				display:block;
				position:relative;
			}
			.category{
				span{

				}
			}
		}
		.category-list,.order-list{
			position:absolute;
			width:100%;
			background:#fff;
			left:0;
			top:49px;
			ul{
				padding:0;
				width:100%;
				li{
					width:100%;
				    padding: 0.7rem 2em;
				    border-bottom:1px solid #dedede;
				    position:relative;
				    text-align:left;
				}
			}
			.close{
				text-align:center;
			    i{
			    	position:absolute;
			    	bottom: 0;
			    	left:9.5rem;
			    	display:block;
			    	width:1rem;
			    	height:1rem;
			    }
			    margin-top:0.8rem
			}
		}
	}
	#movie-list{
		.loading-gif{
			text-align:center;
			padding:100px auto;
			position:absolute;
			background:#fff;
			width:100%;
			height:100%;
			z-index:10
		}
		li{
			padding:0.8rem;
			a{
				display:table;
			}
			.movie-img{
				width:7rem;
				display:table-cell;
				img{
					width:100%;
				}
			}
			.movie-info{
				display:table-cell;
			    vertical-align: top;
			    padding-left:0.8rem;
			    color:#999;
			    font-size:0.7rem;
			    border-bottom:1px solid #dedede;
			    h3{
			    	font-weight:normal;
			    	color:#333;
		    	    font-size: 0.85rem;
		    	    line-height: 1.42857;
				    max-height: 2.2rem;
				    overflow: hidden;
			    }
			    .data-i{
			    	margin:0.5rem 0 0.3rem 0;
			    }
			    .data-ad{
			    	max-height: 2.8rem;
				    overflow: hidden;
				    line-height: 1.3rem;
				    margin-bottom:0.5rem;
			    }
			    .data-other{
			    	font-size:0.85rem;
			    	.status{
			    		border: 1px solid #ff5400;
					    border-radius: 4px;
				        color: #ff5400;
				        padding: 0 .5rem;
				        margin-right:0.5rem;
			    	}
			    	.price{
			    		color: #ff5400;
			    	}
			    }
			}
		}
		.more{
			a{
			    text-align: center;
			    color: #999;
			    display: block;
			    padding-bottom: 1rem;
			    font-size:0.825rem;
			}
		}
	}
</style>