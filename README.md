## **frp用户认证插件**

## **介绍**

[frp-auth项目地址，有用的话，欢迎fork、start](https://github.com/ywymoshi/frp-auth)

为frp做一层权限认证，使用者必须先注册账号，和注册域名，才能使用frp服务，每个用户暂时只支持申请一个域名使用， 可自行修改代码架设一层付费服务，代码仅供参考，提供思路。

该项目使用的是邮箱验证码。

![img](https://pic2.zhimg.com/v2-9af33496d7bc8c345b9aa9e7cf385069_b.png)

![img](https://pic4.zhimg.com/v2-25f636ae2abc77934ba49d397ead10a3_b.png)

## **安装**

**将该项目部署到服务器**

```
 git clone git@github.com:ywymoshi/frp-auth.git
 
 npm install
 # 运行
 npm start
 
 # 停止请执行
 npm stop
```

服务器中配置环境变量：（也可直接修改config/config.default.js中的配置）

```
 # mongodb 连接
 export process.env.SERVER_MONGODB_URL= ”mongodb://127.0.0.1:27017“
 # mongodb redis 密码
 export process.env.SERVER_REDIS_PWD = "*********"
 # mongodb stmp 邮箱
 export process.env.SERVER_SMTP_USER = "******@qq.com"
 # mongodb stmp 密码
 export process.env.SERVER_SMTP_PASS = "************"
 # mongodb jwt SECRET
 export  process.env.SERVER_JWT_SECRET = "you secret"
```

**访问服务器 7001 端口 即可访问该项目。**

## **配置**

服务器安装frp请参考：[frp之https穿透](https://zhuanlan.zhihu.com/p/371234742)

配置服务器端frps.ini:** 

```
 [common]
 bind_port = 7000
 vhost_http_port = 8000
 vhost_https_port = 8443
 
 # 自行选择是否配置
 token = 123456
 
 # 你的域名
 subdomain_host = frp.youdomain.com
 
 [plugin.user-manager]
 addr = 127.0.0.1:7001
 path = /frpAuth
 ops = NewProxy
```

**配置客户端frpc.ini:**

如： 注册的账号密码为：admin, 123456 则：

```
 [common]
 server_addr = 你的服务器ip
 server_port = 你的服务器frps bind_port
 
 # 自行选择是否配置,与服务端保持一致
 token = 123456
 
 # 认证重点，输入你注册的账号密码
 meta_username = admin
 meta_password = 123456
 
 [web]
 type = http
 local_ip = 127.0.0.1
 # 映射的本地端口
 local_port = 7001
 
 # 域名前缀
 subdomain = web
```

**访问 web.frp.youdomain.com   即可**。