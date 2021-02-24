<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index" @click="tagsTem(item.path)">
                <router-link :to="item.path" class="tags-li-title" >
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close" v-if="index!=0"></i></span>
            </li>
        </ul>
    </div>
</template>

<script>
    import bus from './bus';
    import store from './store';
    export default {
        data() {
            return {
                tagsList: store.tagsList,
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.path;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.path && this.$router.push(item.path);
                    var that = this;
                    setTimeout(function(){
                      that.tagsTem(item.path);
                    }, 1000);
                }else{
                    this.$router.push('/');
                }
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.path;
                })
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.path;
                })
                !isExist && this.tagsList.push({
                    title: route.meta.title,
                    path: route.path,
                    name: route.matched[1].components.default.name
                })
                bus.$emit('tags', this.tagsList);
            },
            tagsTem(path){
//               this.$emit("listenToChildEvent", path)
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
                this.tagsList=store.tagsList
            }
        },
        created(){
            this.setTags(this.$route);
            if (this.tagsList.length > 1) {
              var that = this;
              setTimeout(function(){
                that.$emit("listenToChildEvent", that.tagsList[1].path);
              }, 1000);
              
            }
        }
    }

</script>


<style>
    .tags {
        position: relative;
        height: 40px;
        overflow: hidden;
        /*background: #fff;*/
        padding-right: 120px;margin-top: 15px;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;display: flex;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 0 0;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 20px 0 20px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 100px;
        overflow: hidden;
/*        white-space: nowrap;*/
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;font-size: 14px;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }
	.content-box .tags-li{border: 0;background:#D5DDD5;display: flex;}
	.content-box .tags-li.active{background-color: #fff;color: #000;}
	.content-box .tags-li.active .tags-li-title{color: #000;}
	.content-box .tags-li .tags-li-title{color: #000;}

</style>
