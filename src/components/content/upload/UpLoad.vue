<template>
  <el-upload
    class="avatar-uploader"
    :action="baseUrl + actionUrl"
    :name="name"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <div v-if="fileType === 'video'">
      <video 
      v-if="imageUrl" 
      :src="baseUrl + '/' + imageUrl"
      controls
      autoplay></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>    
    </div>
    <div v-else>
      <img v-if="imageUrl" :src="baseUrl + '/' + imageUrl" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
  </el-upload>
</template>

<script>
export default {
  name: 'UpLoad',
  props: {
    // 上传图片参数
    name: {
      type: String,
      default: ''
    },
    // 图片src地址
    imageUrl: {
      type: String,
      default: ''
    },
    // 上传图片地址
    actionUrl: {
      type: String,
      default: ''
    },
    // 上传文件类型
    fileType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 公共地址
      baseUrl: process.env.VUE_APP_BASEURL
    }
  },
  
  methods: {
    handleAvatarSuccess (res) {
      const file_path = res?.data?.file_path || res?.data?.url
      this.$emit('input', file_path)
      this.$emit('handleAvatarSuccess')
    },
    beforeAvatarUpload (file) {
      // 如果上传的是视频
      if (this.fileType === 'video') {
        const isMP4 = file.type === 'video/mp4'
        const isLt4M = file.size / 1024 / 1024 < 4

        if (!isMP4) {
          this.$message.error('上传视频只能是 MP4 格式!')
        }
        if (!isLt4M) {
          this.$message.error('上传视频大小不能超过 4MB!')
        }
        return isMP4 && isLt4M
      } else {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG or PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
}

</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  left: 90px;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload img {
  width: 178px;
  height: 178px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>