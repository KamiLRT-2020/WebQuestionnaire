// JavaScript source code

// id array for each VAS slider, for later getting value
//const HumanLikenessSliderIdArray = new Array("HumanlikeProposed", "HumanlikeDirectly", "HumanlikePreviousSmall", "HumanlikePreviousLarge");
const NaturalnessSliderIdArray = new Array("NaturalnessProposed", "NaturalnessDirectly", "NaturalnessPrevious");
const RoboticSliderIdArray = new Array("RoboticProposed", "RoboticDirectly", "RoboticPrevious");

const GeneralCommentIdArray = new Array("GeneralProposed", "GeneralDirectly", "GeneralPreviousLarge");


const AnonmyMethodNameStringArray = new Array("A", "B", "C");

// id array for consent information, to check whether they are checked later
const consentIdArray = new Array("info1", "info2", "info3", "info4", "info5");

// setting top title
const titleElement = document.getElementById("head_title");
titleElement.innerText = "Gaze Movement Evaluation";

// get submit button
const SubmitButton = document.getElementById("submitButton");

const CommentBlock = document.getElementById("commentBlock");

const SceneIntroduction = document.getElementById("scene");

// Videos P D I are used
const VideoURLArray = new Array(
    // google drive
    "https://drive.google.com/file/d/1iYB6_SjyXyHNDLSdtW6ePcVu_6YVp5ZN/preview", // P
    "https://drive.google.com/file/d/1OYqlNO-MPHFJzU64_Mj8bnqU4Wue4Le0/preview", // D
    "https://drive.google.com/file/d/1oszr_mLvP1j2Tczy7x0ssquGDuNAjAmD/preview", // I

    
);

const SceneIntrodcutionVideo = "https://drive.google.com/file/d/15gWfLbjfFuwL1GCFw-ts9jIMHfPmrRcx/preview";


//// add elements for evaluation section
//document.body.insertBefore(CreateQuestionBlock("Male Characters:", VideoURLArray, SliderIdArray, MentalCommentIdArray, YesNoSwitchIdArray[0], "A", "B"), CommentBlock); //P

//document.body.insertBefore(CreateQuestionBlock("Male Characters:", CVideoURLArray, MaleSliderIdArray, MaleCommentIdArray, YesNoSwitchIdArray[0], "A", "B"), CommentBlock); //C

//document.body.insertBefore(CreateQuestionBlock("Male Characters:", MaleCharacterVideoURL, MaleSliderIdArray, MaleCommentIdArray, YesNoSwitchIdArray[0], "A", "B"), CommentBlock);
//document.body.insertBefore(CreateQuestionBlock("Female Characters:", FemaleCharacterVideoURL, FeMaleSliderIdArray, FemaleCommentIdArray, YesNoSwitchIdArray[1], "C", "D"), CommentBlock);

SceneIntroduction.appendChild(CreateVideoBlock(SceneIntrodcutionVideo));

// set up the behavior when click finish button after inputing Id
ServerGetResult();

// set up the behavior when click submit button

// function to create a VAS block
function CreateQuestionBlock(legendText, videoURLArray, NaturalnessSliderIdArray, RoboticSliderIdArray, GeneralCommentIdArray, methodString) {

    // create outside container
    const container = document.createElement("fieldset");
    const QuestionContainerAtt = document.createAttribute("id");
    QuestionContainerAtt.value = "questionBlock";
    container.setAttributeNode(QuestionContainerAtt);
    // set legend of container
    const legend = document.createElement("legend");
    legend.innerText = legendText;
    container.appendChild(legend);

    // add explaination before the video
    const introAll = document.createElement("li"); // use "li" to add a black dot before the text
    introAll.innerHTML = "Please watch the video at <mark><b>fullscreen</b></mark>. Please watch each video <mark><b>at least twice</b></mark> to compare the difference.";
    container.appendChild(introAll);

    for (var i = 0; i < videoURLArray.length; i++) {
        const URL = videoURLArray[i];
        const intro = document.createElement("h2"); // use "li" to add a black dot before the text
        intro.innerHTML = "<b>" + methodString[i] + ":</b>";
        container.appendChild(intro);
        container.appendChild(CreateVideoBlock(URL));
    }
    //container.appendChild(CreateVideoBlock(videoURL));


    //// add explaination before the slider
    //const intro3 = document.createElement("li"); // use "li" to add a black dot before the text
    //intro3.innerHTML = "Can you tell these two gaze movements (" + methodString1 + " & " + methodString2 + ") are <b>different</b>?";
    //container.appendChild(intro3);

    //// add ask difference switch
    //container.appendChild(CreateYesNoSwitch(switchId));

    for (var i = 0; i < videoURLArray.length; i++) {
        // add explaination before the slider
        //var intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        //intro1.innerHTML = "Is the gaze movement from <b>" + methodString[i] + "</b> human-like?";
        //container.appendChild(intro1);

        // add VAS slider
        //container.appendChild(CreateSlider(HumanLknessSliderIdArray[i], "Not human-like", "Human-like"));

        // add explaination before the slider
        intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Is the gaze movement from <b>" + methodString[i] + "</b> natural?";
        container.appendChild(intro1);

        // add VAS slider
        container.appendChild(CreateSlider(NaturalnessSliderIdArray[i], "Unnatural", "Natural"));

        // add explaination before the slider
        intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Is the gaze movement from <b>" + methodString[i] + "</b> seem robotic?";
        container.appendChild(intro1);

        // add VAS slider
        container.appendChild(CreateSlider(RoboticSliderIdArray[i], "Not Robotic", "Robotic"));

        // add explaination before the comment block
        var intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Do you have any comment on the character " + methodString[i] + " ?";
        container.appendChild(intro1);

        container.appendChild(CreateCommentBlock(GeneralCommentIdArray[i], "e.g. The character seems unnatural. Because ... / The character seems natural. Because ..."));
    }

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
            alert("Pleas input your name.");
        }
        else {
            // set up content for csv file
            //let csvContent = "data:text/csv;charset=utf-8,";

            // input the participant's name
            let csvContent = QuestionnaireIndex + "\r\n";
            csvContent += document.getElementById("name").value + "\r\n";

            //for (var i = 0; i < YesNoSwitchIdArray.length; i++) {
            //    const YesOrNotSwitch = document.getElementById(YesNoSwitchIdArray[i]);
            //    csvContent += YesOrNotSwitch.value + "\r\n";
            //}

            // input the value of each VAS slider
            //for (var i = 0; i < HumanLikenessSliderIdArray.length; i++) {
            //    const slider = document.getElementById(HumanLikenessSliderIdArray[i]);
            //    csvContent += slider.value + "\r\n";
            //}

            for (var i = 0; i < NaturalnessSliderIdArray.length; i++) {
                const slider = document.getElementById(NaturalnessSliderIdArray[i]);
                csvContent +=  slider.value + "\r\n";
            }

            for (var i = 0; i < RoboticSliderIdArray.length; i++) {
                const slider = document.getElementById(RoboticSliderIdArray[i]);
                csvContent += slider.value + "\r\n";
            }


            for (var i = 0; i < GeneralCommentIdArray.length; i++) {
                csvContent += i.toString() + ": " + document.getElementById(GeneralCommentIdArray[i]).value + "\r\n" + "\r\n";
            }

            //// input the value of each VAS slider
            //for (var i = 0; i < FeMaleSliderIdArray.length; i++) {
            //    const slider = document.getElementById(FeMaleSliderIdArray[i]);
            //    csvContent += slider.value + "\r\n";
            //}

            //for (var i = 0; i < FemaleCommentIdArray.length; i++) {
            //    csvContent += document.getElementById(FemaleCommentIdArray[i]).value + "\r\n";
            //}

            csvContent += "General: " + document.getElementById("comment").value + "\r\n";

            ServerPostResult(csvContent);

           // alert("Please send the downloaded file to the owner of the questionnaire."); // information to send back the result
        }

    }

}

