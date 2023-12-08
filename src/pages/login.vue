<script lang="jsx">
    import { defineComponent,reactive,ref } from 'vue';
    import '@/styles/login.scss';
    import {  useRoute,useRouter } from 'vue-router';
    import logoImg from "@/assets/images/logo.png"
    import bgImg from "@/assets/images/bg1.jpg"
    import {loginAPI} from "@/api/index"
    import {uInfoStore} from "@/pinia/uinfo.js"
    export default defineComponent({
        setup(){
            const route =useRoute()
            const router =useRouter()
            const toUrl =decodeURIComponent(route.query.toUrl|| "/")  
            const  uInfoData = uInfoStore() 
            const data = reactive({
                tabIndex:"1",
                formVal:{
                    uname:"",
                    password:""
                },
                formRules:{
                    uname:[
                        { required: true, message: '用户名必填'},
                        { pattern:/^[a-zA-Z]/, message: '用户名必须字母开头'},
                    ],
                    password:[
                        { required: true, message: '密码必填'},
                    ]
                }
            })
            const loginForm=ref(null)
            const handelTabClick=index=>{
                data.tabIndex=index
            } 
            const handelSubmit=_=>{
                 loginForm.value.validate().then((valid)=>{
                    console.log("校验结果valid",valid)
                    if(valid){
                        loginAPI({
                            userName:data.formVal.uname,
                            userPassword:data.formVal.password,
                        }).then(res=>{ 
                            localStorage.setItem("uInfo",JSON.stringify(res?.body||{}))
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
                    <img  src={logoImg} class="logo"/>
                </div>
                <div class="main flex-float">
                    <div class="login_left"> 
                        <img  src={bgImg} />
                    </div>
                    <div class="login_right">
                        <div class="flex-float tabs-title">
                            <span class={data.tabIndex=="1"?"active":''} onClick={_=>{handelTabClick("1")}}>密码登陆</span>
                            <div>|</div>
                            <span class={data.tabIndex=="2"?"active":''} onClick={handelTabClick.bind(this,"2")}>验证码登陆</span>
                        </div>
                        {/* 表单 */}
                        <el-form 
                        ref={loginForm}
                        model={data.formVal}
                        label-width="0"
                        class="demo-dynamic"
                        rules={data.formRules}
                        >
                        <el-form-item prop="uname" >
                            <el-input v-model={data.formVal.uname} placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item prop="password" >
                            <el-input v-model={data.formVal.password} placeholder={data.tabIndex=="1"?"请输入密码":"请输入验证码"} type="password" />
                        </el-form-item> 
                        <el-button size="large" type="primary" class="submit_btn" onClick={handelSubmit}>登录/注册</el-button>
                        </el-form>
                    </div>
                </div>
            </div>)
        }
    })
</script>