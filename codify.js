const disallowed_ext = [".dll", ".exe", ".html", ".htm", ".png", ".jpg", ".jpeg", ".pdf"]

var new_div = document.createElement("div")
new_div.setAttribute("id", "mycode")
document.body.appendChild(new_div)

function syntax_highlight() {
    let new_script = document.createElement("script")
    new_script.innerHTML = "hljs.highlightAll();";

    document.head.appendChild(new_script);
}

function show_code(theUrl) {

    let file_ext = theUrl.split(".").at(-1);

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState === 4)
        {
          new_div.innerHTML = "<pre><code class='language-"+file_ext+"'>" + xmlhttp.responseText.replaceAll("<", "&lt;").replaceAll(">", "&gt;") + "</code></pre>";
          syntax_highlight();
        }
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();   
}

// Syntax highlighting!

function add_parent_code() {
  let pres = document.getElementsByTagName("pre")

  for (var pre of pres) {
    let innerHTML = pre.innerHTML;
    let modifiedHTML = "<code class='language-cs'>" + innerHTML + "</code>";

    pre.innerHTML = modifiedHTML;
  }
}

function add_script() {
  let link = document.createElement("link")
  link.setAttribute("rel", "stylesheet")
  link.setAttribute("href", "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css")

  let script = document.createElement("script")
  script.setAttribute("src", "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js")

  document.head.appendChild(link)
  document.head.appendChild(script)
  script.onload = () => {
    syntax_highlight();
  }
}

function setup_syntax() {
  add_parent_code()
  add_script()
}

function init() {
  let a_elements = document.getElementsByTagName("a")
  for (var a of a_elements) {
    if (! a.innerHTML.includes("/") && (a.innerHTML.includes(".") || a.innerHTML.includes("Makefile"))) {
      if (! disallowed_ext.some((e) => {return a.innerHTML.includes(e)})) {
        let href_site = a.href;
        a.href = "#"
        a.setAttribute("onclick", "")
        a.onclick = () => show_code(href_site)
      }
    }
  }
  setup_syntax()
}

init()
