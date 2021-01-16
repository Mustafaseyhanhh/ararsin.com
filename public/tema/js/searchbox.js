/* $(function () {
    $(".nice-select").on('input',function () {
        console.log('değişti');
        console.log($(".chosen-select"))
    });
});  */

$(function () {
    if(document.getElementById("locHome")){
        $('.nice-select-search')[1].setAttribute("oninput","HomeAjax(this.value)")
    }
    if(document.getElementById("locHeader")){
        $('.nice-select-search')[0].setAttribute("oninput","HeaderAjax(this.value)")
    }
})

function HomeAjax (value) {    
    $.ajax({
        url: "/searchbox",
        type: "GET",
        data: {
            term: value
        },
        success: function (data) {
            var x = document.getElementById("locHome");
            var ul = x.getElementsByClassName("list")[0];
            select = document.getElementById('Homekutu2')
            
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            while (select.firstChild) {
                select.removeChild(select.firstChild);
            }
            for (var k in data) {
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(data[k].searc));
                li.setAttribute("data-value", data[k].searc);
                li.setAttribute("class", "option");
                ul.appendChild(li);

                var opt = document.createElement('option');
                opt.value = data[k].searc;
                opt.innerHTML = data[k].searc;
                select.appendChild(opt);

            }
        }
    })
}

function HeaderAjax (value) {  
    $.ajax({
        url: "/searchbox",
        type: "GET",
        data: {
            term: value
        },
        success: function (data) {
            var x = document.getElementById("locHeader");
            var ul = x.getElementsByClassName("list")[0];
            select = document.getElementById('Headerkutu2')
            
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            while (select.firstChild) {
                select.removeChild(select.firstChild);
            }
            for (var k in data) {
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(data[k].searc));
                li.setAttribute("data-value", data[k].searc);
                li.setAttribute("class", "option");
                ul.appendChild(li);

                var opt = document.createElement('option');
                opt.value = data[k].searc;
                opt.innerHTML = data[k].searc;
                select.appendChild(opt);
            }
        }
    })
}