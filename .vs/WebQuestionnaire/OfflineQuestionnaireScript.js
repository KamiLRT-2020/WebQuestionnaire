// JavaScript source code

// id array for each VAS slider, for later getting value
const sliderIdArray = new Array("previousFix", "proposedFix", "previousMove", "proposedMove");
const YesNoSwitchIdArray = new Array("switchFix", "switchMove");

// id array for consent information, to check whether they are checked later
const consentIdArray = new Array("info1", "info2", "info3", "info4", "info5");

// setting top title
const titleElement = document.getElementById("head_title");
titleElement.innerText = "Gaze Movement Evaluation";

// get submit button
const SubmitButton = document.getElementById("submitButton");

const CommentBlock = document.getElementById("commentBlock");

// add elements for evaluation section
document.body.insertBefore(CreateQuestionBlock("Male Characters:", sliderIdArray[0], sliderIdArray[1], YesNoSwitchIdArray[0]), CommentBlock);
document.body.insertBefore(CreateQuestionBlock("Female Characters:", sliderIdArray[2], sliderIdArray[3], YesNoSwitchIdArray[1]), CommentBlock);

// set up the behavior when click submit button
SetSubmitButton();

// function to create a VAS block
function CreateQuestionBlock(legendText, sliderId1, sliderId2, switchId) {

    // create outside container
    const container = document.createElement("fieldset");
    // set legend of container
    const legend = document.createElement("legend");
    legend.innerText = legendText;
    container.appendChild(legend);

    // add explaination before the slider
    const intro1 = document.createElement("li"); // use "li" to add a black dot before the text
    intro1.innerHTML = "Please evaluate whether the gaze movement from <b>A</b> is <b>human-like</b> or not:";
    container.appendChild(intro1);

    // add VAS slider
    container.appendChild(CreateSlider(sliderId1));

    // add explaination before the slider
    const intro2 = document.createElement("li"); // use "li" to add a black dot before the text
    intro2.innerHTML = "Please evaluate whether the gaze movement from <b>B</b> is <b>human-like</b> or not:";
    container.appendChild(intro2);

    // add VAS slider
    container.appendChild(CreateSlider(sliderId2));

    // add explaination before the slider
    const intro3 = document.createElement("li"); // use "li" to add a black dot before the text
    intro3.innerHTML = "Can you tell these two gaze movements (A & B) are <b>different</b>?";
    container.appendChild(intro3);

    // add ask difference switch
    container.appendChild(CreateYesNoSwitch(switchId));

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

            // input the value of each VAS slider
            for (var i = 0; i < sliderIdArray.length; i++) {
                const slider = document.getElementById(sliderIdArray[i]);
                csvContent += slider.value + "\r\n";
            }

            for (var i = 0; i < YesNoSwitchIdArray.length; i++) {
                const YesOrNotSwitch = document.getElementById(YesNoSwitchIdArray[i]);
                csvContent += YesOrNotSwitch.value + "\r\n";
            }

            csvContent += document.getElementById("comment").value + "\r\n";

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
    sliderContainerElement.appendChild(CreateLabel("Not human-like"));
    sliderContainerElement.appendChild(inputContainerElement);
    sliderContainerElement.appendChild(CreateLabel("Human-like"));

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
