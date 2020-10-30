/**
 * 过滤特殊字符
 */
//过滤特殊字符返回去掉特殊字符的值
export function stripscript(s) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“’。，、？]"
  );

  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
//过滤特殊字符返回是否含有特殊字符的Boolean值
export function istripscript(str) {
  var pattern = /[`~!@#$^&*()=|{}':;',\\[\\].<>?~！@#￥……&*（）&;—|{}【】‘；：”“’。，、？]/;
  if (!pattern.test(str)) {
    return false;
  }
  return true;
}
/**
 * 邮箱验证
 */
export function emailValidate(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}
/**
 * 密码验证
 */
export function passValidate(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}
/**
 * 验证码验证
 */
export function codeValidate(value) {
  let reg = /^[a-z0-9]{6}$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}
