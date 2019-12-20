<template>
  <div id="hotelErrordetail">
    <div class="weui-panel__hd whiteBcg font-left">{{errDetail.hotelName}}</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd font-left">异常房号：{{errDetail.room}}</div>
        <!-- <div class="weui-cell__ft">{{errDetail.time}}</div> -->
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd font-left">
          <span class="tips">详细数据：</span>
          <table border="1"  class="table-detail">
            <!-- <tr>
              <th>描述</th>
              <th>时间</th>
            </tr> -->
            <tr>
              <td>异常类型</td>
              <td>{{errDetail.type ? '飞房':'Obox掉线'}}</td>
            </tr>
            <tr>
              <td>异常时间</td>
              <td>{{errDetail.time |formatDate}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs"
export default {
  data() {
    return {
      errDetail: {}
    };
  },
  created(){
     this.errDetail = JSON.parse(this.$route.query.detail)
  },
  components: {},
  filters:{
    formatDate: value => {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
};
</script>

<style scoped lang="less">
#hotelErrordetail {
  .weui-cells {
    font-size: 14px;
  }
  .tips {
    font-size: 12px;
    color: #ccc;
  }
  .table-detail {
    width: 100%;
    border: 1px solid #ccc;
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    th,td {
      padding: 6px 0;
    }
  }
}
</style>
