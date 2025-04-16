// JavaScript source code

// id array for each VAS slider, for later getting value
//const HumanLikenessSliderIdArray = new Array("HumanlikeProposed", "HumanlikeDirectly", "HumanlikePreviousSmall", "HumanlikePreviousLarge");

//const AnonmyMethodNameStringArray = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
//const MethodTypes = new Array("AA", "AB", "AC", "BA", "BB", "BC", "CA", "CB", "CC"); // proposed, previous, direclty

const AnonmyMethodNameStringArray = new Array("A", "B");
const MethodTypes = new Array("PA", "RP"); // proposed, realistic eye package

const RealisticAllSliderIdArray = MethodTypes.map(item => `Realistic_All_${item}`);
const RealisticEyeSliderIdArray = MethodTypes.map(item => `Realistic_Eye_${item}`);
const RealisticHeadSliderIdArray = MethodTypes.map(item => `Realistic_Head_${item}`);
const HeadEyeCodSliderIdArray = MethodTypes.map(item => `Coordinate_${item}`);
const GeneralCommentIdArray = MethodTypes.map(item => `Comment_${item}`);
let watchedCompleteArray = new Array(MethodTypes.length).fill(false);
let videoProgressArray = new Array(MethodTypes.length).fill(0);
const VideolArray = new Array(MethodTypes.length);
let OrderAnonmyMethodNameStringArray;

// id array for consent information, to check whether they are checked later
const consentIdArray = new Array("info1", "info2", "info3", "info4", "info5");

// setting top title
const titleElement = document.getElementById("head_title");
titleElement.innerHTML = "Gaze Movement Evaluation <br>視線の動きに関する評価実験 <br>视线动作评价实验";


// get submit button
const SubmitButton = document.getElementById("submitButton");

const CommentBlock = document.getElementById("commentBlock");

const SceneIntroduction = document.getElementById("scene");

// Videos P D I are used
const VideoURLArray = new Array(
    "EvaluationVideo/PA.mp4",
    "EvaluationVideo/RP.mp4",
    //"EvaluationVideo/AA.mp4",
    //"EvaluationVideo/AB.mp4",
    //"EvaluationVideo/AC.mp4",
    //"EvaluationVideo/BA.mp4",
    //"EvaluationVideo/BB.mp4",
    //"EvaluationVideo/BC.mp4",
    //"EvaluationVideo/CA.mp4",
    //"EvaluationVideo/CB.mp4",
    //"EvaluationVideo/CC.mp4"
    
);

const SceneIntrodcutionVideo = "EvaluationVideo/Scene.mp4";

SceneIntroduction.appendChild(CreateVideoBlock(SceneIntrodcutionVideo));

PreventFormSubmit();

// set up the behavior when click finish button after inputing Id
ServerGetResult();

function PreventFormSubmit() { // input enter would cause reload of the page
    document.addEventListener("DOMContentLoaded", function () {
        // 获取所有form元素并阻止默认提交行为
        const forms = document.querySelectorAll("form");
        forms.forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();  // 阻止表单提交，避免页面刷新
            });
        });

        // 阻止按回车键提交
        const inputs = document.querySelectorAll("input");
        inputs.forEach(function (input) {
            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();  // 阻止回车键提交
                }
            });
        });
    });
}

// set up the behavior when click submit button

