<template>
	<div id="main">
    <div class="big-gif" v-show="bigshow">
        <img src="../assets/loading.gif" height="250" width="250">
    </div>
		<div id="tickets-event">
			<div class="event-carousel">
				<ul class="clear">
					<li v-for="data,index in ticketsdoing" @click="liactive(index)">
            <span class="before"></span>
            <span class="after"></span>
						<div class="pre-sale">
							<p v-html="data.eventTitle"></p>
							<div class="ppppp">
                ¥<span v-html="data.lowPrice"></span>起
              </div>
						</div>
					</li>
				</ul>
			</div>
		</div>
    <div id="navcontent">
      <ul class="clear">
        <li @click="isfaceshow">
          选票面价<i class="iconfont icon-less"></i>
        </li>
        <li @click="issaleshow">
          销售价比价<i class="iconfont icon-less"></i>
        </li>
      </ul>
      <div class="face-price-list" v-show="faceshow">
        <ul class="clear" >
          <li @click="facelistactive($event.currentTarget,$event.target)" :did="null"><div class="face-price-list-div face-price-list-div-active">全部</div></li>
          <li v-for="data in faceprice" @click="toggles(data,$event.currentTarget,$event.target)" :did="data.dId" :class="{thered:data.checked}">
            <div class="face-price-list-div">
              {{data.facePrice}}
            </div>
          </li>
        </ul>
      </div>
      <div class="sale-price-list" v-show="saleshow">
        <ul>
          <li class="active" @click="ulclick($event)">默认排序</li>
          <li @click="ulclick($event)">价格从低到高</li>
        </ul>
      </div>
    </div>
    <div id="ticket-list">
      <div class="loading-gif" v-if="loadingshow">
        <img src="../assets/loading.gif" height="250" width="250">
      </div>
      <ul>
        <li v-for="data,index in ticketslist" class="clear">
          <div class="left">
            <h3 class="address">{{$store.state.ticketpricelist[index].title}}</h3>
            <p class="time">{{$store.state.ticketpricelist[index].deliveryTime}}</p>
            <p class="baozheng">卖家保证：{{$store.state.ticketpricelist[index].depositText}}</p>
            <div class="item-list">
              <span v-for="item in data.tags">
                {{item}}
              </span>
            </div>
          </div>
          <div class="right">
            <p class="price">¥{{$store.state.ticketpricelist[index].price}}</p>
            <p class="face-price">票面价：¥{{$store.state.ticketpricelist[index].facePrice}}</p>
            <p class="lost-piece">剩余张数：{{$store.state.ticketpricelist[index].leftQuantity}}</p>
            <a class="btn">购买</a>
          </div>
        </li>
      </ul>
      <div class="more" @click="loadingmore" v-show="showloading"><a href="javascript:;">加载更多</a></div>
      <div class="more" @click="loadingmore" v-show="showall"><a href="javascript:;">全部加载完毕</a></div>
    </div>
	</div>
</template>

<script>
import axios from "axios"


