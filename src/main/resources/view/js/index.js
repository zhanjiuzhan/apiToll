async function ajaxGet(url, successFun) {
    await axios.get(url)
        .then ((response) => {
            successFun(response);
        }).catch(function (error) {
        });
}

new Vue({
    el: '#app',
    data: {
        apis: []
    },
    created: async function() {
        this.apis = [];
        await ajaxGet("http://localhost/api/gets", (data) => {
            this.apis = data.data;
            console.log(data);
        });

        for (obj of this.apis) {
            let $div =  getEle("div");
            $div.addClass("clear");
            $("#body").append(urlDescription(obj), $div[0]);
            init(obj, "req");
            init(obj, "res");
        }
    },
    methods: {

    },
});

function urlDescription(obj) {
    let $div =  getEle("div");
    $div.attr({
        "id": "div_" + obj.id,
        "class": "description"
    });

    let $miaodian = getEle("a");
    $miaodian.attr({
        "id": obj.id
    });

    let $url = getEle("div");
    let $des1 = getEle("div");
    $des1.addClass("filed span");
    $des1.text("URL");
    let $des2 = getEle("div");
    $des2.addClass("span");
    $des2.text(obj.url);
    let $edit = getEle("button");
    $edit.attr({
        "value": "编辑",
        "id": "btn_edit_" + obj.id
    });
    $edit.text("编辑");
    $edit.click(function () {
        edit(obj.id);
    });
    let $save = getEle("button");
    $save.attr({
        "value": "保存",
        "id": "btn_save_" + obj.id
    });
    $save.text("保存");
    $save.hide();
    $save.click(function () {
        save(obj);
    });
    $url.append($des1[0], $des2[0], $edit, $save, getCDiv());
    $div.append($miaodian[0], $url[0], getform(obj));
    return $div[0];
}

function getEle(name) {
    name = '<' + name + "></" + name + '>';
    return $(name);
}

function getCDiv() {
    let $div = getEle("div");
    $div.addClass("clear");
    return $div[0];
}

function getform(obj) {
    let $form = getEle("from");

    let $des = getEle("div");
    let $des3 = getEle("div");
    $des3.addClass("filed span");
    $des3.text("描述");
    let $des4 = getEle("label");
    $des4.attr({
        "readonly": true,
        "id": "des" + obj.id
    });
    $des4.text(obj.des);
    $des4.addClass("span");
    $des.append($des3[0], $des4[0], getCDiv());

    let $request = getEle("div");
    $request.text("Request :");
    $request.css({
        "font-weight": "bold"
    });
    let $response = getEle("div");
    $response.css({
        "font-weight": "bold"
    });
    $response.text("Response :");

    $form.append($des[0], $request[0], getRequestDiv(obj, "req"), $response[0], getRequestDiv(obj, "res"));
    return $form[0];
}

function edit(id) {
    console.log("进行编辑: " + id);
    $("#btn_save_" + id).show();
    $("#btn_edit_" + id).hide();
    // 描述字段可以编辑
    $("#des" + id).attr("contenteditable", "true");
    // 可以进行添加字段描述
    $("#btn_add_req" + id).show();
    $("#btn_add_res" + id).show();
    // 字段可以编辑
    $("label[name $='_" + id + "']").each(function () {
        $(this).attr("contenteditable", "true");
    });
    $("button[name='btn_del_" + id +"']").each(function () {
        $(this).show();
    });
}

function save(obj) {
    console.log("进行保存: " + obj.id);
    $("#btn_save_" + obj.id).hide();
    $("#btn_edit_" + obj.id).show();
    // 保存描述字段的内容
    let destext = $("#des" + obj.id).text();
    $("#des" + obj.id).attr("contenteditable", "false");
    // 可以进行添加字段描述
    $("#btn_add_req" + obj.id).hide();
    $("#btn_add_res" + obj.id).hide();
    // 字段不可以编辑
    $("label[name $='_" + obj.id + "']").each(function () {
        $(this).attr("contenteditable", "false");
    });
    $("button[name='btn_del_" + obj.id +"']").each(function () {
        $(this).hide();
    });

    let json = {
        req: [],
        res: []
    };

    let $objs = $("label[name $='_" + obj.id + "']");
    for (i = 0; i < $objs.length;) {
        $obj = $($objs[i]);
        if ($obj.attr("name").indexOf("req") > 0) {
            json.req.push([$objs[i].innerHTML, $objs[i+1].innerHTML, $objs[i+2].innerHTML]);
        } else {
            json.res.push([$objs[i].innerHTML, $objs[i+1].innerHTML, $objs[i+2].innerHTML])
        }
        i+=3;
    }

    let http = "http://localhost/api/save?id=" + obj.id + "&url=" + obj.url + "&des=" + destext + "&content=" + encodeURI(JSON.stringify(json));
    ajaxGet(http, (data)=> {
        alert("保存成功")
    });
}

function getRequestDiv(obj, sig) {
    let $div = getEle("div");
    $div.attr({
        "id": sig+ "_" + obj.id
    });
    let $addData = getEle("button");
    $addData.attr({
        "id": "btn_add_" + sig + obj.id
    });
    $addData.text("添加");
    $addData.click(function () {
        addData(obj.id, sig);
    });
    $addData.hide();

    $div.append($addData);
    return $div[0];
}

function addData(id, sig, content) {
    let $delData = getEle("button");
    $delData.attr({
        "name": "btn_del_" + id
    });
    $delData.text("删除");

    let $div = getEle("div");

    let $filed = getEle("label");
    $filed.attr("name", "filed_" + sig+ "_" + id);

    let $type = getEle("label");
    $type.attr("name", "type_" + sig+ "_" + id);

    let $des = getEle("label");
    $des.attr("name", "des_" + sig+ "_" + id);

    if (content && content.length > 0) {
        $filed.text(content[0]);
        $type.text(content[1]);
        $des.text(content[2]);
        $filed.attr("contenteditable", "false");
        $type.attr("contenteditable", "false");
        $des.attr("contenteditable", "false");
        $delData.hide();
    } else {
        $type.text("进行添加...");
        $filed.text("进行添加...");
        $des.text("进行添加...");
        $filed.attr("contenteditable", "true");
        $type.attr("contenteditable", "true");
        $des.attr("contenteditable", "true");
    }

    $delData.click(function () {
        $div.remove();
    });

    $div.append($filed, $type, $des,  $delData);

    $("#" + sig+ "_" + id).prepend($div);
}


function init(obj, sig) {
    if (obj.content) {
        let jsonObj = JSON.parse(obj.content);
        if (sig == "req") {
            for (i = 0; i< jsonObj.req.length; i++) {
                addData(obj.id, sig, jsonObj.req[i]);
            }
        } else {
            for (i = 0; i< jsonObj.res.length; i++) {
                addData(obj.id, sig, jsonObj.res[i]);
            }
        }
    }
}