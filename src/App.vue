<template>
  <div id="app">
    <!-- :init="{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }" -->
    <editor
      id="tinymce"
      v-model="content"
      api-key="no-api-key"
      :init="editorInit"
    />
  </div>
</template>

<script>
import {upLoadPdf} from './apis/request/common'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/save'
import 'tinymce/plugins/image'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'

export default {
  name: 'App',
  components: {
    'editor': Editor
  },
  data () {
    return {
      content: '',
      editorInit: {
        language_url: '/tinymce/zh_CN.js', //指定中文包
        language: 'zh_CN',//中文
        skin_url: '/tinymce/skins/ui/oxide',//编辑器皮肤，
        height: 500,//高度
        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        elementpath: false, // 禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像
        menubar: false, // 隐藏最上方menu
        plugins: 'save advlist table lists paste preview fullscreen image',
        toolbar: 'fontselect fontsizeselect forecolor backcolor bold italic underline strikethrough save image| alignleft aligncenter alignright alignjustify | quicklink h1 h2 h3 h4 h5 h6 blockquote table numlist bullist preview fullscreen',
        images_upload_handler: function (blobInfo, success, failure) {
          var formData
          var file = blobInfo.blob() // 转化为易于理解的file对象
          formData = new FormData()
          formData.append('file', file, file.name) // 此处与源文档不一样
          upLoadPdf(formData).then(res => {
            if(res.status === 200) {
              let src = `http://10.72.2.108:30000/oss-service/oss/aegle/${res.data.filename}`
              success(src)
            } else {
              failure('上传图片失败')
            }
          })
          
        },
        paste_preprocess: function (plugin, args) {
          console.log('---paster')
        }
      }
    }
  },
  mounted () {
    tinymce.init({}) 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
