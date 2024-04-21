// JavaScript source code

// id array for each VAS slider, for later getting value
//const MaleSliderIdArray = new Array("MaleHumanlikePrevious", "MaleNaturalPrevious", "MaleHumanlikeProposed", "MaleNaturalProposed"); // C
const MaleSliderIdArray = new Array("MaleHumanlikeProposed", "MaleNaturalProposed", "MaleHumanlikePrevious",  "MaleNaturalPrevious"); // P

//const FeMaleSliderIdArray = new Array("FemaleHumanlikeProposed", "FemaleHumanlikePrevious",  "FemaleNaturalProposed", "FemaleNaturalPrevious");
//const YesNoSwitchIdArray = new Array("switchFix", "switchMove");
const YesNoSwitchIdArray = new Array("switchDifferent");

//const MaleCommentIdArray = new Array("MaleCommentPrevious", "MaleCommentProposed"); // C
const MaleCommentIdArray = new Array("MaleCommentProposed", "MaleCommentPrevious"); // P

//const FemaleCommentIdArray = new Array("FemaleCommentProposed", "FemaleCommentPrevious");


// id array for consent information, to check whether they are checked later
const consentIdArray = new Array("info1", "info2", "info3", "info4", "info5");

// setting top title
const titleElement = document.getElementById("head_title");
titleElement.innerText = "Gaze Movement Evaluation";

// get submit button
const SubmitButton = document.getElementById("submitButton");

const CommentBlock = document.getElementById("commentBlock");

const PVideoURLArray = new Array(
    "https://drive.google.com/file/d/1jyq4V7RO69AhC3t8xk5SXjzhJN5nfp-6/preview",
    "https://drive.google.com/file/d/1-S5wzjbRX7jXRoIqHVgTvxDp6Nrpgr2d/preview",
    "https://drive.google.com/file/d/12WEin1cC3W8oAto15YFMvSoaHqp_xada/preview",
    "https://drive.google.com/file/d/1m3rAx1i_9RMjuXBrwJdG_XQHGRqahZai/preview",
    "https://drive.google.com/file/d/1pkqJ6AvO3y_3d7wLIbG2Zgf_XsRZ3MyV/preview",
    "https://drive.google.com/file/d/1cDwP6F0o-jVKfocVZ7AzuRht891TeNb3/preview"
);

//const CVideoURLArray = new Array(
//    "https://drive.google.com/file/d/1VtWdbuAilKRdA9Hoxu-vmwkkAkfoiJ-n/preview",
//    "https://drive.google.com/file/d/1h2kaB2WiChf8G9QhhwxDGrrn9zT6TYZL/preview",
//    "https://drive.google.com/file/d/12DjGfk2Wx3gNklGFrSYgNm7iW_9wSTNc/preview",
//    "https://drive.google.com/file/d/1nd6HKmyjE1uxmUDloghkVfv7Bb524z4C/preview",
//    "https://drive.google.com/file/d/1UJvjo060T2vsuslOvyLrpKhB2TnW1Bqy/preview",
//    "https://drive.google.com/file/d/1UceywxMEGuDgHdIQEXJIBJTrSpvz53to/preview"
//);

//const MaleCharacterVideoURL = "https://drive.google.com/file/d/11hQZgH4G16SOIxmmcU8fVCSDvH0Ix8v6/preview";
//const FemaleCharacterVideoURL = "https://drive.google.com/file/d/1HpRtRfeWWosU7ffafWlJf2PrVdaKFSma/preview";



// add elements for evaluation section
document.body.insertBefore(CreateQuestionBlock("Male Characters:", PVideoURLArray, MaleSliderIdArray, MaleCommentIdArray, YesNoSwitchIdArray[0], "A", "B"), CommentBlock); //P

//document.body.insertBefore(CreateQuestionBlock("Male Characters:", CVideoURLArray, MaleSliderIdArray, MaleCommentIdArray, YesNoSwitchIdArray[0], "A", "B"), CommentBlock); //C

