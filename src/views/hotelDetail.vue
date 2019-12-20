<template>
 <div class="page" id="hotelDetail">
   <load-scan msg="数据加载中..." icon="#icon-shezhi" v-if="loading"></load-scan>
  <div class="hoteldetail">
   <div class="detail-center">
    <div class="set-up">
      <router-link :to="`/hotelSet?hotelName=${hotelDetail.hotelName}&hotelSign=${hotelDetail.hotelSign}&status=${hotelDetail.status}`">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shezhi"></use>
        </svg>  
      </router-link>
    </div> 
    <div class="hotel-induct">
      <span class="hotel-name fl">{{hotelDetail.hotelName}}</span>
      <span class="hotel-totle-room fr">客房总数：{{hotelDetail.totalRoom}}</span>
    </div>
    <ul class="hotel-record">
      <li><span>{{hotelDetail.useRoom}}</span><br/>可售房数</li>
      <li><span>{{hotelDetail.usingRoom}}</span><br/>登录入住</li>
      <li><span>{{hotelDetail.exceptionRoom}}</span><br/>不合规用房</li>
      <li><span>{{hotelDetail.unUseRoom}}</span><br/>停用房数</li>
    </ul>
   </div>
  </div>
  <p class="room-status">房态</p>
  <ul class="status-list">
    <li>
     <router-link :to="`/roomState?hotelName=${hotelDetail.hotelName}&hotelSign=${hotelDetail.hotelSign}`">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fangtai"></use>
        </svg>
        <br/> 
      实时房态
     </router-link>
    </li>
    <li>
      <router-link :to="`/hotelErrorList?hotelName=${hotelDetail.hotelName}&hotelSign=${hotelDetail.hotelSign}`">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-chakanxiangqing"></use>
        </svg>
        <br/>
        核查详情
      </router-link>
    </li>
  </ul>
 </div>
</template>
<script>
import loadScan from '../components/loading';
export default {
  data() {
    return {
      hotelDetail:{},
      loading: true
    }
  },
  components: {
    loadScan
  },
  created(){
     this.getAxios(`/consumer/PmsForWx/hotel`).then( res =>{
      this.loading = false;
      if(res.data.message == 'select success' && res.data.data.hotel) {
        this.hotelList = res.data.data.hotel;
        this.hotelDetail = res.data.data.hotel.find(ele => this.$route.query.hotelSign == ele.hotelSign);
      } else {
        alert(res.data.message)
      }
    }).catch( err=> {
      this.loading = false;
      this.hotelList = [];
      console.log(err);
    })
  }
}
</script>

<style scoped lang="less">
#hotelDetail{
  background-color: transparent;
  padding: 10px 10px 0;
  .hoteldetail {
    box-shadow: 0px -170px 0px 150px rgb(42, 148, 251);
    border-radius: 6px;
    .detail-center {
      min-height: 100px;
      background-color: #fff;
      border-radius: 6px;
      .set-up { 
        font-size: 20px;
        text-align: right;
        padding: 6px 20px 0 0;
        color: rgb(42, 148, 251);
      }
      .hotel-induct {
        height: 40px;
        padding: 0 20px;
        line-height: 40px;
        margin-bottom: 6px;
        .hotel-name {
          font-size: 16px;
          font-weight: bold;
        }
        .hotel-totle-room {
          color: rgb(217,217,217);
        }
      }
      .hotel-record {
        display: flex;
        li {
          flex-grow: 1;
          color: rgb(217,217,217);
          border-right: 1px solid rgb(217,217,217);
          margin-bottom: 10px;
          span {
            color: #000;
          }
        }
        li:last-child{
          border-right: none;
        }
      }
    }
  }
  .room-status {
    font-size: 13px;
    text-align: left;
    padding: 4px 0 4px 20px;
    background-color: #fff;
    margin: 6px 0;
    color: rgb(217,217,217);
  }
  .status-list {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 6px 20px;
    .icon {
      font-size: 20px;
    }
  }
}
</style>
