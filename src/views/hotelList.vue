<template>
 <div class="page" id="hotelList">
   <load-scan msg="数据加载中..." icon="#icon-shezhi" v-if="loading"></load-scan>
   <h1 class="hotelList_title">酒店列表</h1>
    <div v-for="(item,index) in hotelList" :key="index" class="hotel" @click="todetails(item)">
      <div class="hotel-center">
        <div class="hotel-center-top">
          <span class="hottem-name fl">{{item.hotelName || ''}}</span>
          <!-- <span class="hotel-lose fr" >损失￥{{item.lose || 0}} <i>></i> </span> -->
        </div>
        <ul class="hotel-center-content">
          <li>客房总数<br/><font>{{item.totalRoom  || 0}}</font></li>
          <li>停用房数<br/><font>{{item.unUseRoom  || 0}}</font></li>
          <li>在住房数<br/><font>{{item.usingRoom || 0}} </font></li>
          <li>飞房<br/><font>{{item.exceptionRoom  || 0}}</font></li>
        </ul>
      </div>
    </div>
 </div>
</template>
<script>
import loadScan from '../components/loading';
import {getCookie, setCookie} from "../commont/js/commonMethods";
export default {
  data() {
    return {
      hotelList:[],
      loading: true,
    }
  },
  components: {
    loadScan
  },
  created(){
    if(this.$route.query.openId &&  this.$route.query.mobile){
      this.putAxios(`/consumer/PmsForWx/setting`,{
              "mobile": getCookie("phone"),
              "openId":getCookie("openId")
            }).then(res => res).catch(err => err);
    }
    this.getAxios(`/consumer/PmsForWx/hotel`).then( res =>{
      this.loading = false;
      if(res.data.message == 'select success' && res.data.data.hotel) {
        this.hotelList = res.data.data.hotel;
      } else {
        alert(res.data.message)
      }
      console.log(res)
    }).catch(err => {
      this.loading = false;
      this.hotelList = [];
      setCookie("access_token",'');
      this.$router.push({
        path:'login',
        query:{
          openId: getCookie("openId")
        }
      })
      console.log(err);
    })
  },
  methods:{
    todetails(item) {
      this.$router.push({
        path:'/hotelDetail',
        query:{
          hotelSign: item.hotelSign
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
#hotelList {
  min-height: 100vh;
  color:rgb(207, 207, 207);
  padding: 10px 10px 0;
  .hotelList_title {
    margin-bottom: 10px;
    font-size: 16px;
    color: #000;
    background-color: #fff;
    padding: 6px 0;  
  }
  .hotel {
    overflow:hidden;
    border-radius: 6px;
    margin-bottom: 10px;
    box-shadow: 0 0 6px 1px #ccc;
    background-color: #fff;
    .hotel-center {
      padding: 20px 12px;
      .hotel-center-top {
        height: 22px;
        .hottem-name {
          color: rgb(28, 88, 253);
          font-size: 15px;
          font-weight: bold;
          text-indent: 1em;
        }
        .hotel-lose {
          padding-right: 14px;
          i {
            font-size: 14px;
          }
        }
      }
      .hotel-center-content {
        border: 1px solid #ccc;
        margin-top: 10px;
        li{
          padding: 6px 0px;
          display: inline-block;
          width: 25%;
          border-right: 1px solid #ccc;
          font{
            color:#000;
            font-weight: bold;
          }
        }
        li:last-child{
          border-right: none;
        }
      }
    }
  }
  .hotel:last-child{
    margin-bottom:0px;
  }
  
}
</style>