//document.body.insertBefore(CreateQuestionBlock("Male Characters:", MaleCharacterVideoURL, MaleSliderIdArray, MaleCommentIdArray, YesNoSwitchIdArray[0], "A", "B"), CommentBlock);
//document.body.insertBefore(CreateQuestionBlock("Female Characters:", FemaleCharacterVideoURL, FeMaleSliderIdArray, FemaleCommentIdArray, YesNoSwitchIdArray[1], "C", "D"), CommentBlock);

// set up the behavior when click submit button
SetSubmitButton();

// function to create a VAS block
function CreateQuestionBlock(legendText, videoURLArray, sliderIdArray, commentIdArray, switchId, methodString1, methodString2) {

    // create outside container
    const container = document.createElement("fieldset");
    // set legend of container
    const legend = document.createElement("legend");
    legend.innerText = legendText;
    container.appendChild(legend);

    // add explaination before the video
    const introAll = document.createElement("li"); // use "li" to add a black dot before the text
    introAll.innerHTML = "Please watch the video at fullscreen.";
    container.appendChild(introAll);

    for (var i = 0; i < videoURLArray.length; i++) {
        const URL = videoURLArray[i];
        container.appendChild(CreateVideoBlock(URL));
    }
    //container.appendChild(CreateVideoBlock(videoURL));

    var sliderIdIndex = 0;
    var commentIdIndex = 0;

    // add explaination before the slider
    const intro3 = document.createElement("li"); // use "li" to add a black dot before the text
    intro3.innerHTML = "Can you tell these two gaze movements (" + methodString1 + " & " + methodString2 + ") are <b>different</b>?";
    container.appendChild(intro3);

    // add ask difference switch
    container.appendChild(CreateYesNoSwitch(switchId));

    // add explaination before the slider
    var intro1 = document.createElement("li"); // use "li" to add a black dot before the text
    intro1.innerHTML = "Is the gaze movement from <b>" + methodString1 + "</b> human-like?";
    container.appendChild(intro1);

    // add VAS slider
    container.appendChild(CreateSlider(sliderIdArray[sliderIdIndex], "Not human-like", "Human-like"));
    sliderIdIndex++;

    // add explaination before the slider
    intro1 = document.createElement("li"); // use "li" to add a black dot before the text
    intro1.innerHTML = "Is the gaze movement from <b>" + methodString1 + "</b> natural?";
    container.appendChild(intro1);

    // add VAS slider
    container.appendChild(CreateSlider(sliderIdArray[sliderIdIndex], "Unnatural", "Natural"));
    sliderIdIndex++;

    // add explaination before the comment block
    var intro1 = document.createElement("li"); // use "li" to add a black dot before the text
    intro1.innerHTML = "How do feel about the characteristics or the mental situation of the character " + methodString1 + " ?";
    container.appendChild(intro1);

    container.appendChild(CreateCommentBlock(commentIdArray[commentIdIndex]));
    commentIdIndex++;


    // add explaination before the slider
    intro1 = document.createElement("li"); // use "li" to add a black dot before the text
    intro1.innerHTML = "Is the gaze movement from <b>" + methodString2 + "</b> human-like?";
    container.appendChild(intro1);

    // add VAS slider
    container.appendChild(CreateSlider(sliderIdArray[sliderIdIndex], "Not human-like", "Human-like"));
    sliderIdIndex++;

    // add explaination before the slider
    intro1 = document.createElement("li"); // use "li" to add a black dot before the text
    intro1.innerHTML = "Is the gaze movement from <b>" + methodString2 + "</b> natural?";
    container.appendChild(intro1);

    // add VAS slider
    container.appendChild(CreateSlider(sliderIdArray[sliderIdIndex], "Unnatural", "Natural"));
    sliderIdIndex++;

    // add explaination before the comment block
    var intro1 = document.createElement("li"); // use "li" to add a black dot before the text
    intro1.innerHTML = "How do feel about the characteristics or the mental situation of the character " + methodString2 + " ?";
    container.appendChild(intro1);

    container.appendChild(CreateCommentBlock(commentIdArray[commentIdIndex]));
    commentIdIndex++;

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
            alert("Pleas input participant's ID.");
        }
        else {
            // set up content for csv file
            let csvContent = "data:text/csv;charset=utf-8,";

            // input the participant's name
            csvContent += document.getElementById("name").value + "\r\n";

            for (var i = 0; i < YesNoSwitchIdArray.length; i++) {
                const YesOrNotSwitch = document.getElementById(YesNoSwitchIdArray[i]);
                csvContent += YesOrNotSwitch.value + "\r\n";
            }

            // input the value of each VAS slider
            for (var i = 0; i < MaleSliderIdArray.length; i++) {
                const slider = document.getElementById(MaleSliderIdArray[i]);
                csvContent += slider.value + "\r\n";
            }

            for (var i = 0; i < MaleCommentIdArray.length; i++) {
                csvContent += document.getElementById(MaleCommentIdArray[i]).value + "\r\n";
            }

            //// input the value of each VAS slider
            //for (var i = 0; i < FeMaleSliderIdArray.length; i++) {
            //    const slider = document.getElementById(FeMaleSliderIdArray[i]);
            //    csvContent += slider.value + "\r\n";
            //}

            //for (var i = 0; i < FemaleCommentIdArray.length; i++) {
            //    csvContent += document.getElementById(FemaleCommentIdArray[i]).value + "\r\n";
            //}

            csvContent += document.getElementById("comment").value + "\r\n";

            // create a element to download the file
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "P_QuestionnaireResultOf" + document.getElementById("name").value + ".csv"); // P
            //link.setAttribute("download", "C_QuestionnaireResultOf" + document.getElementById("name").value + ".csv"); // C
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
function CreateSlider(sliderIdText, negativeLable, positiveLable)
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
    sliderContainerElement.appendChild(CreateLabel(negativeLable));
    sliderContainerElement.appendChild(inputContainerElement);
    sliderContainerElement.appendChild(CreateLabel(positiveLable));

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

