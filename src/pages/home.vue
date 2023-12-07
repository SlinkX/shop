<script lang="jsx">
    import { DefineComponent, reactive, onMountq,watchEffect} from 'vue';
    import {useRouter} from "vue-router"
    import PageHeader from "@/components/pageHeader.vue"
    import "@/styles/home.scss"
    import {getGoodsAPI,getBrandAPI} from "@/api/index"
    //watcheffect  回调里面用的数据都会被监控   不会返回 新旧值  effect
    export default defineComponent({
      setup() {
        const data = reactive({
          brandList:[],
          goodsList:[],
          typeParams:{},
          keywords:""
        })
        onMounted(()=>{
          getGoodList()
          getBrandAPI()
        })
        const rrouter = useRouter()
        const getBrand= params=>{
          getBrandAPI(params).then(res=>{
            data.brandList=res?.body||[]
          })
        }
        //1.页面初始化的时候获取所有商品
        //2.参数以来修改的时候进行查询
        const getGoodsList = params => {
          getGoodsAPI(params||{}).then(res=>{
            //images
            const listData= res?.body||[]
            data.goodsList= listData
            console.log("data.goodsList",data.goodsList)
          })
        }
        watchEffect(()=>{
          //但数据修改的时候立即执行
          //获取不到新旧值
          getGoodsList({
            ...data.typeParams,
            brand:data.checkBrandList.join(),
            goodsName:data.keywords
          })
        })
        const typeChange=params=>{
          data.typeParams=params
          data.checkBrandList=[]
          getBrand(params)
          //getGoodsLisyt(params)
        }
        const checkBrand = el => {
          const inndex = data.checkBrandList.findIndex(item=> item === el)
          if(index>-1)
          {
            retrun 
          }
          data.checkBrandList = [...data.checkBrandList,el]
        }
        const tagClose=el=>{
          const index = data.checkBrandList.findIndex(item=>item ===el)
          data.checkBrandList.splice(index,1)
        }
        const inputChange1=input=>{
          data.keywords=input
        }
        //watch监控商品的修改
        return () => {
            <div class ="home_box">
              <PageHeader onTypeChange={typeChange} onInputChange={inputChange1} />
              <div class="main">
                <div class="options">
                  <div class ="flex line">
                    <span class="title">品牌</span>
                    <span class="item">全部</span>
                    {
                      data.brandList.map((el,index)=>(<span class="item" key={index} onClick={_=>{checkBrand(el)}}>{el}</span>))
                    }
                    </div>
                    <div class="flex line">
                      <span class="title">类目</span>
                      <span class="item">全部</span>
                      <span class="item">类目1</span>
                      <span class="item">类目1</span>
                      <span class="item">类目1</span>
                      <span class="item">类目1</span>
                      <span class="item">类目1</span>
                      </div>
                  </div>
                  <div class="options-active flex-float">
                    <div class="left">
                      <h6>品牌</h6>
                      {
                        data.checkBrandList.map((el,index)=><el-tag
                        key={index}
                        closeable
                        class="mx-1"
                        onClose={_=>{
                          tagClose(el)
                        }}
                        >
                        {el}
                        </el-tag>)
                      }
                      </div>
                      <div class="right">
                        <h6>类目</h6>
                        </div>
                    </div>
                    <div class="flex goods_list">
                      {
                        data?.goodList?.length==0 && <el-empty description="暂无商品"/>
                      }
                      {
                        data.goodsList.map((el,index)=>(<div class="item"
                        onClick={_=>{
                          router.push({
                            path:"/detail",
                            query:{id:el.id}
                          })
                        }}
                        key={el.id}>
                        <div class="img_box">
                          <img src={el?.images[0]}/>
                          </div>
                          <p class="title">{el.goodsName}</p>
                          <p class="price">{el.price}</p>
                        </div>))
                      }
                      </div>
                </div>
              </div>
        }
      }
    })    
</script>