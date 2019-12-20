<template>
  <div id="roomState1">
    <div class="weui-panel__hd whiteBcg font-left">{{hotelName}}酒店-房间列表</div>
    <div class="weui-flex room-list" v-for="(item,index) in roomList" :key="index">
      <div class="weui-flex__item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fangtai" />
        </svg>
        <br />{{item.room}}
      </div>
      <div class="weui-flex__item">
        入住状态
        <br />
        <span class="font-success" :style="{color: item.check ? 'green':'#ccc'}">{{item.check ? '在住':'空闲'}}</span>
      </div>
      <div class="weui-flex__item">
        房间状态
        <br />
        <span class="font-error" :style="{color: item.clean == 2 ? '#ccc' : item.clean == 1 ? 'red' : '#000'}" >{{item.clean == 2 ? "清洁": item.clean == 1 ? "脏房" : "干净" }}</span>
      </div>
      <div class="weui-flex__item">
        是否异常
        <br />
        <span class="font-error" :style="{color: item.exception ? 'red':'#ccc'}" >{{item.exception ? "异常" : "无异常"}}</span>
      </div>
      <div class="weui-flex__item">
        可用
        <br />
        <span class="font-error" :style="{color: item.use ? 'green':'red'}" >{{item.use ? "可用" : "停用"}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hotelName:'',
      hotelSign:'',
      roomList: []
    };
  },
  components: {},
  created(){
    this.hotelName = this.$route.query.hotelName;
    this.hotelSign = this.$route.query.hotelSign;
    this.getAxios(`/consumer/PmsForWx/room/${this.hotelSign}/`).then(res =>{
      console.log('roomList',res)
      if(res.data.status == '200' && res.data.data) {
        this.roomList = res.data.data.list || [];
      }
    }).catch(err => {
       console.log('roomListError',err)
    })
  }
};
</script>

<style scoped lang="less">
#roomState1 {
  text-align: center;
  .room-list {
    margin: 10px 10px 0;
    background-color: #fff;
    padding: 8px 0px 4px;
    border-radius: 4px;
  }
}
</style>