// function to create a VAS block
function CreateQuestionBlock(legendText, videoURLArray, NaturalAllSliderIdArray, NaturalEyeSliderIdArray, NaturalHeadSliderIdArray, HeadEyeCodSliderIdArray, GeneralCommentIdArray, methodString) {

    // create outside container
    const container = document.createElement("fieldset");
    const QuestionContainerAtt = document.createAttribute("id");
    QuestionContainerAtt.value = "questionBlock";
    container.setAttributeNode(QuestionContainerAtt);
    // set legend of container
    const legend = document.createElement("legend");
    legend.innerHTML = legendText;
    container.appendChild(legend);

    intro1 = document.createElement("li"); // use "li" to add a black dot before the text
    intro1.innerHTML = "The character's first-person perspective is solely for indicating the target. Please focus on the <b>eye and head movements</b>.<br>キャラクターの一人称視点は目標を示すためのものです。<b>目や頭の動き</b>に注目してください。<br>角色的第一人称视角仅用于指示目标，请集中观察<b>眼睛和头部的动作</b>。";
    container.appendChild(intro1);

    // add explaination before the video
    introAll = document.createElement("li"); // use "li" to add a black dot before the text
    introAll.innerHTML = "The character does not blink to ensure that the eyes remain visible at all times.<br>キャラクターの目が常に見えるようにするため、まばたきをしません。<br>为了让眼睛始终可见，角色不会眨眼。";
    container.appendChild(introAll);

    // add explaination before the video
    introAll = document.createElement("li"); // use "li" to add a black dot before the text
    introAll.innerHTML = "Please watch the video at <b>fullscreen</b.Please watch each video <b>at least twice</b> to compare the difference. Then evaluate it with the red bar.<br>動画は<b>全画面</b>でご覧ください。動画を<b>少なくとも2回</b>視聴し、違いを比較してください。その後、どれくらいリアルに感じたかを赤い線を動かしてお教えください。<br>请在<b>全屏</b>状态下至少观看<b>两遍</b>以比较区别。并移动红色的刻度线作出相应评估。";
    container.appendChild(introAll);

    for (var i = 0; i < videoURLArray.length; i++) {
        const URL = videoURLArray[i];
        const intro = document.createElement("h2"); // use "li" to add a black dot before the text
        intro.innerHTML = "<b>" + methodString[i] + ":</b>";
        container.appendChild(intro);

        container.appendChild(CreateVideoBlock(URL));

        // add explaination before the slider
        intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "How realistic is the movement of the male character in the video <b>" + methodString[i] + "</b>? <b>(Not realistic at all~Very realistic)</b> <br>動画 <b>" + methodString[i] + "</b> の男性キャラクターの動きは、全体的にどのくらいリアルだと感じましたか？<b>(全くリアルではない~非常にリアル)</b> <br>你认为视频 <b>" + methodString[i] + "</b> 中的男性角色动作整体有多逼真？<b>(完全不逼真~非常逼真)</b>";
        container.appendChild(intro1);
        // add VAS slider
        container.appendChild(CreateSlider(NaturalAllSliderIdArray[i], "<b>Not realistic at all<br>全くリアルではない<br>完全不逼真</b>", "<b>Very realistic<br>非常にリアル<br>非常逼真</b>"));

        // add explaination before the slider
        intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "How realistic is the eye movement of the male character in the video <b>" + methodString[i] + "</b>? <b>(Not realistic at all~Very realistic)</b> <br>動画<b>" + methodString[i] + "</b>の男性キャラクターの目の動きはどのくらいリアルだと感じましたか？<b>(全くリアルではない~非常にリアル)</b> <br>你认为视频<b>" + methodString[i] + "</b>中的男性角色的眼睛动作有多逼真？<b>(完全不逼真~非常逼真)</b>";
        container.appendChild(intro1);
        // add VAS slider
        container.appendChild(CreateSlider(NaturalEyeSliderIdArray[i], "<b>Not realistic at all<br>全くリアルではない<br>完全不逼真</b>", "<b>Very realistic<br>非常にリアル<br>非常逼真</b>"));

        // add explaination before the slider
        intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "How realistic is the head movement of the male character in the video <b>" + methodString[i] + "</b>? <b>(Not realistic at all~Very realistic)</b> <br>動画<b>" + methodString[i] + "</b>の男性キャラクターの頭の動きはどのくらいリアルだと感じましたか？<b>(全くリアルではない~非常にリアル)</b> <br>你认为视频<b>" + methodString[i] + "</b>中的男性角色的头部动作有多逼真？<b>(完全不逼真~非常逼真)</b>";
        container.appendChild(intro1);
        // add VAS slider
        container.appendChild(CreateSlider(NaturalHeadSliderIdArray[i], "<b>Not realistic at all<br>全くリアルではない<br>完全不逼真</b>", "<b>Very realistic<br>非常にリアル<br>非常逼真</b>"));

        // add explaination before the slider
        intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Do the male character's eye and head movements in the video <b>" + methodString[i] + "</b> look coordinated naturally? <b>(Unnatural~Natural)</b> <br>動画<b>" + methodString[i] + "</b>の男性キャラクターの目と頭の動きは自然に連携していますか？<b>(不自然~自然)</b> <br>视频<b>" + methodString[i] + "</b>中的男性角色的眼睛和头部动作看起来自然协调吗？<b>(不自然~自然)</b>";
        container.appendChild(intro1);
        // add VAS slider
        container.appendChild(CreateSlider(HeadEyeCodSliderIdArray[i], "<b>Unnatural<br>不自然<br>不自然</b>", "<b>Natural<br>自然<br>自然</b>"));


        // add explaination before the comment block
        var intro1 = document.createElement("li"); // use "li" to add a black dot before the text
        intro1.innerHTML = "Do you have any comment on the character  in video " + methodString[i] + " ?  <br>動画" + methodString[i] + "のキャラクターについて何かコメントはありますか？<br>请问对视频" + methodString[i] + "中的人物有什么评论吗？";
        container.appendChild(intro1);

        container.appendChild(CreateCommentBlock(GeneralCommentIdArray[i], "e.g. The character seems not realistic. Because ... / The character seems realistic. Because ... このキャラクターはリアルに見えません。なぜなら... / このキャラクターはリアルに見えます。なぜなら... 人物的动作看起来不逼真，因为....../人物的动作看起来很逼真，因为......"));
    }

    return container;
}

