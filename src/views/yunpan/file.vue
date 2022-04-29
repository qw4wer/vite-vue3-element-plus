<template>
  <upload url="http://127.0.0.1:3000/api/files/upload" :limit=5 :multiple=true basePath="/xxx/"></upload>
</template>
<script>

export default {
  name:"file",
  setup(props) {
  },
}
</script>
