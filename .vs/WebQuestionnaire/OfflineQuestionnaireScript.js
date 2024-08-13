// JavaScript source code

// id array for each VAS slider, for later getting value
const HumanLikenessSliderIdArray = new Array("HumanlikeProposed", "HumanlikeDirectly", "HumanlikePreviousSmall", "HumanlikePreviousLarge");
const NaturalnessSliderIdArray = new Array("NaturalnessProposed", "NaturalnessDirectly", "NaturalnessPreviousSmall", "NaturalnessPreviousLarge");
const RoboticSliderIdArray = new Array("RoboticProposed", "RoboticDirectly", "RoboticPreviousSmall", "RoboticPreviousLarge");

const HumanLikenessSliderIdArrayL = new Array("HumanlikeProposedL", "HumanlikeDirectlyL", "HumanlikePreviousSmallL", "HumanlikePreviousLargeL");
const NaturalnessSliderIdArrayL = new Array("NaturalnessProposedL", "NaturalnessDirectlyL", "NaturalnessPreviousSmallL", "NaturalnessPreviousLargeL");
const RoboticSliderIdArrayL = new Array("RoboticProposedL", "RoboticDirectlyL", "RoboticPreviousSmallL", "RoboticPreviousLargeL");

//const YesNoSwitchIdArray = new Array("switchDifferent");

const CalmSliderIdArray = new Array("CalmProposed", "CalmDirectly", "CalmPreviousSmall", "CalmPreviousLarge"); // calm - nervous
const RelaxSliderIdArray = new Array("RelaxProposed", "RelaxDirectly", "RelaxPreviousSmall", "RelaxPreviousLarge"); // relax - excited

const GeneralCommentIdArray = new Array("GeneralProposed", "GeneralDirectly", "GeneralPreviousSmall", "GeneralPreviousLarge");

const CalmSliderIdArrayL = new Array("CalmProposedL", "CalmDirectlyL", "CalmPreviousSmallL", "CalmPreviousLargeL"); // calm - nervous
const RelaxSliderIdArrayL = new Array("RelaxProposedL", "RelaxDirectlyL", "RelaxPreviousSmallL", "RelaxPreviousLargeL"); // relax - excited

const GeneralCommentIdArrayL = new Array("GeneralProposedL", "GeneralDirectlyL", "GeneralPreviousSmallL", "GeneralPreviousLargeL");

const AnonmyMethodNameStringArray = new Array("A", "B", "C", "D");
const AnonmyMethodNameStringArrayL = new Array("E", "F", "G", "H");

// id array for consent information, to check whether they are checked later
const consentIdArray = new Array("info1", "info2", "info3", "info4", "info5");

// setting top title
const titleElement = document.getElementById("head_title");
titleElement.innerText = "Gaze Movement Evaluation";

// get submit button
const SubmitButton = document.getElementById("submitButton");

const CommentBlock = document.getElementById("commentBlock");


// Videos P D PS PL are used
const VideoURLArray = new Array(
    //// google drive
    //"https://drive.google.com/file/d/1kiAoSZYhunoqEZBpBqVq1B5ci6HgUWAN/preview", // PP
    //"https://drive.google.com/file/d/1KBHWu7RpflPwjHs_aqeLg3T1QiAphDdK/preview", // PD
    //"https://drive.google.com/file/d/1GqVGY02llV7QLzYlmx-uJLZYFuYCV5BZ/preview", // PS
    //"https://drive.google.com/file/d/1ELCge-2eaGAvf3LmMrh9hov9iozfCTh1/preview", // PL

    "https://player.bilibili.com/player.html?isOutside=true&aid=112954133450091&bvid=BV1JuYCeaEhj&cid=500001648121412&p=1", // PP
    "http://player.bilibili.com/player.html?isOutside=true&aid=112954133448865&bvid=BV1JuYCeaECv&cid=500001648121946&p=1", // PD
    "https://player.bilibili.com/player.html?isOutside=true&aid=112954133513366&bvid=BV16uYCeaE8W&cid=500001648123228&p=1", // PS
    "https://player.bilibili.com/player.html?isOutside=true&aid=112954133516188&bvid=BV16uYCeaETV&cid=500001648122735&p=1", // PL
);

const VideoURLArrayL = new Array(
    //// google drive
    //"https://drive.google.com/file/d/1kiAoSZYhunoqEZBpBqVq1B5ci6HgUWAN/preview", // PP
    //"https://drive.google.com/file/d/1KBHWu7RpflPwjHs_aqeLg3T1QiAphDdK/preview", // PD
    //"https://drive.google.com/file/d/1GqVGY02llV7QLzYlmx-uJLZYFuYCV5BZ/preview", // PS
    //"https://drive.google.com/file/d/1ELCge-2eaGAvf3LmMrh9hov9iozfCTh1/preview", // PL

    "https://player.bilibili.com/player.html?isOutside=true&aid=112954133448591&bvid=BV1nuYCeaE5S&cid=500001648123312&p=1", // PP_L
    "http://player.bilibili.com/player.html?isOutside=true&aid=112954133581705&bvid=BV1FuYCeYEin&cid=500001648123420&p=1", // PD_L
    "https://player.bilibili.com/player.html?isOutside=true&aid=112954133579652&bvid=BV1cuYCeYEGX&cid=500001648124001&p=1", // PS_L
    "https://player.bilibili.com/player.html?isOutside=true&aid=112954133515645&bvid=BV16uYCeaEFw&cid=500001648124133&p=1", // PL_L
);


