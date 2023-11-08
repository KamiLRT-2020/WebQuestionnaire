// JavaScript source code

// URL of the videos 
//const ReferenceVideoURL = "https://www.youtube.com/embed/sux3DhTSoaQ?si=EYcsHTMGBZGml8VT";
//const PreviousNoDelayVideoURL = "https://www.youtube.com/embed/60nw7AAnWDE?si=_XJ8ZVplIkljynLO";
//const PreviousWithDelayVideoURL = "https://www.youtube.com/embed/c62E2B_CPAs?si=wf9YSqiqNxUPOTXR";
//const ProposedNoDelayVideoURL = "https://www.youtube.com/embed/0bbvHAcjCjs?si=b0vGV8CRm1QD1SZ0";
//const ProposedWithDelayVideoURL = "https://www.youtube.com/embed/U2lSyd48fdw?si=sJcWbPMJcPHZKLYu";


//slow 
const ReferenceVideoURL = "https://www.youtube.com/embed/sux3DhTSoaQ?si=EYcsHTMGBZGml8VT";
const PreviousNoDelayVideoURL = "https://www.youtube.com/embed/ISBFX9NkEzs?si=BDfCvltX61CIZPLp";
const PreviousWithDelayVideoURL = "https://www.youtube.com/embed/IpCQbY5G3lQ?si=46I74I4W4Z1yuL4N";
const ProposedNoDelayVideoURL = "https://www.youtube.com/embed/Apk9AQqRIic?si=ahUDc8nPc2VpmNRk";
const ProposedWithDelayVideoURL = "https://www.youtube.com/embed/f_0wSiiJDrE?si=Mg0-UzeaZoHbsZCA";

// id array for each VAS slider, for later getting value
const sliderIdArray = new Array("previousNoDelay", "proposedNoDelay", "previousWithDelay", "proposedWithDelay");

// id array for consent information, to check whether they are checked later
const consentIdArray = new Array("info1", "info2", "info3", "info4", "info5");

// setting top title
const titleElement = document.getElementById("head_title");
titleElement.innerText = "Gaze Movement Evaluation";

// get submit button
const SubmitButton = document.getElementById("submitButton");

// add element for reference section
document.body.insertBefore(CreateReferenceVideoBlock(), document.getElementById("GeneratedTitle"));

// add elements for evaluation section
document.body.insertBefore(CreateQuestionBlock("1.Isotropy 1:", PreviousNoDelayVideoURL, sliderIdArray[0]), SubmitButton);
document.body.insertBefore(CreateQuestionBlock("2.Anisotropy 1:", ProposedNoDelayVideoURL, sliderIdArray[1]), SubmitButton);
document.body.insertBefore(CreateQuestionBlock("3.Isotropy 2:", PreviousWithDelayVideoURL, sliderIdArray[2]), SubmitButton);
document.body.insertBefore(CreateQuestionBlock("4.Anisotropy 2:", ProposedWithDelayVideoURL, sliderIdArray[3]), SubmitButton);

//for (var i = 1; i <= 10; i++) {
//    document.body.insertBefore(CreateQuestionBlock((2 * i - 1) + ".Isotropy " + i + ":", "Isotropy/IsotropyCut" + i, "slider" + (2*i-1)), SubmitButton);
//    document.body.insertBefore(CreateQuestionBlock((2 * i) + ".Anisotropy " + i + ":", "Anisotropy/AnisotropyCut" + i, "slider" + (2*i)), SubmitButton);
//}

// set up the behavior when click submit button
SetSubmitButton();

// function to create a VAS block
function CreateQuestionBlock(legendText, videoURL, sliderIdText) {

    // create outside container
    const container = document.createElement("fieldset");
    // set legend of container
    const legend = document.createElement("legend");
    legend.innerText = legendText;
    container.appendChild(legend);

    // add explaination before the video
    const intro = document.createElement("li"); // use "li" to add a black dot before the text
    intro.innerHTML = "Please evaluate the <b>naturalness</b> of the gaze movement shown in the video.";
    container.appendChild(intro);

    // add video
    container.appendChild(CreateVideoBlock(videoURL));

    // add VAS slider
    container.appendChild(CreateSlider(sliderIdText));

    return container;
}

// function to create the reference video element
function CreateReferenceVideoBlock() {
    // create outside containter
    const container = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.innerText = "Reference Video:"; // set legend
    container.appendChild(legend);

    // add explaination before the video
    const intro = document.createElement("li"); // use "li" to add a black dot before the text
    intro.innerHTML = "The gaze movement in the video is represented from <b>eye-tracking data</b> after filtering. Please take this as a <b>reference</b> and evaluate other generated gaze movement below.";
    container.appendChild(intro);

    container.appendChild(CreateVideoBlock(ReferenceVideoURL));

    return container;
}

