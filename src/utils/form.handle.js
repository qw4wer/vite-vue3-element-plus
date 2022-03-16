import {getCurrentInstance, inject, watch} from "vue";

import {useStore} from "vuex"

export default function formHandle() {
  const {proxy} = getCurrentInstance()
  const register = inject("register");
  const store = useStore()
  register(function () {
    return proxy
  });

  const validate = () => {
    const {form} = proxy.$refs
    return new Promise((resolve, reject) => {
      form.validate((valid) => {
        resolve(valid)
      })
    })
  }

  const clear = () => {
    proxy.$emit("clear")
  }

  return {
    validate,
    clear

  }

}

