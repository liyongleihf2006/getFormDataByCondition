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
    var result={},
        elements=form.elements,
        eles=[];
    for(var i in elements){
        if(isNaN(i)&&elements.hasOwnProperty(i)){
            eles.push(elements[i]);
        }
    }
    eles.forEach(function (ele) {
        /*RadioNodeList是非ie浏览器拥有的类,采用非ie浏览器的方式获取单选框复选框的值*/
        if(window.RadioNodeList&&ele instanceof window.RadioNodeList){
            for(var j in ele){
                if(ele.hasOwnProperty(j)){
                    if(!result[ele[j].name]&&conditionFn(ele[j])){
                        result[ele[j].name]=[];
                    }
                    if(ele[j].checked&&conditionFn(ele[j])){
                        result[ele[j].name].push(ele[j].value);
                    }
                }
            }
         /*HTMLCollection是ie浏览器的类,采用ie浏览器的方式获取*/
        }else if(window.HTMLCollection&&ele instanceof window.HTMLCollection){
            for(var k=0;k<ele.length;k++){
                if(!result[ele[k].name]&&conditionFn(ele[k])){
                    result[ele[k].name]=[];
                }
                if(ele[k].checked&&conditionFn(ele[k])){
                    result[ele[k].name].push(ele[k].value);
                }
            }
        }else{
            if(ele.name&&conditionFn(ele)){
                result[ele.name]=[ele.value];
            }
        }
    });
    Object.keys(result).forEach(function (key) {
        result[key]=result[key].join(",");
    });
    return result;
}