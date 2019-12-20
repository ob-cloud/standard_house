<template>
  <div id="hotelErrorList">
    <div class="weui-panel__hd whiteBcg font-left">{{hotelName}}-异常信息列表</div>
    <div class="weui-cells" v-for="(item,index) in errList" :key="index" @click="errDetial(item)">
      <div  class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p class="dot-parent">
            {{item.room}} - {{item.type ? '飞房':'Obox掉线'}}
            <span class="weui-badge weui-badge_dot" v-if="!item.isRead"></span>
          </p>
        </div>
        <div class="weui-cell__ft">详情</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hotelSign: "",
      hotelName: "",
      errList: [],
    };
  },
  created() {
    this.hotelSign = this.$route.query.hotelSign;
    this.hotelName = this.$route.query.hotelName;
    this.getErrorList();
  },
  methods: {
    getErrorList() {
      this.getAxios(`/consumer/PmsForWx/exception/${this.hotelSign}/`)
        .then(res => {
          console.log("roomList", res);
          if(res.data.status == '200') {
            this.errList = res.data.data.hotel
          }
        })
        .catch(err => {
          this.errList = []
          console.log("roomListError", err);
        });
    },
    errDetial(item) {
      this.putAxios(`/consumer/PmsForWx/exception/${item.msgId}`).then(data => {}).catch(err => {});
      this.$router.push({
        path:'/hotelErrordetail',
        query:{
          detail:JSON.stringify(Object.assign(item,{hotelName:this.hotelName}))
        }
      })
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
#hotelErrorList {
  text-align: left;
  .weui-cells {
    font-size: 12px;
    margin-top: 4px;
  }
  .dot-parent {
    display: inline-block;
    position: relative;
    padding-right: 10px;
    span {
      position: absolute;
      right: 0px;
      top: -2px;
    }
  }
}
</style>