function SetSubmitButton() {
    document.getElementById("submitButton").onclick = function () {
        if (!AlreadySubmitted) {
            EndTime = new Date();
            console.log("End At " + EndTime);
            let Duration = (EndTime - StartTime) / 1000;
            console.log("Duration = " + Duration);

            if (!IsConsentAllChecked()) {
                // alert to check all the consent information, if not all the checkbox are checked
                alert("Please Check all the checkbox in Consent. \n 同意のチェックボックスをすべて確認してください。\n 请阅读后勾选所有的同意事项。")
            }
            else if (document.getElementById("name").value == "" || document.getElementById("age").value == "") {
                // alert to input the name, if have not
                alert("Please input your name and age. \n おニックネームと年齢を入力してください。\n 请输入您的昵称和年龄。");
            }
            else if (document.getElementById("answer").value == "") {
                // alert to input the name, if have not
                alert("Please answer the question about 3D game and 3D animation. \n 3Dゲームと3Dアニメに関する質問に答えてください。 \n 请回答关于是否接触过3D游戏或3D动画的问题。");
            }
            else if (!IsAllVideoWatched()) {
                alert("Please watch the whole video before you answer the question. \n 動画を最後まで視聴してから質問に答えてください。 \n 请看完视频后再回答问题。");
            }
            else {
                SetCompleteCode();
                // set up content for csv file
                //let csvContent = "data:text/csv;charset=utf-8,";

                // input the participant's name
                let csvContent = "";
                csvContent += document.getElementById("name").value + "\r\n";
                csvContent += document.getElementById("gender").value + "\r\n";
                csvContent += document.getElementById("age").value + "\r\n";
                csvContent += document.getElementById("answer").value + "\r\n";
                csvContent += "Duration: \r\n" + Duration + "\r\n\r\n";
                csvContent += "Complete Code: \r\n" + CompleteCode + "\r\n\r\n";

                csvContent += "Natural Over all" + "\r\n";
                for (var i = 0; i < RealisticAllSliderIdArray.length; i++) {
                    const slider = document.getElementById(RealisticAllSliderIdArray[i]);
                    csvContent += slider.value + "\r\n";
                }

                csvContent += "\r\n";

                csvContent += "Natural Eye" + "\r\n";
                for (var i = 0; i < RealisticEyeSliderIdArray.length; i++) {
                    const slider = document.getElementById(RealisticEyeSliderIdArray[i]);
                    csvContent += slider.value + "\r\n";
                }

                csvContent += "\r\n";

                csvContent += "Natural Head" + "\r\n";
                for (var i = 0; i < RealisticHeadSliderIdArray.length; i++) {
                    const slider = document.getElementById(RealisticHeadSliderIdArray[i]);
                    csvContent += slider.value + "\r\n";
                }

                csvContent += "\r\n";

                csvContent += "Head eye coordinate" + "\r\n";
                for (var i = 0; i < HeadEyeCodSliderIdArray.length; i++) {
                    const slider = document.getElementById(HeadEyeCodSliderIdArray[i]);
                    csvContent += slider.value + "\r\n";
                }

                csvContent += "\r\n";

                csvContent += "Comment" + "\r\n";
                for (var i = 0; i < GeneralCommentIdArray.length; i++) {
                    csvContent += OrderAnonmyMethodNameStringArray[i] + ": " + document.getElementById(GeneralCommentIdArray[i]).value + "\r\n" + "\r\n";
                }

                csvContent += "General: " + document.getElementById("comment").value + "\r\n";

                ServerPostResult(Comb, csvContent);

                // alert("Please send the downloaded file to the owner of the questionnaire."); // information to send back the result
            }

        }
        else {
            alert("You already submitted. \n すでに提出しました。 \n 你已经成功提交了。");
        }

    }

}


var QuestionnaireIndex = 999;
let StartTime;
let EndTime;
let Comb;

let CompleteCode;
function generateTimeBasedCode() {
    return "MTURK-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substr(2, 5).toUpperCase();
}

function SetCompleteCode()
{
    CompleteCode = generateTimeBasedCode();
    document.getElementById("complete_code").innerHTML = "Survey Code: " + CompleteCode;
}

console.log(generateTimeBasedCode()); // 示例输出: "MTURK-LKR8G-7F1XZ"

