// JavaScript source code

// id array for each VAS slider, for later getting value
//const HumanLikenessSliderIdArray = new Array("HumanlikeProposed", "HumanlikeDirectly", "HumanlikePreviousSmall", "HumanlikePreviousLarge");
const NaturalnessSliderIdArray = new Array("NaturalnessProposed", "NaturalnessDirectly", "NaturalnessPrevious");
const RoboticSliderIdArray = new Array("RoboticProposed", "RoboticDirectly", "RoboticPrevious");

const GeneralCommentIdArray = new Array("GeneralProposed", "GeneralDirectly", "GeneralPreviousLarge");


const AnonmyMethodNameStringArray = new Array("A", "B", "C");
let OrderAnonmyMethodNameStringArray;

// id array for consent information, to check whether they are checked later
const consentIdArray = new Array("info1", "info2", "info3", "info4", "info5");

// setting top title
const titleElement = document.getElementById("head_title");
titleElement.innerHTML = "Gaze Movement Evaluation <br>視線の動きの評価実験 <br>视线动作评价实验";


// get submit button
const SubmitButton = document.getElementById("submitButton");

const CommentBlock = document.getElementById("commentBlock");

const SceneIntroduction = document.getElementById("scene");

// Videos P D I are used
const VideoURLArray = new Array(
    // google drive
    //"https://drive.google.com/file/d/1iYB6_SjyXyHNDLSdtW6ePcVu_6YVp5ZN/preview", // P
    //"https://drive.google.com/file/d/1OYqlNO-MPHFJzU64_Mj8bnqU4Wue4Le0/preview", // D
    //"https://drive.google.com/file/d/1oszr_mLvP1j2Tczy7x0ssquGDuNAjAmD/preview", // I

    //"http://192.168.1.7:45555/P.mp4",
    //"http://192.168.1.7:45555/D.mp4",
    //"http://192.168.1.7:45555/I.mp4"

    //"http://131.112.182.91:45555/P.mp4",
    //"http://131.112.182.91:45555/D.mp4",
    //"http://131.112.182.91:45555/I.mp4"

    "P.mp4",
    "D.mp4",
    "I.mp4"


    
);

//const SceneIntrodcutionVideo = "https://drive.google.com/file/d/15gWfLbjfFuwL1GCFw-ts9jIMHfPmrRcx/preview";
//const SceneIntrodcutionVideo = "http://192.168.1.7:45555/Scene.mp4";
//const SceneIntrodcutionVideo = "http://131.112.182.91:45555/Scene.mp4";
const SceneIntrodcutionVideo = "Scene.mp4";




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
    legend.innerHTML = legendText;
    container.appendChild(legend);

    // add explaination before the video
    const introAll = document.createElement("li"); // use "li" to add a black dot before the text
    introAll.innerHTML = "Please watch the video at <b>fullscreen</b.Please watch each video <b>at least twice</b> to compare the difference.<br>ビデオを<b>全画面</b>でご覧ください。ビデオは<b>少なくとも二回</b>視聴して、違いを比較してください。<br>请在<b>全屏</b>状态下至少观看<b>两遍</b>以比较区别。";
    container.appendChild(introAll);

    for (var i = 0; i < videoURLArray.length; i++) {
        const URL = videoURLArray[i];
        const intro = document.createElement("h2"); // use "li" to add a black dot before the text
        intro.innerHTML = "<b>" + methodString[i] + ":</b>";
        container.appendChild(intro);
        container.appendChild(CreateVideoBlock(URL));
    
    //container.appendChild(CreateVideoBlock(videoURL));


    //// add explaination before the slider
    //const intro3 = document.createElement("li"); // use "li" to add a black dot before the text
    //intro3.innerHTML = "Can you tell these two gaze movements (" + methodString1 + " & " + methodString2 + ") are <b>different</b>?";
    //container.appendChild(intro3);

    //// add ask difference switch
    //container.appendChild(CreateYesNoSwitch(switchId));

        // add explaination before the slider
        //var intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        //intro1.innerHTML = "Is the gaze movement from <b>" + methodString[i] + "</b> human-like?";
        //container.appendChild(intro1);

        // add VAS slider
        //container.appendChild(CreateSlider(HumanLknessSliderIdArray[i], "Not human-like", "Human-like"));

        // add explaination before the slider
        intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Is the gaze movement from <b>" + methodString[i] + "</b> natural? <b>(Unnatural~Natural)</b> <br><b>" + methodString[i] + "</b> の視線の動きは自然ですか？<b>(不自然~自然)</b> <br>请问<b>" + methodString[i] + "</b> 的视线动作看起来自然吗？<b>(不自然~自然)</b>";
        container.appendChild(intro1);

        // add VAS slider
        container.appendChild(CreateSlider(NaturalnessSliderIdArray[i], "<b>Unnatural<br>不自然<br>不自然</b>", "<b>Natural<br>自然<br>自然</b>"));

        // add explaination before the slider
        intro1 = document.createElement("li"); // use "li" lito add a black dot before the text
        intro1.innerHTML = "Is the gaze movement from <b>" + methodString[i] + "</b> seem robotic? <b>(Robotic~Not Robotic)</b><br><b>" + methodString[i] + "</b> の視線の動きはロボットのように見えますか？<b>(ロボットのような~ロボットのようではない)</b> <br>请问<b>" + methodString[i] + "</b> 的视线动作看起来像机器人吗？ <b>(像机器人~不像机器人)";
        container.appendChild(intro1);

        // add VAS slider
        container.appendChild(CreateSlider(RoboticSliderIdArray[i], "<b>Robotic<br>ロボットのようだ<br>像机器人</b>", "<b>Not Robotic<br>ロボットのようでない<br>不像机器人</b>"));

        // add explaination before the comment block
        var intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Do you have any comment on the character " + methodString[i] + " ?  <br>キャラクター" + methodString[i] + "について何かコメントはありますか？<br>请问对人物" + methodString[i] + "有什么评论吗？";
        container.appendChild(intro1);

        container.appendChild(CreateCommentBlock(GeneralCommentIdArray[i], "e.g. The character seems unnatural. Because ... / The character seems natural. Because ... キャラクターは不自然に見えます。なぜなら... / キャラクターは自然に見えます。なぜなら... 人物的动作看起来不自然，因为....../人物的动作看起来很自然，因为......"));
    }

    return container;
}

