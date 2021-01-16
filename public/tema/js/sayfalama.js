$(function () {
    if(document.getElementById("sayfalama")){
        var a = window.location.pathname;
        var ss = window.location.search;        
        if (decodeURIComponent(ss).toString().indexOf("?") == -1 || decodeURIComponent(ss).split('=').length==2){
            //yok
            var s = decodeURIComponent(ss).split('?p=');
            if(document.getElementById("onceki")){
                var once = a+s[0]+'?p='+document.getElementById("onceki").innerHTML
                document.getElementById("link-onceki").setAttribute("href",once);
            }
            if(document.getElementById("sonraki")){
                var sonra = a+s[0]+'?p='+document.getElementById("sonraki").innerHTML
                document.getElementById("link-sonraki").setAttribute("href",sonra);
            }
        }else{

            var s = decodeURIComponent(ss).split('&p=');
            if(document.getElementById("onceki")){
                var once = a+s[0]+'&p='+document.getElementById("onceki").innerHTML
                document.getElementById("link-onceki").setAttribute("href",once);
            }
            if(document.getElementById("sonraki")){
                var sonra = a+s[0]+'&p='+document.getElementById("sonraki").innerHTML
                document.getElementById("link-sonraki").setAttribute("href",sonra);
            }
        }
    }
})