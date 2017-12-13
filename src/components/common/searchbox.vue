<template>
	<div id="searchbox" class="clear">
		<span class="left" @click="searchboxback">
			<i class="iconfont icon-back"></i>
		</span>
		<div class="center" @click="reloading">
			<div class="search-input">
				<input type="text" name="" placeholder="请输入演出/明星/活动">
			</div>
		</div>
		<div class="right">
			<i class="iconfont icon-account"></i>
		</div>
	</div>
</template>

<script>

import router from "@/router"


export default {

  name: 'searchbox',

  data () {
    return {

    }
  },
  methods:{
  	searchboxback:function(){
  		history.go(-1);
  	},
  	reloading:function(){
  		router.push("/search")
  	}
  },
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
			    text-indent: 0.5rem;
			    display: block;
			    vertical-align: middle;
			    margin: .5rem 0;
			    font-size: 0.6rem;
			    margin-left:2.8rem;
	    	}
	    }
	    .right{
	    	float: right;
		    font-size: 1rem;
		    line-height: 3rem;
		    color: #999;
		    text-decoration: none;
		    margin-right:0.5rem;
		    display:block;
		    width:1rem;
	    }
	}
</style>