<script lang="jsx">
//jsx语法{} 包裹js 不能有if else  可以使用map。遇到js使用{}

import { defineComponent,reactive,onMounted  } from 'vue';
import {useRoute,useRouter} from 'vue-router'
import "@/styles/goodDetail.scss"
import PageHeader from "@/components/pageHeader.vue"
import {getGoodsDetailAPI,updateGoodsCarAPI} from "@/api/index"
import {uInfoStore} from "@/pinia/uninfo.js"
import {orderGoodStore} from "@/pinia/orderList.js"
import {ElMessage} from "element-plus"
export default defineComponent({
  setup(){
    const data= reactive({
      detailData:{},
      activeImgIndex:0,
      color:"",
      size:"",
      num:1,
    })
    const route = useRoute()
    const router = useRouter()
    const uStore = uInfoStore()
    const orderGStore = orderGoodStore()
    onMounted(()=> {
      getDetail()
    })
    const getDetail= _ => {
      getGoodsDetailAPI({id:route?.query?.id}).then(res=>{
        data.detailData= res?.body||{}

        data.color =data.detailData?.colors[0]
        data.size=data.detailData?.sizes[0]
        console.log("data.detailData___________",data.detailData)
      })
    }
    const addMyCar = _ => {
        updateGoodsCarAPI({
          "userId": uStore?.uInfo?.id,
          "goodsInfo":[
            {"goodsId":route?.query?.id,"num":data.num,"color":data.color,"size":data.size},
          ]
        }).then(res=>{
          if(res.code===200) {
            ElMessage({
              message:"加入购物车成功",
              type:'success',
            })
          }
        })
    }
    return () => (<div class="detail_box"><PageHeader />
      <div class="main">
        <div class="top flex-float">
          <div class="left">
            <div class="active_img">
              {data.detailData.images && <img src={data.detailData.images[data.activeImgIndex]}/>}
              </div>
              <div class="img_list flex">
                {
                  data.detailData.images && data.detailData.images.map((el,index)=> (<img key={index} class={data.activeImgIndex === index ? "active":""} src={el} onClick={_=> {
                    data.activeImgIndex= index
                  }}/>
                  ))
                }
                </div>
            </div>
           <div class="right">
            <div class="flex-float">
              <span class="title">{data.detailData.goodsName}</span>
              <h3 class="good_rating">{data?.detailData?.goodRat}</h3>
              </div>
              <div class="info_box">
                <div>
                  <el-form-item label="单价">
                    <h3 class="pricce"><span>￥</span>{data?.detailData?.price}</h3>
                  </el-form-item>
                  <el-form-item label="颜色">
                    <el-select v-model={data.color} size="mini" class="m-2" placeholder="Select">
                      {
                        data?.detailData?.colors?.map((colors,cIndex)=> (<el-option
                        key={cIndex}
                        label={colors}
                        value={colors}
                        />))
                      }
                      </el-select>
                    </el-form-item>
                    <el-form-item label="尺码">
                      <el-select v-model={data.size} size="mini" class="m-2" placeholder="Select">
                        {
                          data?.detailData?.sizes?.map((sizes,cIndex)=>(<el-option
                          key={cIndex}
                          label={sizes}
                          value={sizes}
                          />))
                        }
                        </el-select>
                      </el-form-item>
                  </div>

                  <div class="text">
                    <p>产地:中国</p>
                    <p>材质:纯棉</p>
                    <p>配送:官方下单后1-3日内配送到家</p>
                    <p>邮费:免邮</p>
                    <p>正品保证:由太平洋保险正品承担保证</p>
                    </div>
                </div>
                <div class="_bottom">
                    <el-form-item label="数量">
                      <el-input-number v-model={data.num} min={1} max={10000}/>
                      </el-form-item>
                      <div class="flex">
                        <el-button type="primary" size="large" plain onClick={_=>{
                          // 存储数据
                          const orderGdata = {
                            ...data.detailData,
                            num: data.num,
                            color:data.color,
                            size:data.size
                          }
                          orderGStore.list=[orderGData]
                          orderGStore.type=1
                          router.push({path:"/settlement"})
                        }}>立即购买</el-button>
                        <el-button type="primary" size="large" onClick={addMyCar}>加入购物车</el-button>
                        </div>
                        <div class="good_detail" v-html={data?.detailData?.richtext}></div>
                  </div>
            </div> 
          </div>
        </div>
      </div>)
  }
})

</script>