var page=Vue.extend({
	template:'#page',
	props:['gridName'],
	data:function(){
		return {
			pageGroupNum:5,//页码数量(可以自定义进行更改)
			pageSize:8
		};
	},
	watch:{//专门监听内部的数据
		pageSize:function(newValue,oldValue){
			this.pageConfig.pageSize=newValue;
			this.pageChange(1);
		}
	},
	computed:{
		pageConfig:function(){
			return this.$store.state.grid[this.gridName].pageConfig;
		},
		pages:function(){
			return Math.ceil(this.pageConfig.total*1.0/this.pageConfig.pageSize);
		},
		pageGroups:function(){
			return Math.ceil(this.pages*1.0/this.pageGroupNum);
		}
	},
	methods:{
		pageChange:function(i){
			//你要看的页根本不存在(非法点击)
			if(i<1||i>this.pages) return;
			if(i==1) 
				this.pageConfig.pageGroupIndex=1;
			else if(i==this.pages) 
				this.pageConfig.pageGroupIndex=this.pageGroups;
			else if(i>5) 
				if(i%5!=0)
					this.pageConfig.pageGroupIndex=Math.floor(i/this.pageGroupNum)+1;
				else
					this.pageConfig.pageGroupIndex=Math.floor(i/this.pageGroupNum);
			else
				this.pageConfig.pageGroupIndex=1;
			//现在显示的就是你要看的页(无用点击)
			//if(i==this.pageConfg.curPage) return;
			this.pageConfig.curPage=i;
			this.$emit('page-change');
		}
	}
});