module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      "/consumer/user/sendCodeToMobile":{
         target: "https://aliiot.on-bright.com",
         ws: true,
         changeOrigin: true
      },
      "/consumer": {
        // target: "http://10.10.92.161:8201",
        target: "https://aliiot.on-bright.com",
        // target: "https://alicloud.on-bright.com",
        ws: true,
        changeOrigin: true,
        // pathRewrite: {  //链接一匡本地http://10.10.92.160:8201时候开启
        //  '^/consumer': '' 
        // }
      },
      "/login": {
        // target: "https://10.10.92.161:8401",
        target: "https://aliiot.on-bright.com",
        // target: "https://alicloud.on-bright.com",
        ws: true,
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false
}
