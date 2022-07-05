<template>
  <upload
    :url="$apis['file'].multipleUpload"
    :limit="5"
    :multiple="true"
    basePath="/xxx/"
  ></upload>
  <file-manger
    :requestUrl="$apis['file'].fileList"
    :downloadFileUrl="$apis['file'].downFile"
    :multipleDownByZipUrl="$apis['file'].multipleDownByZip"
    :previewUrl="$apis['file'].preview"
  />
</template>
<script>
export default {
  name: "file",

  setup(props) {},
};
</script>
