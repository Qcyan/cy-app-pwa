<template>
  <div class="home">
    <div class="title">桌面</div>

    <button v-show="prompt" @click="deferredPrompt(deferred)">添加到桌面</button>
    <img width="60px" alt="Vue logo" src="../assets/e.jpg">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->

  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data(){
    return {
      prompt: false,
      deferred: null,
    }
  },
  components: {
    HelloWorld
  },
  created() {
    window.onbeforeinstallprompt = (e) => {     //当浏览器触发横幅显示事件
      console.log(e);
      this.prompt = true;
      this.deferred = e;
    }
  },
  methods: {
    deferredPrompt(e) {
      if (e) {
        e.prompt(); //拉起添加横幅事件

        // 通过按钮点击事件触发横幅显示
        e.prompt();
        // 监控用户的安装行为
        e.userChoice.then((choiceResult) => {
          console.log(choiceResult.outcome);
          if (choiceResult.outcome === 'dismissed') {
            console.log('用户取消了安装');
          }
          else {
            console.log('用户已安装程序');

            this.prompt = false; //隐藏按钮
            this.deferred = null;
          }
        });
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .title{
    font-size: vw(24);
  }
</style>
