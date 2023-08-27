// URLs
export const managerUrl = "http://47.100.136.75/manager/#/login";
export const baseUrl = "http://47.100.136.75:12000/";
export const codeUrl = "https://picsum.photos/310/155/?image=";
export const ipUrl = "https://api64.ipify.org?format=json";

// Time and messages
export const timeOut = 10000;
export const internetMsg = "网络错误";
export const sendMessageNotNull = "发送内容不能为空";

// Phone related messages
export const phoneNotEmpty = "请输入手机号码";
export const phoneError = "请输入正确的11位手机号码";

// Error messages
export const codeVerifyError = "验证失败";
export const loginError = "登录失败";

// Response codes
export const code = 0; // 数据正确返回code

//video WebSocket
const wsUri = "ws://localhost:9999/ws";
const wsBinaryType = "arraybuffer";
const videoId = "1294384753222123";
const userId = "98321837583332345";
const config = {
    wsUri:wsUri,
    wsBinaryType:wsBinaryType,
    videoId:videoId,
    userId:userId,
}
export default config;