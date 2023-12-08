<script lang="jsx">
    // jsx语法 {}包裹JS   不能有if  else  可以使用map
    // 遇到js  使用  {}
    import {defineComponent,reactive,onMounted,watchEffect} from "vue"  
    import   "@/styles/settlement.scss" 
    import PageHeader from "@/components/pageHeader.vue"  
    import {payOrderAPI} from "@/api/index" 
    import {pcaTextArr} from "element-china-area-data"
    import {orderGoodStore} from "@/pinia/orderList.js"
    import {uInfoStore} from "@/pinia/uinfo.js"
    import {useRouter} from "vue-router"
    import { ElMessage } from 'element-plus'
    export default defineComponent({
        setup(){
            const data=reactive({  
                areaData:[] ,
                addressText:"",
                addressName:"",
                addressPhone:"",
                allPrice:""
            })  
            const orderGStore = orderGoodStore()
            const router = useRouter()
            const  uStore= uInfoStore()
            onMounted(()=>{   
                if(!orderGStore?.list?.length){
                    router.push({path:"/"})
                    return
                }
                // 计算总价
                let prices=0
                orderGStore.list.forEach(el=>{
                    prices+=Number(el.num)*Number(el.price)
                })
                data.allPrice=prices.toFixed(2)
            })    
            const payOrder=_=>{
                payOrderAPI({
                    userId :uStore.uInfo?.id,
                    "type":orderGStore.type, //1详情商品，2 购物车商品
                    "goodsInfo":orderGStore.list.map(el=>{
                    return{
                        "color":el.color,"goodsId":el.id,"num":el.num,"size":el.size
                    }
                }) 
                }).then(res=>{
                    if(res.code===200){ 
                        ElMessage({
                            message:"支付成功",
                            type: 'success',
                        })
                        router.push({path:"/orderList"})
                    }
                })
            }
            return ()=>(<div class="settlement_box"><PageHeader /> 
                <div class="main">
                    <div class="address_box">
                        <h4>收货信息</h4>
                        <div class="address_form">
                            <el-form-item label="所在地区">
                                <el-cascader placeholder="请选择省市区" v-model={data.areaData} options={pcaTextArr}  onChange={_=>{
                                    console.log("省市區",data.areaData)}}/> 
                            </el-form-item>
                             
                            <el-form-item label="详细地址">
                                <el-input
                                    v-model={data.addressText} 
                                    type="textarea"
                                    resize="none"
                                    placeholder="请输入详细地址"
                                />
                            </el-form-item>
                            <div class="flex">
                                 
                                <el-form-item label="收货人">
                                    <el-input
                                        v-model={data.addressName} 
                                        type="text"
                                        placeholder="请输入收货人"
                                    />
                                </el-form-item> 
                                <el-form-item label="手机号码">
                                    <el-input
                                        v-model={data.addressPhone} 
                                        type="number"
                                        placeholder="请输入手机号码"
                                    />
                                </el-form-item>
                            </div>
                        </div>
                        </div>
                        <div>
                            
                            {orderGStore.list.map((el,index)=><div key={index} class="good_item">
                          
                            <div class="item_content">
                                <img class="img" src={el?.images[0]} />
                                <div class="title">{ el.goodsName}</div>
                                <div class="other"> {
                                    `顔色分类：${el.color}+${el.baseType}` 
                                    }<br/>
                                    {`尺码：${el.size}`}
                                    </div>
                                <div class="other">数量：{el.num}</div> 
                                <div class="price">￥{el.price}</div> 
                            </div>
                        </div>)}
                        </div>
                        <div class="bottom">
 
                             
                            <div class="pay_info">
                                
                                <p>总价：￥{data.allPrice} </p>
                            </div>
                            <div class="pay_btn">
                                <el-button onClick={payOrder}>去支付</el-button>
                            </div>
                        </div>
                        </div>
 
                    </div>
                )
        }
    })
</script>