//// add elements for evaluation section
//document.body.insertBefore(CreateQuestionBlock("Male Characters:", VideoURLArray, SliderIdArray, MentalCommentIdArray, YesNoSwitchIdArray[0], "A", "B"), CommentBlock); //P

//document.body.insertBefore(CreateQuestionBlock("Male Characters:", CVideoURLArray, MaleSliderIdArray, MaleCommentIdArray, YesNoSwitchIdArray[0], "A", "B"), CommentBlock); //C

//document.body.insertBefore(CreateQuestionBlock("Male Characters:", MaleCharacterVideoURL, MaleSliderIdArray, MaleCommentIdArray, YesNoSwitchIdArray[0], "A", "B"), CommentBlock);
//document.body.insertBefore(CreateQuestionBlock("Female Characters:", FemaleCharacterVideoURL, FeMaleSliderIdArray, FemaleCommentIdArray, YesNoSwitchIdArray[1], "C", "D"), CommentBlock);

// set up the behavior when click finish button after inputing Id
SetNumberInputButton();

// set up the behavior when click submit button

// function to create a VAS block
function CreateQuestionBlock(legendText, videoURLArray, HumanLknessSliderIdArray, NaturalnessSliderIdArray, RoboticSliderIdArray, CalmSliderIdArray, RelaxSliderIdArray, GeneralCommentIdArray, methodString) {

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
        var intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Is the gaze movement from <b>" + methodString[i] + "</b> human-like?";
        container.appendChild(intro1);

        // add VAS slider
        container.appendChild(CreateSlider(HumanLknessSliderIdArray[i], "Not human-like", "Human-like"));

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

        // add explaination before the slider
        intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Is the character <b>" + methodString[i] + "</b> calm or nervous?";
        container.appendChild(intro1);

        // add VAS slider
        container.appendChild(CreateSlider(CalmSliderIdArray[i], "Calm", "Nervous"));

        // add explaination before the slider
        intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Is the character <b>" + methodString[i] + "</b> relaxed or excited?";
        container.appendChild(intro1);

        // add VAS slider
        container.appendChild(CreateSlider(RelaxSliderIdArray[i], "Relaxed", "Excited"));

        // add explaination before the comment block
        var intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Do you have any comment on the character " + methodString[i] + " ?";
        container.appendChild(intro1);

        container.appendChild(CreateCommentBlock(GeneralCommentIdArray[i], "e.g. The character acts strange. Because ..."));
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
            alert("Pleas input participant's ID.");
        }
        else {
            // set up content for csv file
            let csvContent = "data:text/csv;charset=utf-8,";

            // input the participant's name
            csvContent += document.getElementById("Number").value + "\r\n";
            csvContent += document.getElementById("name").value + "\r\n";

            //for (var i = 0; i < YesNoSwitchIdArray.length; i++) {
            //    const YesOrNotSwitch = document.getElementById(YesNoSwitchIdArray[i]);
            //    csvContent += YesOrNotSwitch.value + "\r\n";
            //}

            // input the value of each VAS slider
            for (var i = 0; i < HumanLikenessSliderIdArray.length; i++) {
                const slider = document.getElementById(HumanLikenessSliderIdArray[i]);
                csvContent += slider.value + "\r\n";
            }

            for (var i = 0; i < NaturalnessSliderIdArray.length; i++) {
                const slider = document.getElementById(NaturalnessSliderIdArray[i]);
                csvContent +=  slider.value + "\r\n";
            }

            for (var i = 0; i < RoboticSliderIdArray.length; i++) {
                const slider = document.getElementById(RoboticSliderIdArray[i]);
                csvContent += slider.value + "\r\n";
            }

            for (var i = 0; i < CalmSliderIdArray.length; i++) {
                const slider = document.getElementById(CalmSliderIdArray[i]);
                csvContent += slider.value + "\r\n";
            }

            for (var i = 0; i < RelaxSliderIdArray.length; i++) {
                const slider = document.getElementById(RelaxSliderIdArray[i]);
                csvContent += slider.value + "\r\n";
            }

            // input the value of each VAS slider
            for (var i = 0; i < HumanLikenessSliderIdArrayL.length; i++) {
                const slider = document.getElementById(HumanLikenessSliderIdArrayL[i]);
                csvContent += slider.value + "\r\n";
            }

            for (var i = 0; i < NaturalnessSliderIdArrayL.length; i++) {
                const slider = document.getElementById(NaturalnessSliderIdArrayL[i]);
                csvContent += slider.value + "\r\n";
            }

            for (var i = 0; i < RoboticSliderIdArrayL.length; i++) {
                const slider = document.getElementById(RoboticSliderIdArrayL[i]);
                csvContent += slider.value + "\r\n";
            }

            for (var i = 0; i < CalmSliderIdArrayL.length; i++) {
                const slider = document.getElementById(CalmSliderIdArrayL[i]);
                csvContent += slider.value + "\r\n";
            }

            for (var i = 0; i < RelaxSliderIdArrayL.length; i++) {
                const slider = document.getElementById(RelaxSliderIdArrayL[i]);
                csvContent += slider.value + "\r\n";
            }

            for (var i = 0; i < GeneralCommentIdArray.length; i++) {
                csvContent += i.toString() + ": " + document.getElementById(GeneralCommentIdArray[i]).value + "\r\n" + "\r\n";
            }

            for (var i = 0; i < GeneralCommentIdArrayL.length; i++) {
                csvContent += i.toString() + ": " + document.getElementById(GeneralCommentIdArrayL[i]).value + "\r\n" + "\r\n";
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

            // create a element to download the file
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", document.getElementById("Number").value + "_QuestionnaireResultOf" + document.getElementById("name").value + ".csv"); // P
            //link.setAttribute("download", "C_QuestionnaireResultOf" + document.getElementById("name").value + ".csv"); // C
            document.body.appendChild(link);
            link.click(); // and click automatically
            alert("Please send the downloaded file to the owner of the questionnaire."); // information to send back the result
        }

    }

}

