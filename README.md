
## 技术栈及功能简介
> 1、技术栈vue+vue-router+vuex+axios+element-ui<br>
> 2、包含换肤功能，点击头部换肤按钮可以实现蓝色和紫色主题的切换<br>
> 3、包含多语言功能，点击头部语言切换按钮可以实现中文和英文的切换<br>
> 4、提供了一个示例页面，示例页面包含了完整的增删改查功能，rest接口用koa模拟<br>
> 5、公共组件采用element-ui的公共组件<br>
> 6、扩展了表单验证方法放到validate-extend.js里，方便相同的验证方法在不同组件里复用<br>
> 7、使用vuex做全局状态管理<br>

## 界面截图

### 中文紫色主题截图
![中文紫色主题截图](https://github.com/xiaoqiongxian/vue-spa-demo/tree/master/src/images/1.PNG)

### 英文蓝色主题截图
![英文蓝色主题截图](https://github.com/xiaoqiongxian/vue-spa-demo/tree/master/src/images/2.PNG)

## 按照如下步骤clone代码并启动可以看到工程示例

### 运行（安装nodeJs6.10+）
```bash
git clone https://github.com/xiaoqiongxian/vue-spa-demo.git
```
```bash
cd vue-spa-demo
```
```bash
npm install
```
```bash
npm run dev
```
Navigate to [http://loaclhost:8090](http://loaclhost:8090) or [http://127.0.0.1:8090](http://127.0.0.1:8090)

### 调用mock数据的rest接口（重新打开一个命令行窗口）
```bash
npm run mock
```

### 打包构建
```bash
npm run build
```