function CreateYesNoSwitch(sliderIdText)
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
    const sliderId = document.createAttribute("id");
    const sliderValue = document.createAttribute("value");
    sliderTypeAtt.value = "range"; // type for slider
    sliderMinAtt.value = "0"; // min value of VAS
    sliderMaxAtt.value = "1"; // max value of VAS
    sliderId.value = sliderIdText; // set id for each VAS slider
    sliderValue.value = "0"; // set initial value (the bar of slider)
    sliderElement.setAttributeNode(sliderTypeAtt);
    sliderElement.setAttributeNode(sliderMinAtt);
    sliderElement.setAttributeNode(sliderMaxAtt);
    sliderElement.setAttributeNode(sliderId);
    sliderElement.setAttributeNode(sliderValue);

    // add label before and behind VAS slider
    sliderContainerElement.appendChild(CreateLabel("No"));
    sliderContainerElement.appendChild(sliderElement);
    sliderContainerElement.appendChild(CreateLabel("Yes"));

    return sliderContainerElement;
}

function CreateVideoBlock(videoURL) {
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

function CreateCommentBlock(commentId) {
    const node = document.createElement("textarea");
    const typeAtt = document.createAttribute("type");
    const idAtt = document.createAttribute("id");
    const sizeAtt = document.createAttribute("size");
    const rowAtt = document.createAttribute("row");
    const placeHolderAtt = document.createAttribute("placeholder");
    typeAtt.value = "text";
    idAtt.value = commentId;
    sizeAtt.vale = "100";
    rowAtt.value = "5";
    placeHolderAtt.value = "e.g. The character seems excited / calm / abnormal. The character acts strange.";

    node.setAttributeNode(typeAtt);
    node.setAttributeNode(idAtt);
    node.setAttributeNode(sizeAtt);
    node.setAttributeNode(rowAtt);
    node.setAttributeNode(placeHolderAtt);

    return node;

}
