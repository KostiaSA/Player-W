function getUrlVars() {
    var vars = {}, hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        if (hash[1])
            vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function () {
    //console.log($(".sorted"));
    $(".sorted").click(function (value) {
        var colName = $(value.target).attr("data-sort");
        if (!colName){
            colName = $(value.currentTarget).attr("data-sort");
        }

        var host = window.location.origin + window.location.pathname;
        var params = getUrlVars();

        if (params["sort"] === colName) {
            params["sort"] = "_" + colName;
        }
        else if (params["sort"] === "_" + colName) {
            params["sort"] = colName;
        }
        else {
            params["sort"] = colName;
        }

        var keys = Object.keys(params).map(function (key) {
            return key + "=" + params[key];
        }).join("&");

        window.location.href = host + "?" + keys;

        $("*").css("color", "silver");

    });
});