# vue-spa-demo
## vue+vue-router+axios+element-ui搭建的单页面脚手架工程
> 1、工程包含了完整的多语言方案，使用自己编写的i18n方法，相较于vuei18n只能在组建中使用外，可以在公共js文件，如自己编写的util.js里使用
国际化<br>
> 2、提供了换肤功能接口，可以实现主题切换<br>
> 3、提供了一个示例页面，示例页面包含了完整的增删改查功能<br>
> 4、公共组件采用element-ui的公共组件<br>
> 5、扩展了表单验证方法放到validate-extend.js里，方便相同的验证方法在不同组件里复用<br>

#####
按照如下步骤clone代码并启动可以看到工程示例

## 运行（安装nodeJs6.10+）
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

## 打包构建
```bash
npm run build
```