import {inject} from "vue";

export default function formHandle(proxy) {
  const register = inject("register");
  register(function () {
    return proxy;
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
;
