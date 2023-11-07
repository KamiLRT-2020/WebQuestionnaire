// JavaScript source code
const ReferenceVideoURL = "https://www.youtube.com/embed/sux3DhTSoaQ?si=EYcsHTMGBZGml8VT";
const PreviousNoDelayVideoURL = "https://www.youtube.com/embed/60nw7AAnWDE?si=_XJ8ZVplIkljynLO";
const PreviousWithDelayVideoURL = "https://www.youtube.com/embed/c62E2B_CPAs?si=wf9YSqiqNxUPOTXR";
const ProposedNoDelayVideoURL = "https://www.youtube.com/embed/0bbvHAcjCjs?si=b0vGV8CRm1QD1SZ0";
const ProposedWithDelayVideoURL = "https://www.youtube.com/embed/U2lSyd48fdw?si=sJcWbPMJcPHZKLYu";

const sliderIdArray = new Array("previousNoDelay", "proposedNoDelay", "previousWithDelay", "proposedWithDelay");
const consentIdArray = new Array("info1", "info2", "info3", "info4", "info5");

const titleElement = document.getElementById("head_title");
titleElement.innerText = "Gaze Movement Evaluation";
const introductionElement = document.getElementById("introduction");

const SubmitButton = document.getElementById("submitButton");

document.body.insertBefore(CreateReferenceVideoBlock(), document.getElementById("GeneratedTitle"));
document.body.insertBefore(CreateQuestionBlock("1.Previous Method Without Delay:", PreviousNoDelayVideoURL, sliderIdArray[0]), SubmitButton);
document.body.insertBefore(CreateQuestionBlock("2.Proposed Method Without Delay:", ProposedNoDelayVideoURL, sliderIdArray[1]), SubmitButton);
document.body.insertBefore(CreateQuestionBlock("3.Previous Method With Delay:", PreviousWithDelayVideoURL, sliderIdArray[2]), SubmitButton);
document.body.insertBefore(CreateQuestionBlock("4.Proposed Method With Delay:", ProposedWithDelayVideoURL, sliderIdArray[3]), SubmitButton);

SetSubmitButton();

function CreateQuestionBlock(legendText, videoURL, sliderIdText) {
    const container = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.innerText = legendText;
    container.appendChild(legend);

    const intro = document.createElement("li");
    intro.innerHTML = "Please evaluate the <b>naturalness</b> of the gaze movement shown in the video.";
    container.appendChild(intro);

    container.appendChild(CreateVideoBlock(videoURL));

    container.appendChild(CreateSlider(sliderIdText));

    return container;
}

function CreateReferenceVideoBlock() {
    const container = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.innerText = "Reference Video:";
    container.appendChild(legend);

    const intro = document.createElement("li");
    intro.innerHTML = "The gaze movement in the video is represented from <b>eye-tracking data</b> after filtering. Please take this as a <b>reference</b> and evaluate other generated gaze movement below.";
    container.appendChild(intro);

    container.appendChild(CreateVideoBlock(ReferenceVideoURL));

    return container;
}

function SetSubmitButton() {
    document.getElementById("submitButton").onclick = function () {
        if (!IsConsentAllChecked()) {
            alert("Pleas Check all the checkbox in Consent.")
        }
        else if (document.getElementById("name").value == "")
        {
            alert("Pleas input your name or nickname.");
        }
        else {
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += document.getElementById("name").value + "\r\n";

            for (var i = 0; i < sliderIdArray.length; i++) {
                const slider = document.getElementById(sliderIdArray[i]);
                csvContent += slider.value + "\r\n";
            }
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "QuestionnaireResultOf" + document.getElementById("name").value + ".csv");
            document.body.appendChild(link);
            link.click();
            alert("Please send the downloaded file to the owner of the questionnaire.");
        }

    }

}

function IsConsentAllChecked() {
    for (var i = 0; i < consentIdArray.length; i++) {
        if (!document.getElementById(consentIdArray[i]).checked) {
            return false;
        }
    }
    return true;
}

function CreateSlider(sliderIdText)
{
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
    const sliderDataListAtt = document.createAttribute("list");
    sliderTypeAtt.value = "range";
    sliderMinAtt.value = "0";
    sliderMaxAtt.value = "100";
    sliderClassAtt.value = "slider";
    sliderId.value = sliderIdText;
    sliderValue.value = "0";
    sliderDataListAtt.value = "sliderDataList";
    sliderElement.setAttributeNode(sliderTypeAtt);
    sliderElement.setAttributeNode(sliderMinAtt);
    sliderElement.setAttributeNode(sliderMaxAtt);
    sliderElement.setAttributeNode(sliderClassAtt);
    sliderElement.setAttributeNode(sliderId);
    sliderElement.setAttributeNode(sliderValue);
    sliderElement.setAttributeNode(sliderDataListAtt);

    const inputContainerElement = document.createElement("div");
    const inputContainerAtt = document.createAttribute("class");
    inputContainerAtt.value = "inputContainer";
    inputContainerElement.setAttributeNode(inputContainerAtt);

    inputContainerElement.appendChild(CreateDivideLine());
    inputContainerElement.appendChild(sliderElement);

    sliderContainerElement.appendChild(CreateLabel("Unnatural"));
    sliderContainerElement.appendChild(inputContainerElement);
    sliderContainerElement.appendChild(CreateLabel("Natural"));

    return sliderContainerElement;
}

function CreateLabel(text) {
    const Legend = document.createElement("label");
    const LegendClassAtt = document.createAttribute("class");
    LegendClassAtt.value = "sliderLegend";
    Legend.setAttributeNode(LegendClassAtt);
    Legend.innerText = text;
    return Legend;
}

function CreateDivideLine()
{
    const line = document.createElement("div");
    const classAtt = document.createAttribute("class");
    classAtt.value = "divideLine";
    line.setAttributeNode(classAtt);
    return line;
}

function CreateVideoBlock(videoURL)
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
    srcAtt.value = videoURL;
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

    return node;

}
