<script lang="jsx">
    // jsx语法 {}包裹JS   不能有if  else  可以使用map
    // 遇到js  使用  {}
    import {defineComponent,reactive,onMounted,watchEffect} from "vue" 
    import { useRouter } from "vue-router"
    import   "@/styles/carList.scss" 
    import PageHeader from "@/components/pageHeader.vue"  
    import {getCarListAPI,updateGoodsNumCarAPI} from "@/api/index"
    import {uInfoStore} from "@/pinia/uinfo.js"
    import { ElMessage } from 'element-plus'
    import {orderGoodStore} from "@/pinia/orderList.js" 
    export default defineComponent({
        setup(){
            const data=reactive({  
                carList:[],
                checkList:[],
                checkAll:false,
                indeterminate:false, //全选或者没有选的时候false
                editStatus:false
            }) 
            const  uStore= uInfoStore()
            const orderGStore = orderGoodStore()
            const router = useRouter()
            onMounted(()=>{  
                geList()
            })  
            watchEffect(()=>{ 
                const checkList = data.checkList
                data.indeterminate= checkList.length===data.carList.length||checkList.length===0?false:true
                data.checkAll = checkList.length===data.carList.length
            }) 
 
            const geList =_=>{
                getCarListAPI({userId :uStore.uInfo?.id}).then(res=>{
                    data.carList = res?.body||[]
 
                })
            }
            const saveCarListChange=_=>{
                console.log("修改后的数据",data.carList)
                updateGoodsNumCarAPI({userId :uStore.uInfo?.id,
                    goodsInfo:data.carList.map(el=>{ 
                        return {
                            "goodsId":el.id,"num":el.num,"color":el.color,"size":el.size
                        }
                    })
                }).then(res=>{
                    if(res.code===200){
 
                        ElMessage({
                            message:"保存成功",
                            type: 'success',
                        })
                    }
                })
            }
            return ()=>(<div class="carList_box"><PageHeader /> 
 
                <div class="main">
                    <div class="flex top_bar">
                        <el-checkbox
                            v-model={data.checkAll}  
                            indeterminate={data.indeterminate}
                            label="全选"
                            onChange={val=>{ 
                                if(val){
                                    data.checkList= data.carList.map((el,index)=>index)
                                }else{
                                    data.checkList=[] 
                                }
                            }}
                        /> 
                            <span class="title1">商品信息</span>
                            <span class="title2">单价</span>
                            <span class="title3">数量</span>
                            <el-button onClick={_=>{
                                data.editStatus=!data.editStatus
                                if(data.editStatus===false){
                                    saveCarListChange()
                                }
                                }}>{
                                    data.editStatus?"退出管理":"管理"
                                }</el-button>
                    </div>
            <div>
                <el-checkbox-group v-model={data.checkList} 
                    onChange={vals=>{ 
                        data.checkList=vals
                    }}
                >
                {
                    data.carList?.length==0&&<el-empty description="暂无商品" />
                }
                {
                    data.carList.map((el,index)=><div class="good_item">
                        <el-checkbox label={index} > </el-checkbox>
                        <div class="item_content">
                            <img class="img" src={el?.images[0]} />
                            <div class="title"> {el.goodsName}</div>
                            <div class="other"> {
                                `顔色分类：${el.color}+${el.baseType}` 
                                }<br/>
                                {`尺码：${el.size}`}
                                </div>
                            <div class="price"> ￥{el.price}</div>
                            <div class="number"> 
                                {
                                    !data.editStatus?el.num:<el-input-number v-model={el.num}  min={1} max={1000000}  />
                                }
                                 
                            </div>
                        </div>
                    </div>
                     
                     )
                }
                     
                </el-checkbox-group>
             </div>
                <div class="pay_btn">
                    <el-button size="large" type="primary" onClick={_=>{
                            const checkLength  =data.checkList.length
                            console.log("data.checkList",data.checkList)
                            if(!checkLength){
                                ElMessage({
                                    message:"请选择商品",
                                    type: 'warning',
                                })
                                return 
                            }
                            orderGStore.list = data.checkList.map(el=>{
                                return data.carList[el]
                            })
                             
                            orderGStore.type=2
                            router.push({path:"/settlement"})
                        }}>去支付</el-button>
                </div>
                </div>
 
                 
        </div>)
        }
    })
</script>
