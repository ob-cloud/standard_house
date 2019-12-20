<template>
  <div id="hotelSet" class="page">
    <div class="weui-cells__title hotel-name">{{hotelName}}</div>
    <div class="weui-cells__title">授权</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">授权给</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" placeholder="请输入手机号" v-model="phone" />
        </div>
        <div class="weui-cell__ft">
          <button
            href="javascript:;"
            class="weui-vcode-btn rule-color"
            @click="empower"
            :disabled="!phone || inSub"
          >确认授权</button>
        </div>
      </div>
    </div>
    <!-- <div class="empower">
     <span>授权给</span>
     <input type="number" placeholder="请输入手机号码">
     <button>确认授权</button>
    </div>-->
    <div class="weui-cells__title">注：输入的手机号码必须灌注公众号并登录当前系统</div>
    <div class="weui-cells__title">设置通知与提醒</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_switch">
        <div class="weui-cell__bd">
          向我推送
          <span class="rule-color">酒店实时违规</span>
        </div>
        <div class="weui-cell__ft">
          <input class="weui-switch" type="checkbox" v-model="isClose" :disabled="inSub2" />
        </div>
      </div>
    </div>
    <loadScan v-if="inSub2" msg="切换中..." icon="#icon-shezhi"></loadScan>
  </div>
</template>
<script>
import { setTimeout } from "timers";
import loadScan from "../components/loading";
export default {
  data() {
    return {
      phone: "",
      hotelName: "",
      hotelSign: "",
      inSub: false,
      isClose: null,
      inSub2: false,
      isbegin : true,
    };
  },
  created() {
    this.isClose = this.$route.query.status ==1 ? true : false;
    this.hotelSign = this.$route.query.hotelSign;
    this.hotelName = this.$route.query.hotelName;
  },
  methods: {
    empower() {
      this.inSub = true;
      if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
        this.postAxios(`/consumer/PmsForWx/setting`, {
          hotelSign: this.hotelSign,
          mobile: this.phone,
          status: 1
        })
          .then(data => {
            this.inSub = false;
            if (data.data && data.data.status == "201") {
              alert("授权成功");
            }
          })
          .catch(err => {
            this.inSub = false;
            alert(err.response.data.message);
          });
      } else {
        this.inSub = false;
        alert("请输入正确11位电话号码");
      }
    }
  },
  watch: {
    isClose(val, oldVal) {
      if(this.isbegin) {
        this.isbegin = false;
        return;
      }
      this.inSub2 = true;
      this.postAxios(`/consumer/PmsForWx/setting`, {
        hotelSign: this.hotelSign,
        status: val * 1
      })
        .then(data => {
          this.inSub2 = false;
          if (data.data && data.data.status == "201") {
            alert(`切换${val ? "开启" : "关闭"}成功`);
            this.$router.back();
          }
        })
        .catch(err => {
          console.log(err)
          this.inSub2 = false;
          alert(err.response.data.message);
        });
      // 发送请求改变
    }
  },
  components: {
    loadScan
  }
};
</script>

<style scoped lang="less">
#hotelSet {
  text-align: left;
  .weui-cells,
  .weui-vcode-btn {
    font-size: 15px;
  }
  .hotel-name {
    color: #fff;
    background-color: rgb(47, 150, 255);
    font-weight: bold;
    margin: 0;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .hotel-title {
    height: 26px;
    line-height: 26px;
    padding-left: 20px;
    color: #ccc;
    font-size: 12px;
    font-weight: bold;
  }
  .hotel-title:nth-child(2) {
    padding-top: 35px;
    height: 56px;
  }
  .empower {
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    color: #000;
    background-color: #fff;
    span {
      line-height: 36px;
      font-weight: bold;
    }
    input {
      flex-grow: 1;
      margin: 0 20px;
      border: none;
      padding: 8px 20px;
    }
    button {
      color: rgb(47, 150, 255);
      background-color: #fff;
      border: none;
    }
  }
  .rule-color {
    color: rgb(47, 150, 255);
  }
}
</style>
