<script lang="jsx">
import { defineComponent, reactive, onMounted } from "vue";
import "@/styles/pageHeader.scss";
import logoImg from "@/assets/images/logo.png";
import { useRouter, useRoute } from "vue-router";
import { uInfoStore } from "@/pinia/uinfo.js";
import { getTypesAPI, getBrandAPI } from "@/api/index";
export default defineComponent({
  setup(props, ctx) {
    const data = reactive({
      searchVal: "",
      activeIndex: "1",
      menuData: [],
    });
    const navList = [
      { name: "首页" },
      { name: "我也询价" },
      { name: "快速下单" },
      { name: "采购指南" },
      { name: "服务保障" },
    ];
    const router = useRouter();
    const route = useRoute();
    // store
    const uInfoData = uInfoStore();
    onMounted(() => {
      init();
    });
    // 初始函数
    const init = () => {
      getTypes();
    };
    // 获取分类数据
    const getTypes = () => {
      getTypesAPI().then((res) => {
        console.log("Fenlei", res);
        data.menuData = res?.body || [];
      });
    };
    // 分类改变
    const handleSelect = (key, keyPath) => {
      console.log("router", route);
      if (route.path !== "/") {
        router.push({ path: "/" });
        return;
      }
      const index_ = key.split("-");
      const fB = data.menuData[index_[0]];

      ctx.emit("typeChange", {
        baseType: fB.key,
        subType: fB.value[index_[1]],
      });
    };
    const toLogin = (_) => {
      router.push({
        path: "/login",
        query: {
          toUrl: encodeURIComponent(route.fullPath),
        },
      });
    };
    // 退出
    const quitLogin = (_) => {
      localStorage.removeItem("uInfo");
      uInfoData.$reset();
      toLogin();
    };

    return () => (
      <div>
        <div class="main">
          <div class="flex-float header-top">
            <span>衣橱世家 匠心制作</span>
            <div class="flex-float">
              <span
                onClick={(_) => {
                  router.push({ path: "/orderList" });
                }}
              >
                我的订单
              </span>
              {JSON.stringify(uInfoData.uInfo) === "{}" ? (
                <div class="flex login-btns">
                  <div class="flex">
                    <el-icon>
                      <User />
                    </el-icon>
                    <span onClick={toLogin}>登录</span>
                  </div>
                  /<span onClick={toLogin}>注册</span>
                </div>
              ) : (
                <div class="flex login-btns">
                  <div class="flex">
                    <el-icon>
                      <User />
                    </el-icon>
                    <span>{uInfoData.uInfo.userName}</span>
                  </div>

                  <span onClick={quitLogin}>退出</span>
                </div>
              )}
            </div>
          </div>

          <div class="flex-float header-search">
            <img
              src={logoImg}
              class="logo"
              onClick={(_) => {
                router.push({ path: "/" });
              }}
            />
            <el-input
              v-model={data.searchVal}
              onInput={(_) => {
                ctx.emit("inputChange", data.searchVal);
              }}
              class="search-input"
              size="large"
              placeholder="请输入关键字"
              suffix-icon="Search"
            />
            <div
              onClick={(_) => {
                router.push({ path: "/carList" });
              }}
            >
              <el-icon>
                <ShoppingCart />
              </el-icon>
            </div>
          </div>
          {/* 导航 */}
          <div>
            <el-menu
              default-active={data.activeIndex}
              class="el-menu-demo"
              mode="horizontal"
              onSelect={handleSelect}
            >
              <el-sub-menu
                class="nav_1"
                v-slots={{
                  title: (_) => <div>分类</div>,
                }}
              >
                {data.menuData.map((el, index1) => {
                  const hasChild = !!el?.value?.length;
                  if (hasChild) {
                    return (
                      <el-sub-menu
                        index={String(index1)}
                        key={String(index1)}
                        v-slots={{
                          title: (_) => <div>{el.key}</div>,
                        }}
                      >
                        {el.value.map((el2, index2) => (
                          <el-menu-item
                            index={`${index1}-${index2}`}
                            key={`${index1}-${index2}`}
                          >
                            {el2}
                          </el-menu-item>
                        ))}
                      </el-sub-menu>
                    );
                  }
                  return (
                    <el-menu-item index={String(index1)} key={String(index1)}>
                      {el.key}
                    </el-menu-item>
                  );
                })}
              </el-sub-menu>

              {navList.map((el3, index) => (
                <el-menu-item index={`s_${index}`} key={`s_${index}`}>
                  {el3.name}
                </el-menu-item>
              ))}
            </el-menu>
          </div>
        </div>
        <div class="top_line"></div>
      </div>
    );
  },
});
</script>
