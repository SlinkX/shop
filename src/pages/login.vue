<script lang="jsx">
import { DefineComponent,reactive,ref  } from 'vue';
import '@/styles/login.scss'
import {useRouter,useRoute} from 'vue-router';
import logoImg from "@/assets/Images/logo.png"
import bgImg from "@/assets/Images/bg1.jpg"
import {loginAPI} from "@/api/index"
import {uInfoStore} from "@pinia/uinfo.js"
export default defineComponent({
  setup(){
    const route = useRoute();
    const router = useRouter()
    const toUrl = dcodeURIComponent(route.query.toUrl||"/")
    const uInfoData =  uInfoStore();
    const data = reactive({
      tabIndex:"1",
      formVal:{
        uname:"",
        password:""
      },
      formRules:{
        uname:[
          {required:true,message:"用户信息必填"},
          {pattern:/^[a-zA-Z]/,message:"用户名必须以字母开头"},
        ],
        password:[
          {required:true,message:"密码必须填写"},
        ]
      }
    })
    const loginForm = ref(null) 
    const handleTabClick=index=>{
      data.tabIndex=index
    }
    const handleSubmit=_=>{
      loginForm.value.validate().then((valid)=>{
        console.log("校验结果valid",valid)
        if(valid){
          loginAPI({
            userName: data.formVal.uname,
            userPassword:data.formVal.password,
          }).then(res=>{
            localStorage.setItem("uInfo",JSON,stringify(res?.body||{}))
            uInfoData.$reset()
            router.push({
              path:toUrl
            })
          }).catch(err=>{
            console.log('err',err)
          })
        }
      })
    }
    return ()=>(<div class="login-box">
      <div class="main">
        <img src={logoImg} class="logo"/>
        </div>
        <div class="main flex-float">
          <div class="login_left">
            <img src={bgImg}/>
          </div>
          <div class="login_right">
            <div class="flex-float tabs-title">
              <span class={data.tabIndex=="1"?"active":''} onClick={_=>{handleTabClick("1")}}>密码登录</span>
              <div>|</div>
              <span class={data.tabIndex=="2"?"active":''} oonClick={handleTabClick.bind(this,"2")} >验证码登录</span>
              </div>
              {/*表单*/}
              <el-form 
                ref={loginForm}
                model={data.formVal}
                label-width="0"
                class="demo-dynamic"
                rules={data.formRules}
              >
                <el-form-item prop="uname">
                  <el-input v-model={data.formVal.name} placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model={data.formVal.password} placeholder={data.tabIndex=="1"?"请输入密码":"请输入验证码"} type="password"/>
                </el-form-item>
                <el-button size="large" type="primary" class="submit_btn" onClick={handleSubmit}>登录/注册</el-button>
                </el-form>
            </div>
        </div>
      </div>)
  }
})
</script>