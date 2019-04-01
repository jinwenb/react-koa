## 此项目是前后端都做得一个全栈项目

-- 服务器端使用的是mysql mongodb  koa websocket

-- 客户端使用了react 全家桶 redux react-redux redux-thunk  react-router


-- 客户端一级路由有 main 主组件 login 登陆组件 register 注册组件
-- 这里使用了cookie进行了用户自动登陆

-- main 组件里有2级路由 分为用户聊天列表 用户完善信息页面 用户信息查看和退出页面  老板详情页面  大神详情页面


-- axios 文件夹是封装ajax请求函数的模块

-- container 是路由组件文件夹

--component  是非路由组件

-- redux文件夹是封装redux操作的一系列模块





-- 1. 打开电脑的mongodb数据库

- 2.打开电脑的mysql数据库新建一个user表

-- id char(32) 这个项目采用的id是uuid的方式

-- username varchar(30)

-- password varchar(32) 次密码采用md5加密了

--type 类型 varchar(6)

--head 存储头像信息字段  varchar(10)

--post 描述 varchar(30)

--info 信息字段 varchar(30)

--company varchar(30)

--salary varchar(30)

  --打开zhipin-server  yarn start
  --打开客户端 yarn start
  