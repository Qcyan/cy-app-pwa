const path = require('path');
const hash = require('hash-sum')

const time = new Date().getTime();
//版本号hash
const versionHash = hash(time);

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack:{
    resolve:{
     alias:{
       '@':resolve('src'),
       '@assets':resolve('src/assets')
     }
    }
  },
  pwa: {
    //workbox配置
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/service-worker.js',
      //设置cache manifest的存放位置
//      precacheManifestFilename: `static/${versionHash}/precache-manifest.[manifestHash].js`
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/index.scss";`
      }
    }
  },
  devServer:{
    proxy: { // 配置跨域
      '/api': {
        target: 'http://118.25.26.26:8047/api/', //服务器ip
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
//  outputDir: `./dist`,
//  indexPath: `./views/index.html`,
//  assetsDir: `static/${versionHash}`
}