function SetSubmitButton() {
    document.getElementById("submitButton").onclick = function () {
        if (!IsConsentAllChecked()) {
            // alert to check all the consent information, if not all the checkbox are checked
            alert("Pleas Check all the checkbox in Consent.")
        }
        else if (document.getElementById("name").value == "")
        {
            // alert to input the name, if have not
            alert("Pleas input your name or nickname.");
        }
        else {
            // set up content for csv file
            let csvContent = "data:text/csv;charset=utf-8,";

            // input the participant's name
            csvContent += document.getElementById("name").value + "\r\n";

            // input the value of each VAS slider
            for (var i = 0; i < sliderIdArray.length; i++) {
                const slider = document.getElementById(sliderIdArray[i]);
                csvContent += slider.value + "\r\n";
            }

            //for (var i = 1; i <= 20; i++) {
            //    const slider = document.getElementById("slider"+ i);
            //    csvContent += slider.value + "\r\n";
            //}

            // create a element to download the file
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "QuestionnaireResultOf" + document.getElementById("name").value + ".csv");
            document.body.appendChild(link);
            link.click(); // and click automatically
            alert("Please send the downloaded file to the owner of the questionnaire."); // information to send back the result
        }

    }

}

// check whether all the checkbox in consent section are checked
function IsConsentAllChecked() {
    for (var i = 0; i < consentIdArray.length; i++) {
        if (!document.getElementById(consentIdArray[i]).checked) {
            return false;
        }
    }
    return true;
}

// function to create VAS slider
function CreateSlider(sliderIdText)
{
    // create outsider container, for slider and label
    const sliderContainerElement = document.createElement("div");
    const sliderContainerAtt = document.createAttribute("class");
    sliderContainerAtt.value = "slidecontainer";
    sliderContainerElement.setAttributeNode(sliderContainerAtt);

    // create VAS slider element
    const sliderElement = document.createElement("input");
    const sliderTypeAtt = document.createAttribute("type");
    const sliderMinAtt = document.createAttribute("min");
    const sliderMaxAtt = document.createAttribute("max");
    const sliderClassAtt = document.createAttribute("class");
    const sliderId = document.createAttribute("id");
    const sliderValue = document.createAttribute("value");
    sliderTypeAtt.value = "range"; // type for slider
    sliderMinAtt.value = "0"; // min value of VAS
    sliderMaxAtt.value = "100"; // max value of VAS
    sliderClassAtt.value = "slider";
    sliderId.value = sliderIdText; // set id for each VAS slider
    sliderValue.value = "0"; // set initial value (the bar of slider)
    sliderElement.setAttributeNode(sliderTypeAtt);
    sliderElement.setAttributeNode(sliderMinAtt);
    sliderElement.setAttributeNode(sliderMaxAtt);
    sliderElement.setAttributeNode(sliderClassAtt);
    sliderElement.setAttributeNode(sliderId);
    sliderElement.setAttributeNode(sliderValue);

    // container for VAS slider
    const inputContainerElement = document.createElement("div");
    const inputContainerAtt = document.createAttribute("class");
    inputContainerAtt.value = "inputContainer";
    inputContainerElement.setAttributeNode(inputContainerAtt);

    // add horizontal divide line for VAS slider 
    inputContainerElement.appendChild(CreateDivideLine());
    inputContainerElement.appendChild(sliderElement);

    // add label before and behind VAS slider
    sliderContainerElement.appendChild(CreateLabel("Unnatural"));
    sliderContainerElement.appendChild(inputContainerElement);
    sliderContainerElement.appendChild(CreateLabel("Natural"));

    return sliderContainerElement;
}

// create label for slider
function CreateLabel(text) {
    const Legend = document.createElement("label");
    const LegendClassAtt = document.createAttribute("class");
    LegendClassAtt.value = "sliderLegend";
    Legend.setAttributeNode(LegendClassAtt);
    Legend.innerText = text;
    return Legend;
}

// create the divide line for slider
function CreateDivideLine()
{
    const line = document.createElement("div");
    const classAtt = document.createAttribute("class");
    classAtt.value = "divideLine";
    line.setAttributeNode(classAtt);
    return line;
}

// create video element
function CreateVideoBlock(videoURL)
{
    // setting is from the share link of Youtube
    const node = document.createElement("iframe");
    const widthAtt = document.createAttribute("width");
    const heightAtt = document.createAttribute("height");
    const srcAtt = document.createAttribute("src");
    const titleAtt = document.createAttribute("title");
    const frameborderAtt = document.createAttribute("frameborder");
    const allowAtt = document.createAttribute("allow");
    const allowFullScreenAtt = document.createAttribute("allowfullscreen");
    widthAtt.value = "1120"; // "560";
    heightAtt.value = "630";//"315";
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
