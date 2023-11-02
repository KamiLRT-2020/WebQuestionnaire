// JavaScript source code
//if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
//    xmlhttp = new XMLHttpRequest();
//}
//else {// code for IE6, IE5
//    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//}
//xmlhttp.open("GET", "https://drive.google.com/file/d/1HBrJjY7P6lUaxGi3Lmq0B3zRPQP5DM5o/view?usp=drive_link", false);
//xmlhttp.send();
//xmlDoc = xmlhttp.responseXML;

const titleElement = document.getElementById("head_title");
titleElement.innerText = "xxxxxx";
const introductionElement = document.getElementById("introduction");

const sliderContainerElement = document.createElement("div");
const sliderContainerAtt = document.createAttribute("class");
sliderContainerAtt.value = "slidecontainer";
sliderContainerElement.setAttributeNode(sliderContainerAtt);

const sliderElement = document.createElement("input");
const sliderTypeAtt = document.createAttribute("type");
const sliderMinAtt = document.createAttribute("min");
const sliderMaxAtt = document.createAttribute("max");
const sliderClassAtt = document.createAttribute("class");
const sliderId = document.createAttribute("id");
const sliderValue = document.createAttribute("value");
sliderTypeAtt.value = "range";
sliderMinAtt.value = "0";
sliderMaxAtt.value = "100";
sliderClassAtt.value = "slider";
sliderId.value = "mySlider";
sliderValue.value = "0";
sliderElement.setAttributeNode(sliderTypeAtt);
sliderElement.setAttributeNode(sliderMinAtt);
sliderElement.setAttributeNode(sliderMaxAtt);
sliderElement.setAttributeNode(sliderClassAtt);
sliderElement.setAttributeNode(sliderId);
sliderElement.setAttributeNode(sliderValue);

document.body.appendChild(sliderElement);

document.getElementById("submitButton").onclick = function () {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += sliderElement.value + "\r\n";
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link);
    link.click();
}


function CreateVideoBlock()
{
    const node = document.createElement("iframe");
    const widthAtt = document.createAttribute("width");
    const heightAtt = document.createAttribute("height");
    const srcAtt = document.createAttribute("src");
    const titleAtt = document.createAttribute("title");
    const frameborderAtt = document.createAttribute("frameborder");
    const allowAtt = document.createAttribute("allow");
    const allowFullScreenAtt = document.createAttribute("allowfullscreen");
    widthAtt.value = "560";
    heightAtt.value = "315";
    srcAtt.value = "https://www.youtube.com/embed/qYGlybJA95I?si=95fL6WCsE_mYAEY8";
    titleAtt.value = "YouTube video player";
    frameborderAtt.value = "0";
    allowAtt.value = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

    node.setAttributeNode(widthAtt);
    node.setAttributeNode(heightAtt);
    node.setAttributeNode(srcAtt);
    node.setAttributeNode(titleAtt);
    node.setAttributeNode(frameborderAtt);
    node.setAttributeNode(allowAtt);
    node.setAttributeNode(allowFullScreenAtt);

    document.body.appendChild(node);

}
