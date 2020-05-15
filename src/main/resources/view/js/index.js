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
        })

        for (tmp of this.apis) {
            $("#body").append(moban(tmp));
        }


    },
    methods: {

    },
});

function moban(obj) {
    let div =  document.createElement("div");
    div.setAttribute("name", obj.id);
    let a = document.createElement("a");
    a.setAttribute("id", obj.id);
    $(div).append(a);
    $(div).addClass("moban");
    $(div).append(moban1(obj));
    return div;
}

function moban1(obj) {
    let div =  document.createElement("div");
    let $div_url =  $(document.createElement("div"));
    let $div_des =  $(document.createElement("div"));
    let $div_req =  $(document.createElement("div"));
    let $div_res =  $(document.createElement("div"));
    $div_url.text(obj.url)
    $div_des.text(obj.des);
    $div_req.append(moban2(obj, "req"));
    $div_res.append(moban2(obj, "res"))
    $(div).append($div_url);
    $(div).append($div_des);
    $(div).append($div_req);
    $(div).append($div_res);
    return div;
}


function moban2(obj, sig) {
    let div =  document.createElement("div");
    let tmp =  document.createElement("div");
    let title =  document.createElement("div");
    div.setAttribute("id", sig + obj.id);
    $(div).css({
        "margin-bottom": "10px"
    });

    let filed =  document.createElement("span");
    let type =  document.createElement("span");
    let des =  document.createElement("span");
    $(filed).text("字段");
    $(type).text("类型");
    $(des).text("描述");



    let button = document.createElement("button");
    $(button).text("添加");
    button.setAttribute("name", sig + obj.id)
    button.onclick = add;

    if (sig == "req") {
        $(title).text("Request");
    } else {
        $(title).text("Response");
    }

    $(tmp).append(filed, type, des, button);
    $(div).append(title, tmp);
    return div;
}

function add(event) {
    console.log("add");
    let tmp =  document.createElement("div");
    let id = event.target.getAttribute("name");
    let $filed =  $(document.createElement("input"));
    let $type =  $(document.createElement("input"));
    let $des =  $(document.createElement("input"));
    let $edit =  $(document.createElement("button"));
    let $del =  $(document.createElement("button"));
    $filed.attr({
        "type": "text",
        "name": id + "filed"
    });
    $type.attr({
        "type": "text",
        "name": id + "type"
    });
    $des.attr({
        "type": "text",
        "name": id + "des"
    });

    $edit.text("编辑");
    $del.text("删除");
    $(tmp).append($filed[0],$type[0],$des[0], $edit, $del );
    $("#" + id).append(tmp);
}