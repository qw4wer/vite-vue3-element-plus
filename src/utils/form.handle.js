import {inject} from "vue";

export default function formHandle(instance) {
  const {ctx} = instance
  const register = inject("register");
  register(function () {
    return ctx;
  });

  const validate = () => {
    const {form} = ctx.$refs
    return new Promise((resolve, reject) => {
      form.validate((valid) => {
        resolve(valid)
      })
    })
  }

  const clear = () => {
    ctx.$emit("clear")
  }

  return {
    validate,
    clear
  }

}
;
