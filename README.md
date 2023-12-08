# xshop（Warnning:此项目为练习项目目前后端不在维护）
vue3 官网：https://cn.vuejs.org/    https://cn.vuejs.org/api/composition-api-setup.html
1.  根节点支持多个
2.   生命周期 
destroy变为了 unmount
vue3 Composition API 方式  不使用create生命周期，
Composition API 方式   使用直接导入的 on【生命周期名字】注册生命周期钩子函数
3. Composition API （组合式）
3.1 setup
函数：
setup语法糖
3.2 getCurrentInstance
获取当前组件实例
3.3 响应式基础API
reactive， ref  ：声明响应式数据，对象的话只是对象响应式， 内部属性不是，解构会丢失响应式。
ref可以同时处理基本数据类型和对象，而reactive只能处理处理对象而支持基本数据类型。
ref:获取DOM 
toRef和toRefs
toRefs可以将对象（只能接收rective对象）中的属性变成响应式

要在组件模板中使用响应式状态，需要在 setup() 函数中定义并返回。 
4. 响应式数据实现：
vue2中响应式是通过defineProperty实现的，vue3中是通过ES6的Proxy来实现的
ref优点：
适合传递单个变量
避免解构陷阱
reactive优点： 
适合声明大量反应变量
JavaScript 和模板之间的一致性
跟 Vue 2 的数据对象很相似
ref和reactive二者响应式数据实现的方式不同
ref是通过一个中间对象RefImpl持有数据，并通过重写它的set和get方法实现数据劫持的，本质上依旧是通过Object.defineProperty 对RefImpl的value属性进行劫持。

reactive则是通过Proxy进行劫持的。Proxy无法对基本数据类型进行操作 
Vue3移除的API
1. 不再支持keycode作为v-on的修饰符
2. 移除 filter
3. $destory实例方法删除
##此项目结构
![image](https://github.com/SlinkX/shop/assets/144294415/93a43e84-eff3-4364-88ce-dce38c95bd00)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
