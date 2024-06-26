<template>
  <div class="login-form">
    <div style="padding: 20px 0px; display: flex; justify-content: space-between">
      <div style="font-size: 16px; color: #666">登录爱吃糖账号</div>
      <icon-qrcode
        @click="loginType = LoginType.QRCODE"
        style="height: 20px; width: 20px"
      ></icon-qrcode>
    </div>
    <el-form :model="loginForm" ref="form" :rules="rules" label-position="top">
      <el-form-item prop="account">
        <el-input placeholder="请输入账号或邮箱" v-model="loginForm.account">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="loginForm.password"
          :type="showPassword ? 'text' : 'password'"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
          <template #suffix>
            <span class="showPassword" @click="showPassword = !showPassword">
              <el-icon v-if="showPassword"><View /></el-icon>
              <el-icon v-else><Hide /></el-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>

      <div class="login-error">{{ errMsg }}</div>

      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submit(form)">
          登 录
        </el-button>
      </el-form-item>
    </el-form>
    <div style="display: flex; justify-content: space-between">
      <div class="login-type">
        仅此次登陆
        <input type="checkbox" v-model="isOnce" />
      </div>
      <div class="login-link">忘记密码？</div>
    </div>
    <el-divider>
      <div class="login-link" @click="$router.push({ name: 'Signup' })">
        没有账号？去注册
      </div>
    </el-divider>
  </div>
</template>

<script setup>
import { reactive, toRaw, ref, computed, onMounted } from "vue";
import { login } from "@/api/index";
import { ResponseStatusCodeEnum } from "@common/statusCode.js";
import { useLoginStatusStore } from "@/store/stores/login";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { ElMessage } from "element-plus";
import { loginType, LoginType } from "./index.ts";

import { View, Hide, User, Lock } from "@element-plus/icons-vue";
import { doLoginAction } from "@/store/stores/loginAction";
import iconQrcode from "@/icon/qrcode-half.svg?component";

const userStore = useLoginStatusStore();
const router = useRouter();

const route = useRoute();

// 有来源的话成功后会跳回去
const from = route.query.form;

const showPassword = ref(false);

const form = ref();

const errMsg = ref();

const isOnce = ref(false);

const loginForm = reactive({
  account: "",
  password: "",
});

const rules = reactive({
  account: [
    {
      message: "请输入 6 ~ 16 位长度的账号",
      trigger: ["blur"],
      validator(rule, val) {
        return val.length >= 6 && val.length <= 16;
      },
    },
  ],
  password: [
    {
      message: "请输入 6 ~ 16 位长度的密码",
      trigger: ["blur"],
      validator(rule, val) {
        return val.length >= 6 && val.length <= 16;
      },
    },
  ],
});

async function submit(form) {
  const validateRes = await form.validate(() => {});

  if (!validateRes) {
    return;
  }

  let res = await login(toRaw(loginForm));
  let status = res.status;
  if (status === ResponseStatusCodeEnum.ACCOUNT_NOT_EXIST) {
    message.info("账号不存在");
  } else if (status === ResponseStatusCodeEnum.PASSWORD_ERROR) {
    message.info("密码错误");
  } else if (status === ResponseStatusCodeEnum.LOGIN_SUCCESS) {
    message.success("登录成功");
    doLoginAction(res.data, isOnce.value);

    setTimeout(() => {
      router.replace({ name: "Home" });
    }, 1000);
  }
}
</script>

<style lang="less">
.login-form {
  width: 360px;
  .el-input__inner {
    font-size: 12px;
    font-weight: 300;
  }

  .el-input__prefix {
    color: #000;
  }
}

.showPassword {
  cursor: pointer;
  line-height: 30px;
  display: flex;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  color: var(--el-color-primary);
}

.login-link {
  color: #999;
  font-size: 12px;
  font-weight: 400;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: var(--el-color-primary);
    text-decoration: underline;
  }
}

.login-type {
  color: #999;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  gap: 5px;
}

.login-error {
  height: 12px;
  line-height: 0px;
  font-size: 12px;
  width: 100%;
  text-align: right;
  color: var(--el-color-error);
}
</style>
