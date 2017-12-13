import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex);



const store = new Vuex.Store({
	state:{
		ticketinfo:"",
		ticketid:"",
		ticketcode:"",
		ticketpricelist:"",
	},
	getters:{
		listcontent:function(state){
			return state.ticketinfo?state.ticketinfo.result.activity.content:[];
		}
	},
	actions:{
		ticketsinfoing(store,payload){
			axios.get(payload).then(res=>{
				// console.log(res.data);
				store.commit("eventinfo",res.data);
			})
		}
	},
	mutations:{
		eventinfo:function(state,payload){
			state.ticketinfo=payload;
			// console.log(state.ticketinfo)
		},
		eventid:function(state,payload){
			state.ticketid=payload;
		},
		eventcode:function(state,payload){
			state.ticketcode=payload;
		},
		ticketslist:function(state,payload){
			state.ticketpricelist=payload;
			// console.log(state.ticketpricelist)
		},
	}
})


export default store;