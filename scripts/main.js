function checkForUnveil(){for(var e=window.scrollY,t=e+window.innerHeight,n=document.querySelectorAll("main img"),a=0;a<n.length;a++){var r=n[a],o=r.getBoundingClientRect().top,i=o+r.offsetHeight;if(i>=e-200&&t+200>=o){var s=document.createEvent("HTMLEvents");s.initEvent("unveil",!0,!1),r.dispatchEvent(s)}}}function onImageLoad(e){var t=e.currentTarget,n=new Image;n.src=t.getAttribute("data-src-second");var a=t.parentNode.querySelector(".loader");t.parentNode.querySelector(".mask").removeChild(a),t.removeEventListener("load",onImageLoad)}function unveil(e){var t=e.target||e.toElement;t.setAttribute("src",t.getAttribute("data-src")),t.addEventListener("load",onImageLoad),t.removeEventListener("unveil",unveil)}function valse(e){var t=e.target||e.toElement,n=t.parentNode.querySelector("img"),a="mousedown"===e.type||"touchstart"===e.type,r=n.getAttribute(a?"data-src-second":"data-src");"ontouchstart"in window&&"touchstart"===e.type?valseTimer=setTimeout(function(){n.setAttribute("src",r)},100):n.setAttribute("src",r)}function cancelValse(){window.clearTimeout(valseTimer)}var mainElement=document.querySelector("main"),portraits=[{id:1,source:"Robin-back.jpg",secondSource:"Robin-front.jpg"},{id:2,source:"Ingrid-back.jpg",secondSource:"Ingrid-front.jpg"}],ajax=new XMLHttpRequest;if(ajax.onreadystatechange=function(){if(4===ajax.readyState&&(200===ajax.status||0===ajax.status)){var e=document.querySelector(".portrait.is-template"),t=ajax.responseXML.documentElement;e.querySelector(".mask").appendChild(t.cloneNode(!0));for(var n=0;n<portraits.length;n++){var a=portraits[n],r=e.cloneNode(!0);r.className="portrait";var o=r.querySelector(".mask"),i=document.createElement("div");o.appendChild(i);var s=r.querySelector("img");s.setAttribute("data-src","images/"+a.source),s.setAttribute("data-src-second","images/"+a.secondSource),s.addEventListener("unveil",unveil),mainElement.appendChild(r)}checkForUnveil()}},ajax.open("GET","images/loader.svg",!0),ajax.send(),"ontouchstart"in window){mainElement.addEventListener("touchstart",valse),mainElement.addEventListener("touchleave",valse),mainElement.addEventListener("touchend",valse);var valseTimer;mainElement.addEventListener("touchmove",cancelValse)}else mainElement.addEventListener("mousedown",valse),mainElement.addEventListener("mouseleave",valse),mainElement.addEventListener("mouseup",valse);window.onscroll=checkForUnveil,window.onresize=checkForUnveil;
//# sourceMappingURL=maps/main.js.map