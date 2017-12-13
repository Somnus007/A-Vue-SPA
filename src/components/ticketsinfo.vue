<template>
	<div id="main-info" v-if="isshow">
		<h3>演出详情</h3>
		<div class="intro" v-html="listcontent"></div>
	</div>
</template>

<script>
import axios from "axios"
import {mapGetters } from "vuex"
export default {

  name: 'ticketsinfo',

  data () {
    return {
    	isshow:false,
    	eventid:"",
    	eventcode:""
    }
  },
  mounted(){
  	this.eventid=this.$route.query.id;
  	this.eventcode=this.$route.query.code;
  	if(this.isshow==false){
  		this.$store.dispatch("ticketsinfoing",`/ajax/activity/detail?actCode=${this.eventcode}`);
	  	this.isshow=true;
  	}else{
  		return;
  	}
  },
  computed:{
	...mapGetters(["listcontent"])
  }
}
</script>

<style lang="scss">
	#main-info{
		background:#fff;
		padding:1rem;
	    color: #666;
	    font-size: 0.5rem;
	    p{
	    	margin-bottom:0.7rem;
	    	text-align: left;
		    img{
		    	width:100%;
		    }
	    }
		h3{
		    text-align: center;
		    font-size: 0.9rem;
		    font-weight: bold;
		    margin:0.5rem 0;
		}
	}

</style>