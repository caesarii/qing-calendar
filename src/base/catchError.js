import Vue from "vue";
import iView from "iview";

Vue.use(iView);

let Modal = iView.Modal;

let ERR_INFO = {
    "1001": "服务器异常！请稍后尝试",
    "ERR_101550": "请求失败",
    "102938": "输入内容有误，请重试",
    "102940": "输入内容有误，请重试",
    "102945": "输入内容有误，请重试",
    "102947": "输入内容有误，请重试",
    "102939": "输入内容格式有误，请重试",
    "102941": "输入内容格式有误，请重试",
    "102946": "输入内容格式有误，请重试",
    "102942": "输入内容不可为空",
    "102943": "输入内容不可为空",
    "102944": "输入内容不可为空",
    "10100": "报销失败",
    "10105": "提交审核失败",
    "10110": "非企业员工，不能报销",
    "10112": "调整金额不能大于可报销金额",
    "10113": "申请开票失败:订单已在流程中",
    "10114": "查询不到此笔发票",
    "EPA009": "当前批次无法审核",
    "EPA012": "导入excel文件格式不正确,只支持xls:xlsx",
    "EPA013": "导入excel文件名不正确,正确的格式为：文件名V日期_时分秒.xlsx",
    "EPA014": "导入excel文件数据超过限制",
    "EPA053": "订单已经开过票了",
    "102931": "电话号码格式不正确",
    "102932": "手机号码格式不正确",
    "102933": "邮箱格式不正确",
    "102936": "时间格式不正确",
    "102969": "支付成功",
    "102970": "退款成功",
    "10025": "删除员工信息失败",
    "10038": "批量信息插入失败",
    "10027": "刷新企业二维码失败",
    "10026": "该企业二维码已失效",
    "10001": "用户名或密码错误",
    "10042": "登录失败",
    "10005": "修改密码失败",
    "10008": "密码初始化失败",
    "10004": "创建账号失败",
    "10009": "企业下的账号获取失败",

    // "10044": "批量处理员工申请失败%s条",
    // "10043": "批量删除员工失败%S条",

    "10101": "网络暂时开小差了，请稍后重试",
    "10104": "网络暂时开小差了，请稍后重试",
    "10106": "网络暂时开小差了，请稍后重试",
    "10020": "网络暂时开小差了，请稍后重试",
    "10024": "网络暂时开小差了，请稍后重试",
    "10015": "网络暂时开小差了，请稍后重试",
    "10039": "网络暂时开小差了，请稍后重试",
    "10013": "网络暂时开小差了，请稍后重试",
}
function catchError(e) {
    if (e.result) {
        let errorCode = e.result.errorCode;
        let errorMsg = e.result.message;
        if (errorCode && ERR_INFO[errorCode]) {
            if (errorCode == "10044" || errorCode == "10043" || errorCode =="EPA020") {
                Modal.warning({
                    title: '请注意',
                    content: errorMsg,
                })
                return;
            }
            Modal.warning({
                title: '请注意',
                content: ERR_INFO[errorCode],
            })
        }
    }
}

export default catchError