function SetNumberInputButton() {
    document.getElementById("id_button").onclick = function () {
        var contianer = document.getElementById("questionBlock")
        if (contianer != null) { document.removeChild(contianer); }
        
        var Number = parseInt(document.getElementById("Number").value) -1;
        var first = Math.floor(Number / 6) % 4;
        var second = Math.floor(Number / 2) % 3;
        if (second >= first) second++;
        var third = Number % 2;
        if (third >= first) {
            if (third + 1 >= second) {
                third += 2;
            }
            else {
                third++;
            }
        }
        else if (third >= second) {
            if (third + 1 >= first) {
                third += 2;
            }
            else {
                third++;
            }
        }
        var fourth = 6 - first - second - third;
        const OrderArray = new Array( first, second, third, fourth);
        const OrderVideoURLArray = OrderArrayWith(VideoURLArray, OrderArray);
        const OrderHumanLikenessSliderId = OrderArrayWith(HumanLikenessSliderIdArray, OrderArray);
        const OrderNaturalnessSliderId = OrderArrayWith(NaturalnessSliderIdArray, OrderArray);
        const OrderRoboticSliderId = OrderArrayWith(RoboticSliderIdArray, OrderArray);
        const OrderCalmSliderId = OrderArrayWith(CalmSliderIdArray, OrderArray);
        const OrderRelaxSliderId = OrderArrayWith(RelaxSliderIdArray, OrderArray);
        const OrderGeneralCommentId = OrderArrayWith(GeneralCommentIdArray, OrderArray);
        // add elements for evaluation section
        document.body.insertBefore(CreateQuestionBlock("When objects are within the view of character:", OrderVideoURLArray, OrderHumanLikenessSliderId, OrderNaturalnessSliderId, OrderRoboticSliderId, OrderCalmSliderId, OrderRelaxSliderId, OrderGeneralCommentId, AnonmyMethodNameStringArray), CommentBlock);
        //console.log(OrderArray.toString());
        const OrderVideoURLArrayL = OrderArrayWith(VideoURLArrayL, OrderArray);
        const OrderHumanLikenessSliderIdL = OrderArrayWith(HumanLikenessSliderIdArrayL, OrderArray);
        const OrderNaturalnessSliderIdL = OrderArrayWith(NaturalnessSliderIdArrayL, OrderArray);
        const OrderRoboticSliderIdL = OrderArrayWith(RoboticSliderIdArrayL, OrderArray);
        const OrderCalmSliderIdL = OrderArrayWith(CalmSliderIdArrayL, OrderArray);
        const OrderRelaxSliderIdL = OrderArrayWith(RelaxSliderIdArrayL, OrderArray);
        const OrderGeneralCommentIdL = OrderArrayWith(GeneralCommentIdArrayL, OrderArray);
        // add elements for evaluation section
        document.body.insertBefore(CreateQuestionBlock("When objects are almost out of the view of character:", OrderVideoURLArrayL, OrderHumanLikenessSliderIdL, OrderNaturalnessSliderIdL, OrderRoboticSliderIdL, OrderCalmSliderIdL, OrderRelaxSliderIdL, OrderGeneralCommentIdL, AnonmyMethodNameStringArrayL), CommentBlock);
    }
    SetSubmitButton();

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