export default {

  name: 'ticketsprice',

  data () {
    return {
    	ticketid:"",
    	ticketcode:"",
      ticketsdoing:"",
      dId:"",
      order:0,
      page:1,
      ticketslist:[],
      showloading:true,
      showall:false,
      isloadingtrue:true,
      loadingshow:false,
      saleshow:false,
      faceshow:false,
      faceprice:[],
      did:"",
      bigshow:true,
    }
  },
  mounted(){
    this.ticketid=this.$route.query.id;
    this.ticketcode=this.$route.query.code;
    this.page=1;
  	// this.ticketid=this.$store.state.eventid;
  	// this.ticketid=this.$store.state.eventcode;
  	axios.get(`/ajax/activity/getEventList?actCode=${this.ticketcode}&eventId=${this.ticketid}`).then(res=>{
  		// console.log(res);
      this.ticketsdoing=res.data.result;
  	})

    //价格列表-初始状态
    axios.get(`/ajax/activity/tickets?eventId=${this.ticketid}&dId=${this.dId}&order=${this.order}&seat=&page=${this.page}`).then(res=>{
      this.$store.commit("ticketslist",res.data.result.list);
      this.ticketslist=res.data.result.list;
    })

    //选择票面价
    //http://m.xishiqu.com/ajax/activity/tickets/facePrice?eventId=239015
    axios.get(`/ajax/activity/tickets/facePrice?eventId=${this.ticketid}`).then(res=>{
      this.faceprice=res.data.result;
      // console.log(res);
    })
    this.bigshow=false;
  },
  methods:{
    //点击加载更多
    loadingmore(){
      this.page++;
      if(this.isloadingtrue==true){
        axios.get(`/ajax/activity/tickets?eventId=${this.ticketid}&dId=${this.dId}&order=${this.order}&seat=&page=${this.page}`).then(res=>{
          if(res.data.result.list.length<8){
            this.isloadingtrue=false;
            this.showloading=false;
            this.showall=true;
          }else{
            this.ticketslist=[...this.ticketslist,...res.data.result.list];
            this.$store.commit("ticketslist",this.ticketslist);
          }
        })
      }else{
        this.isloadingtrue=false;
        return;
      }
    },
    reloading:function(){
      this.loadingshow=true;
      axios.get(`/ajax/activity/tickets?eventId=${this.ticketid}&dId=${this.dId}&order=${this.order}&seat=&page=${this.page}`).then(res=>{
        this.$store.commit("ticketslist",res.data.result.list);
        this.ticketslist=res.data.result.list;
      })
      this.loadingshow=false;
    },
    ulclick(vale){
      var val=vale.target.innerHTML;
      this.saleshow=!this.saleshow;
      switch (val) {
        case "默认排序":
          this.order=0;
          break;
        case "价格从低到高":
          this.order=1;
          break;
      };
      // $(this).index().removeClass("active");
      var index=this.order;
      $(".sale-price-list li").eq(index).addClass('active').siblings("li").removeClass('active');
      this.reloading();
    },
    issaleshow:function(){
      this.saleshow=!this.saleshow;
      this.faceshow=false;
    },
    isfaceshow:function(){
      this.saleshow=false;
      this.faceshow=!this.faceshow;
    },
    facelistactive:function(el,tel){
      // console.log(data);
      // 切换class
      $(".face-price-list div").removeClass("face-price-list-div-active");
      tel.classList.add("face-price-list-div-active");

      if(el.getAttribute("did")==null){
        this.dId="";
      }else {
        this.dId=el.getAttribute("did");
      }
      this.faceshow=false;
      this.reloading();
      // this.dId=el.attr("did");
      // console.log(this.dId);
    },
    toggles:function(data,el,tel){
      //切换class
      this.dId=data.dId;
      $(".face-price-list div").removeClass("face-price-list-div-active");
      tel.classList.add("face-price-list-div-active");
      this.faceshow=false;
      this.reloading();
    }
    //face-price-list-div-active
  }
}
</script>

