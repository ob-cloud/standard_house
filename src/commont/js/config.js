let baseUrl;   //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = ''  //这里是本地的请求url
        break
    case 'production':
        baseUrl = ''   //生产环境url: https://alicloud.on-bright.com
        break
}

export const baseURL  = baseUrl;