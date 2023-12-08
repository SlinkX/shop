<script lang="jsx">
    // jsx语法 {}包裹JS   不能有if  else  可以使用map
    // 遇到js  使用  {}
    import {defineComponent,reactive,onMounted,watchEffect} from "vue"  
    import   "@/styles/orderList.scss" 
    import PageHeader from "@/components/pageHeader.vue"    
    import {geOrderListAPI} from "@/api/index"
    import {uInfoStore} from "@/pinia/uinfo.js"
    export default defineComponent({
        setup(){
            const data=reactive({  
                list:[]
            })    
            const  uStore= uInfoStore()
            onMounted(()=>{
                geOrderListAPI({ 
                    userId :uStore.uInfo?.id,
                }).then(res=>{
                    data.list = res?.body||[]
                })
            })    
            return ()=>(<div class="orderList_box"><PageHeader /> 
                <div class="main good_box">
                    {
                        data?.list?.length==0&&<el-empty description="暂无订单" />
                    }
                    {
                        data.list.map((el,index)=>{
                            return <div key={el.orderNo} class="order_item"> 
                                <p>订单号：{el.orderNo}</p>
                                <p>订单总价：{el.total}</p>
                                {el.goodsInfo.map((el2,index2)=>{
                                    return <div  class="good_item">
                                         
                                    <div class="item_content">
                                        <img class="img" src={el2?.images[0]} />
                                            <div class="title">{ el2.goodsName}</div>
                                            <div class="other"> {
                                            `顔色分类：${el2.color}+${el2.baseType}` 
                                            }<br/>
                                            {`尺码：${el2.size}`}
                                            </div>
                                        <div class="price"> 单价：￥{el2.price}</div>
                                        <div class="price"> 数量：{el2.num}</div> 
                                    </div>
                                    </div>
                                })}
 
                    </div>
                        })
                    }
                </div>
            </div>
            )
        }
    })
</script>