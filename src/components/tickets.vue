<template>
	<div id="tiecets">
		<div id="nav">
			<div class="back" @click="backup"></div>
			<div class="focus"></div>
			<div class="toother"></div>
		</div>
		<div id="banner" class="clear" v-if="istrue">
			<div class="banner-img">
				<img :src="$store.state.ticketinfo.result.activity.thumbnail">
			</div>
			<div class="banner-info">
				<h2>{{$store.state.ticketinfo.result.activity.actName}}</h2>
				<p class="banner-time">
					{{$store.state.ticketinfo.result.activity.actDate}}
				</p>
				<p class="banner-address">
					{{$store.state.ticketinfo.result.activity.veName}}
				</p>
				<p class="banner-position">
					座位图
				</p>
				<div class="clear-overflow">
					<div class="hot-left">
						<p>{{$store.state.ticketinfo.result.activity.hotLevel}}℃</p>
						<p>西十区指数</p>
					</div>
					<div class="price-right">
						<span>¥{{$store.state.ticketinfo.result.activity.minPrice}}</span>
						起
					</div>
				</div>
			</div>
		</div>
		<div id="content">
			<ul class="clear">
				<li id="piaoping" class="activecontent" @click="piaoping">票品</li>
				<li id="xiangqing" @click="xiangqing">详情</li>
			</ul>
			<ticketsprice v-show="pp"></ticketsprice>
			<ticketsinfo v-show="xq"></ticketsinfo>
		</div>
	</div>
</template>

<script>
import axios from "axios"

import ticketsprice from "@/components/ticketsprice"
import ticketsinfo from "@/components/ticketsinfo"
export default {

  name: 'tickets',

  data () {
    return {
    	eventid:"",
    	eventcode:"",
    	istrue:false,
    	pp:true,
    	xq:false,
    	bigbigshow:true,
    }
  },
  components:{
  	ticketsprice,
  	ticketsinfo,
  },
  mounted(){
  	this.eventid=this.$route.query.id;
  	this.eventcode=this.$route.query.code;
  	// console.log(this.eventid,this.eventcode)
  	axios.get(`/ajax/activity/detail?actCode=${this.eventcode}`).then(res=>{
  		// console.log(res.data);
  		//提交到mutation
  		this.$store.commit("eventid",this.eventid);
  		this.$store.commit("eventcode",this.eventcode);
  		this.$store.commit("eventinfo",res.data);
  		// console.log(res.data.length);
  		this.istrue=true;
  		this.bigbigshow=false;
  	})

  },
  methods:{
  	piaoping:function(){
    	this.pp=true;
    	this.xq=false;
		$("#piaoping").addClass("activecontent");
		$("#xiangqing").removeClass("activecontent");
  	},
  	xiangqing:function(){
    	this.pp=false;
    	this.xq=true;
		$("#piaoping").removeClass("activecontent");
		$("#xiangqing").addClass("activecontent");
  	},
  	backup:function(){
  		history.go(-1);
  	}
  }
}
</script>

<style lang="scss" scoped>
	#tickets{
		width:100%;
		box-sizing:border-box;
	}
	.bigloading-img{
      text-align:center;
      padding:100px auto;
      position:absolute;
      background:#fff;
      width:100%;
      height:100%;
      z-index:10;
	}
	#nav{
		background:url("../assets/tickets-header.png") no-repeat left;
		height:3.3rem;
		width:100%;
		background-size:100% 100%;
		position:fixed;
		z-index:100;
		box-sizing: border-box;
		.back,.focus,.toother{
			width:2.5rem;
			height:100%;
			position: absolute;
		}
		.focus{
			right:3rem;
			background:url("../assets/heart.png") no-repeat center;
			width:1.5rem;
			height:1.5rem;
			background-size:100% 100%;
			top:1rem;
		}
		.toother{
			width:2.5rem;
			height:100%;
			position: absolute;
			right:0;
		}
	}
	#banner{
		width:100%;
	    background: linear-gradient(to right bottom, #060606, rgba(51,51,51,0.6));
	    padding:1rem;
	    padding-top:4rem;
	    box-sizing:border-box;
	    .banner-img{
	    	float:left;
	    	img{
	    		width:8rem;
	    		border-radius:5px;
	    	}
	    }
	    .banner-info{
	    	float:left;
	    	width:9.5rem;
	    	padding-left:1rem;
	    	box-sizing: border-box;
	    	h2{
	    		color:#fff;
	    		font-size:0.9rem;
	    		margin-bottom:0.6rem;
	    		box-sizing:border-box;
	    	}
	    	.banner-time,.banner-address,.banner-position{
	    		background: url("../assets/time.png") no-repeat left center;
	    		background-size:1.35rem;
	    		padding: 0.2rem 0 0.2rem 2rem;
    		    font-size: 0.8rem;
    		    color:#fff;
    		    margin-bottom:0.6rem;
    		    box-sizing:border-box;
	    	}
	    	.banner-address{
	    		background: url("../assets/address.png") no-repeat left center;
	    		background-size:1.35rem;
	    		box-sizing:border-box;
	    	}
	    	.banner-position{
	    		background: url("../assets/seat.png") no-repeat left center;
	    		background-size:1.35rem;
	    	}
	    	.clear-overflow{
				width:7.3rem;
	    		color: #fff;
	    		font-size:0.75rem;
	    		p{
					margin-top:0.2rem;
	    		}
	    	}
	    	.hot-left{
				padding:0.5rem 0rem 0.8rem 3rem;
	    		width:100%;
	    		box-sizing:border-box;
	    		background:#5a5a5b url("../assets/hot.png") no-repeat left center;
	    		background-size:2.8rem;
	    		border-radius: 5px;
	    	}
	    	.price-right{
	    		padding-top:1.6rem;
	    		font-size:0.8rem;
	    		padding-left:1rem;
	    		span{
		    		color:#ff5400;
	    		    font-size: 1rem;
	    		}

	    	}
	    }
	}
	#content{
		width:100%;
		color:#999;
		background:#efefef;
		text-align: center;
		font-size:0.8rem;
		ul{
			width:100%;
		}
		li{
			width:50%;
			padding:1rem;
			float:left;
			box-sizing:border-box;
		}
	}
	.activecontent{
		background:#fff;
		color:#000;
		font-weight:700;
	}
</style>