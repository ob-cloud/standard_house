<template>
  <div class="page" id="login">
    <div class="weui-loadmore" v-if="loading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">页面加载中</span>
    </div>
    <div v-else class="login-from">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell weui-cell_vcode">
          <div class="weui-cell__hd">
            <label class="weui-label">手机号</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="tel" v-model="from.phone" placeholder="请输入手机号" />
          </div>
          <div class="weui-cell__ft">
            <a class="weui-vcode-btn" v-if="num">{{num}}秒</a>
            <button
              class="weui-vcode-btn"
              @click="getCode"
              :disabled="!from.phone || inSub"
              v-else
            >获取验证码</button>
          </div>
        </div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell weui-cell_vcode">
          <div class="weui-cell__hd">
            <label class="weui-label">验证码</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" v-model="from.code" placeholder="请输入验证码" />
          </div>
          <div class="weui-cell__ft">
            <button
              class="weui-vcode-btn"
              :disabled="!from.code || inSub2"
              @click="login"
            >登 &nbsp;&nbsp; 录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import wx from "weixin-js-sdk";
import { setCookie, getCookie } from "../commont/js/commonMethods";
import { setInterval, setTimeout } from "timers";
export default {
  data() {
    return {
      loading: true,
      num: 0,
      inSub: false,
      inSub2: false,
      from: {
        phone: "",
        code: ""
      },
      timer: null
    };
  },
  components: {},
  created() {
    // setCookie("phone", '');
    // setCookie("openId", '');
    // setCookie("access_token", '');
    // setCookie("refresh_token", '');
    if (getCookie("access_token") && getCookie("openId") && getCookie("phone") && getCookie("refresh_token")) {
      this.$router.push({
        path:'hotelList',
        query:{
          openId: getCookie("openId"),
          mobile: getCookie("phone"),
          token: getCookie("access_token"),
        }
      })
    } else {
      setCookie("access_token",'')
      if (!this.$route.query.openid && !getCookie("openId")) {
        //没有获取到openid重新授权
        window.location.href = `http://www.on-bright-gz.com/callback_user.php?return_url=` + encodeURIComponent(this.addUrlPara('date',new Date() - 1));
      } else {
        this.from.phone = getCookie("phone")
        this.loading = false;
      }
    }
  },
  mounted() {},
  methods: {
    getCode() {
      this.inSub = true;
      // 校验电话号码
      if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.from.phone)) {
        this.putAxios(
          `/consumer/user/sendCodeToMobile?mobile=${this.from.phone}`,
          {}
        )
          .then(data => {
            this.inSub = false;
            if (data.data && data.data.message == "select success") {
              alert("验证码已经发送");
              this.num = 30;
              this.reduceNum();
            }
          })
          .catch(err => {
            this.inSub = false;
            alert(err.response.data.message);
            setCookie("access_token", '', 7);
          });
      } else {
        this.inSub = false;
        alert("请输入正确11位电话号码");
      }
    },
    reduceNum() {
      // if(this.num > 0) {
      //   this.num --;
      //   this.timer = setTimeout(() =>{
      //     this.reduceNum();
      //   },1000)
      // }
      this.tarInt = setInterval(() => {
        if (this.num > 0) {
          this.num--;
        } else {
          clearInterval(this.tarInt._id);
          this.tarInt = null;
        }
      }, 1000);
    },
    login() {
      this.inSub2 = true;
      this.postAxios(
        `/login/wx/sms?mobile=${this.from.phone}&code=${this.from.code}`
      )
        .then(data => {
          this.inSub2 = false;
          if(data.status == 200) {
            setCookie("phone", this.from.phone, 7);
            setCookie("openId", (this.$route.query.openid || getCookie("openId")), 7);
            setCookie("access_token", data.data.access_token, 7);
            setCookie("refresh_token", data.data.refresh_token, 7);
            this.putAxios(`/consumer/PmsForWx/setting`,{
              "mobile": getCookie("phone"),
              "openId": getCookie("openId")
            }).then(res => res).catch(err => err);
            this.$router.push({
              path:'hotelList'
            })
          }
        })
        .catch(err => {
          this.inSub2 = false;
          alert("验证码错误/过期请重新获取");
        });
    },
    addUrlPara(name, value) {
      var currentUrl = window.location.href.split('?')[0];
      if (/\?/g.test(currentUrl)) {
        if (/name=[-\w]{4,25}/g.test(currentUrl)) {
          currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);
        } else {
          currentUrl += "&" + name + "=" + value;
        }
      } else {
        currentUrl += "?" + name + "=" + value;
      }
      if (window.location.href.split('?')[1]) {
        return currentUrl + '?' + window.location.href.split('?')[1];
      } else {
        return currentUrl;
      }
    }
  },
  destroyed: function() {
    this.tarInt && clearInterval(this.tarInt._id);
  }
};
</script>

<style scoped lang="less">
#login {
  min-height: 100vh;
  .weui-loadmore {
    height: 100vh;
    margin: 0 auto;
    line-height: 60vh;
    font-size: 20px;
    .weui-loadmore__tips {
      color: #ccc;
    }
  }
  .login-from {
    .weui-cell_vcode {
      padding-left: 0;
    }
    padding: 10vh 20px 0;
    .weui-cell__ft {
      width: 110px;
      text-align: center;
      .weui-vcode-btn {
        width: 100%;
        padding: 0;
      }
    }
  }
}
</style>