var QuestionnaireIndex = 999;

function ServerGetResult() {
    // 使用 fetch 发送 GET 请求到 Flask 后端
    fetch('http://127.0.0.1:45557/get-number')
        .then(response => response.json())  // 解析响应为 JSON
        .then(data => {
            // 获取返回的数字 a
            const a = data.a;

            // 显示接收到的值
            console.log("server result = " + a);
            QuestionnaireIndex = a;
            LoadVideoFromIndex();

        })
        .catch(error => console.error('Error:', error));
}


function ServerPostResult(result)
{

    fetch('http://127.0.0.1:45557/collect-result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: result })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Submit successfully! Thank you!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error submiting! Please try again.');
        });
}

function LoadVideoFromIndex() {

    var contianer = document.getElementById("questionBlock")
    if (contianer != null) { document.removeChild(contianer); }
    const tempArr = new Array(0, 1, 2);
    let OrderArray = getNthPermutation(tempArr, QuestionnaireIndex);
    console.log("order array = " + OrderArray);
    const OrderVideoURLArray = OrderArrayWith(VideoURLArray, OrderArray);
    //const OrderHumanLikenessSliderId = OrderArrayWith(HumanLikenessSliderIdArray, OrderArray);
    const OrderNaturalnessSliderId = OrderArrayWith(NaturalnessSliderIdArray, OrderArray);
    const OrderRoboticSliderId = OrderArrayWith(RoboticSliderIdArray, OrderArray);
    const OrderGeneralCommentId = OrderArrayWith(GeneralCommentIdArray, OrderArray);
    // add elements for evaluation section
    document.body.insertBefore(CreateQuestionBlock("Please watch the videos:", OrderVideoURLArray, OrderNaturalnessSliderId, OrderRoboticSliderId, OrderGeneralCommentId, AnonmyMethodNameStringArray), CommentBlock);

    SetSubmitButton();

}

// from GPT
function getPermutations(arr) {
    let result = [];

    if (arr.length === 1) {
        return [arr];
    }

    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        let remaining = arr.slice(0, i).concat(arr.slice(i + 1));

        let remainingPerms = getPermutations(remaining);
        for (let perm of remainingPerms) {
            result.push([current].concat(perm));
        }
    }

    return result;
}

//from GPT
function getNthPermutation(arr, N) {
    let permutations = getPermutations(arr);

    // 注意：N是从1开始的，所以我们需要减1来获取数组的正确索引
    if (N > 0) {
        return permutations[(N - 1) % arr.length]; // 返回第N种排列
    } else {
        return null; // 如果N超出范围，返回null
    }
}

function OrderArrayWith(array, order) {
    const newArray = new Array(order.length);
    for (var i = 0; i < order.length; i++) {
        newArray[i] = array[order[i]];
    }
    return newArray;
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

function CreateCommentBlock(commentId, placeHolderText) {
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
    placeHolderAtt.value = placeHolderText;

    node.setAttributeNode(typeAtt);
    node.setAttributeNode(idAtt);
    node.setAttributeNode(sizeAtt);
    node.setAttributeNode(rowAtt);
    node.setAttributeNode(placeHolderAtt);

    return node;

}