<style src="@/assets/iconfont/iconfont.css"></style>
<style lang="scss" scoped>
  #main{
    background-color: #fff;
    width:100%;
    padding:1rem 0;
    .big-gif{
      text-align:center;
      padding:100px auto;
      position:absolute;
      background:#fff;
      width:100%;
      height:100%;
      z-index:10
    }
  }
  #tickets-event{
    width:100%;
    box-sizing: border-box;
    overflow-x: auto;
    .event-carousel{
      padding:0 0.8rem;
    }
    ul{
      padding:1rem 0;
      display: flex;
    }
    li{
      border:1px solid #dbdbdb;
      color:#ccc;
      float:left;
      padding:0.3rem 1rem;
      border-radius: 5px;
      width:6.4rem;
      margin:0 1rem;
      position:relative;
    }
    .before{
      background: url("../assets/pre-icon.png") no-repeat;
      background-size:cover;
      width:2.5rem;
      height:2.5rem;
      position: absolute;
      left:-0.5rem;
      top:-1.5rem;
      z-index:10;
      background-position: 0 -2rem;
    }
    .after{
      background: url("../assets/event-check.png") no-repeat;
      background-size:cover;
      width:1.87rem;
      height:1.87rem;
      content:"";
      position: absolute;
      right:-0rem;
      bottom:-0rem;
      z-index:10;
    }
    .active{
      border:1px solid #ff5400;
      color:#ff5400;
    }
    .kong{
      width:1rem;
      height:100%;
    }
  }
  #navcontent{
    width:100%;
    line-height: 1.4rem;
    border-top:1px solid #e3e3e3;
    border-bottom:1px solid #e3e3e3;
    padding:0.7rem 0;
    position:relative;
    ul{
      font-size: 0.8rem;
      color: #333;
      text-align: center;
      li{
        width:50%;
        float:left;
        position:relative;
        i{
          width:1rem;
          height:1rem;
          position:absolute;
          left:50%;
          top:50%;
          margin-left:2.2rem;
          margin-top:-0.6rem;
        }
      }
    }
    .face-price-list{
      padding:1rem;
      box-sizing:border-box;
      li{
        width:25%;
        height:4.5rem;
        float:left;
        .face-price-list-div{
          font-size: 0.5rem;
          margin: 0.3rem;
          border: 1px solid #666;
          border-radius: 0.25rem;
          height: 2.9rem;
          line-height: 2.9rem;
          text-align: center;
        }
        .face-price-list-div-active{
          background: url("../assets/event-check.png") no-repeat right bottom;
          background-size: 40%;
          border: 1px solid #ff5400;
          color:#ff5400;
        }
      }

    }
    .sale-price-list{
      background-color:#f5f5f5;
      width:100%;
      position:absolute;
      left:0;
      top:2.8rem;
      ul{
        width: 100%;
      }
      li{
        width:100%;
        float:none;
        padding:1rem 0.8rem;
        box-sizing:border-box;
        text-align:left;
      }
      .active{
        color:#ff5400;
        background:url(../assets/filter-check.png) 17rem center no-repeat;
        background-size: 1rem;
      }
    }
    .face-price-list{
      background-color:#f5f5f5;
      width:100%;
      position:absolute;
      left:0;
      top:2.8rem;
    }
  }
  #ticket-list{
    color:#666;
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
      .left{
        float:left;
        text-align:left;
        width: 13rem;
        h3{
          color:#333;
          font-weight:blod;
          margin-bottom:1rem;
        }
        p{
          font-size: 0.6rem;
          padding-bottom:0.8rem;
        }
        span{
          display:inline-block;
          border:1px solid rgba(255,84,0,0.54);
          padding: .3rem .4rem;
          margin-right:0.5rem;
          font-size: 0.6rem;
          border-radius:5px;
          color:rgba(255,84,0,0.54);
          line-height:1;
        }
      }
      .right{
        float:right;
        text-align:right;
        .price{
          color:#ff5400;
          font-size:1rem;
          font-weight: bold;
        }
        .face-price{
          font-size: 0.5rem;
          color: #999;
          margin-bottom: .5rem;
          margin-top:0.2rem;
        }
        .lost-piece{
          color: #ff5400;
          font-size: 0.5rem;
          margin-bottom: .5rem;
        }
        a{
          padding:7px 50px;
          font-weight: 200;
          text-align: center;
          vertical-align: middle;
          line-height:1.42857143;
          background-color: #ff5400;
          color:#fff;
          font-size: 0.8rem;
          touch-action: manipulation;
          cursor: pointer;
          border: 1px solid #ff5400;
          border-radius: .25rem;
          width:100%;
          display:block;
          white-space: nowrap;
          box-sizing: border-box;
        }
      }
    }
    .more{
      a{
          text-align: center;
          color: #999;
          display: block;
          padding: 0.5rem 0 1rem 0;
          font-size:0.825rem;
      }
    }
  }
</style>