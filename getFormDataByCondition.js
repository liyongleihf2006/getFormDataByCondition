/**
 * Created by LiYonglei on 2017/5/26.
 * 根据条件获取表单数据
 * params:
 *      form 表单元素
 *      conditionFn(ele) 条件函数,当该函数返回false的时候,该表单元素会被忽略
 *           ele 每一个表单元素
 * return 表单数据,json格式,复选框使用逗号隔开
 *
 */
function getFormDataByCondition(form,conditionFn){
    var result={};
    [].forEach.call(form.querySelectorAll("[name]"),function(field){
        if(!result[field.name]&&conditionFn(field)){
            result[field.name]=[];
        }
        switch (field.type){
            case "checkbox":;
            case "radio":{
                if(field.checked&&conditionFn(field)){
                    result[field.name].push(field.value);
                }
            };break;
            default :{
                if(conditionFn(field)){
                    result[field.name].push(field.value);
                }
            }
        }
    });
    Object.keys(result).forEach(function (key) {
        result[key]=result[key].join(",");
    });
    return result;
}