function ServerGetResult() {
    // 使用 fetch 发送 GET 请求到 Flask 后端
    fetch('https://ex.haselab.net/lian_qserver/get_combination')
        .then(response => response.json())  // 解析响应为 JSON
        .then(data => {


            StartTime = new Date();
            console.log("Start at = " + StartTime);
            if (data.error) {
                console.error(data.error);
            } else {
                Comb = data.combination;
                console.log("Comb = " + Comb);
                const orderArray = Comb.map(item => MethodTypes.indexOf(item));
                console.log("OrderArray = " + orderArray);
                LoadVideoFromIndex(orderArray);
            }

        })
        .catch(error => console.error('Error:', error));
}

let AlreadySubmitted = false;

function ServerPostResult(combination, result)
{
    fetch(' https://ex.haselab.net/lian_qserver/collect-result', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            combination: combination,
            text: result
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            AlreadySubmitted = true;
            alert('Submit successfully! Thank you! \n 送信が成功しました！ありがとうございます！\n 提交成功，感谢您的参与！');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error submiting! Please try again. \n 送信エラーが発生しました！もう一度お試しください。\n 提交失败，请再次提交。');
        });
}

function LoadVideoFromIndex(OrderArray) {

    var contianer = document.getElementById("questionBlock")
    if (contianer != null) { document.removeChild(contianer); }
    const OrderVideoURLArray = OrderArrayWith(VideoURLArray, OrderArray);
    const OrderNaturalAllSliderIdArray = OrderArrayWith(RealisticAllSliderIdArray, OrderArray); 
    const OrderNaturalEyeSliderIdArray = OrderArrayWith(RealisticEyeSliderIdArray, OrderArray);
    const OrderNaturalHeadSliderIdArray = OrderArrayWith(RealisticHeadSliderIdArray, OrderArray);
    const OrderHeadEyeCodSliderIdArray = OrderArrayWith(HeadEyeCodSliderIdArray, OrderArray);
    const OrderGeneralCommentId = OrderArrayWith(GeneralCommentIdArray, OrderArray);
    OrderAnonmyMethodNameStringArray = OrderArrayWith(AnonmyMethodNameStringArray, OrderArray);
    // add elements for evaluation section
    document.body.insertBefore(CreateQuestionBlock("Videos will show the character's face and the first-person perspective of the character: <br>動画では、キャラクターの顔や一人称視点が表示されます。<br>视频会展示人物的面部特写及人物的第一人称视角：", OrderVideoURLArray, OrderNaturalAllSliderIdArray, OrderNaturalEyeSliderIdArray, OrderNaturalHeadSliderIdArray, OrderHeadEyeCodSliderIdArray, OrderGeneralCommentId, AnonmyMethodNameStringArray), CommentBlock);
    // 监听页面切换
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            // 页面不可见时，暂停所有视频
            VideolArray.forEach(video => video.pause());
        }
    });
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

// check whether all the checkbox in consent section are checked
function IsAllVideoWatched() {
    for (var i = 0; i < watchedCompleteArray.length; i++) {
        if (!watchedCompleteArray[i]) {
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

    sliderElement.addEventListener("input", function () {
        VideolArray.forEach(video => {
            video.pause(); // 其他视频暂停
        });
        const lastTwoDigits = sliderIdText.slice(-2);
        const index = MethodTypes.indexOf(lastTwoDigits);
        if (!watchedCompleteArray[index]) {
            if (sliderElement.value != 0) { 
                sliderElement.value = 0; // 强制回退
                alert("Please watch the whole video before you answer the question. \n 動画を最後まで視聴してから質問に答えてください。 \n 请看完视频后再回答问题。");
            }
        }
    });

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
    titleAtt.value = "Video player";
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
        const index = VideoURLArray.indexOf(videoURL);
        VideolArray[index] = video;


        // 确保视频不自动播放
        if (video) {
            video.autoplay = false;  // 禁止自动播放
        }

        video.addEventListener('play', function () {
            VideolArray.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause(); // 其他视频暂停
                }
            });
        });

        // 监听播放进度，防止快进
        video.addEventListener("timeupdate", function () {
            const index = VideoURLArray.indexOf(videoURL);
            if (!watchedCompleteArray[index]) {
                if (video.currentTime - videoProgressArray[index] > 1) { // 超过 1 秒误差
                    video.currentTime = videoProgressArray[index]; // 强制回退
                    alert("Please watch the whole video before you answer the question. \n 動画を最後まで視聴してから質問に答えてください。 \n 请看完视频后再回答问题。");
                } else {
                    videoProgressArray[index] = video.currentTime;
                }

                // 观看超过 95% 进度，解锁进度条和问卷
                if (video.currentTime >= video.duration * 0.95) {
                    watchedCompleteArray[index] = true;
                    videoProgressArray[index] = video.duration;
                    console.log("Video completed " + index);
                    
                }
            }
        });
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