function SetSubmitButton() {
    document.getElementById("submitButton").onclick = function () {
        EndTime = new Date();
        console.log("End At " + EndTime);
        let Duration = (EndTime - StartTime)/1000;
        console.log("Duration = " + Duration);

        if (!IsConsentAllChecked()) {
            // alert to check all the consent information, if not all the checkbox are checked
            alert("Please Check all the checkbox in Consent. 同意のチェックボックスをすべて確認してください。请阅读后勾选所有的同意事项。")
        }
        else if (document.getElementById("name").value == "" || document.getElementById("age").value == "")
        {
            // alert to input the name, if have not
            alert("Please input your name and age. おニックネームと年齢を入力してください。请输入您的昵称和年龄。");
        }
        else if (document.getElementById("answer").value == "") {
            // alert to input the name, if have not
            alert("Please answer the question about 3D game and 3D animation. 3Dゲームと3Dアニメに関する質問に答えてください。请回答关于是否接触过3D游戏或3D动画的问题。");
        }
        else {
            // set up content for csv file
            //let csvContent = "data:text/csv;charset=utf-8,";

            // input the participant's name
            let csvContent = QuestionnaireIndex + "\r\n";
            csvContent += document.getElementById("name").value + "\r\n";
            csvContent += document.getElementById("gender").value + "\r\n";
            csvContent += document.getElementById("age").value + "\r\n";
            csvContent += document.getElementById("answer").value + "\r\n";
            csvContent += "Duration: \r\n" + Duration + "\r\n\r\n";

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

            csvContent += "\r\n";

            for (var i = 0; i < RoboticSliderIdArray.length; i++) {
                const slider = document.getElementById(RoboticSliderIdArray[i]);
                csvContent += slider.value + "\r\n";
            }

            csvContent += "\r\n";

            for (var i = 0; i < GeneralCommentIdArray.length; i++) {
                csvContent += OrderAnonmyMethodNameStringArray[i] + ": " + document.getElementById(GeneralCommentIdArray[i]).value + "\r\n" + "\r\n";
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
let StartTime;
let EndTime;

function ServerGetResult() {
    // 使用 fetch 发送 GET 请求到 Flask 后端
    //fetch('http://127.0.0.1:45557/get-number')
    //fetch('http://192.168.1.7:45557/get-number')

    //fetch('http://131.112.182.91:45557/get-number')
    fetch(' https://ex.haselab.net/lian_qserver/get-number')
        .then(response => response.json())  // 解析响应为 JSON
        .then(data => {
            // 获取返回的数字 a
            const a = data.a;

            // 显示接收到的值
            console.log("server result = " + a);
            QuestionnaireIndex = a;
            LoadVideoFromIndex();
            StartTime = new Date();
            console.log("Start at = " + StartTime);

        })
        .catch(error => console.error('Error:', error));
}


function ServerPostResult(result)
{

    //fetch('http://127.0.0.1:45557/collect-result', {
    //fetch('http://192.168.1.7:45557/collect-result', {

    //fetch('http://131.112.182.91:45557/collect-result', {
    fetch(' https://ex.haselab.net/lian_qserver/collect-result', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: result })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Submit successfully! Thank you! 送信が成功しました！ありがとうございます！提交成功，感谢您的参与！');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error submiting! Please try again. 送信エラーが発生しました！もう一度お試しください。提交失败，请再次提交。');
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
    OrderAnonmyMethodNameStringArray = OrderArrayWith(AnonmyMethodNameStringArray, OrderArray);
    // add elements for evaluation section
    document.body.insertBefore(CreateQuestionBlock("Videos will show the character's face and the first person view of the character: <br>ビデオではキャラクターの顔とキャラクターの一人称視点が表示されます：<br>视频会展示人物的面部特写及人物的第一人称视角：", OrderVideoURLArray, OrderNaturalnessSliderId, OrderRoboticSliderId, OrderGeneralCommentId, AnonmyMethodNameStringArray), CommentBlock);

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
        return permutations[(N - 1) % permutations.length]; // 返回第N种排列
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
    Legend.innerHTML = text;
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
    srcAtt.value = videoURL
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

    // 等待 iframe 加载后执行代码
    node.onload = function () {
        // 获取 iframe 内部的 document 对象
        const iframeDocument = node.contentWindow.document;

        // 获取视频元素
        const video = iframeDocument.querySelector('video');

        // 确保视频不自动播放
        if (video) {
            video.autoplay = false;  // 禁止自动播放
        }
    }

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
