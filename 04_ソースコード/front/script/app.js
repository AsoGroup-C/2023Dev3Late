var Mode = {
    waiting: 0,
    acceleration: 1,
    constant: 2,
    deceleration: 3,
    result: 4
};
var mode = Mode.waiting;
var nameList = [];
var probabilityList = [];
var colorList = [];
var ratioSum = 0;
var speed = 0.0;
var theta = 0.0;
var len = 0;
var resultDisplayed = false;

const ACCEL = 0.01;
const DECEL = 0.01;
const MAX_SPEED = 1.0;
const RADIUS = 100;
const COLOR_ADJ = 0.4;
const TRIANGLE_SIZE = 10;
const MARGIN = 10;
const DECEL_RAND_LEVEL = 10;
const DECEL_RAND_MAGNITUDE = 0.001;

var holding = false;

function getRandomInt(min, max) {
  return min+Math.floor(Math.random() * Math.floor(max-min));
}

function preload(){
    
}

function setup(){
    var canvas = createCanvas(600,500);
    canvas.parent('canvas');
    textSize(20);
    stroke(0,0,0);
    fill(0,0,0);
    background(255,255,255);
    recalculate();
    dataFetch();
}

function mousePressed(){
    holding = true;
    
}

function mouseReleased() {
    holding = false;

}

function touchStarted(){
    mousePressed();
}

function touchEnded(){
    mouseReleased();
}

//都道府県名からIDを照合する
function prefectureVerify(prefecture_name){
    let prefectures = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];
    let index = prefectures.indexOf(prefecture_name);
    if (index !== -1) {
        return index+1;
    } else {
        console.log('見つかりませんでした。');
    }
}

//set color indicator
function cssColorSet(){//htmlに色の変更を指定する関数
    var counter = 0;
    $('.color-indicator').each(function(){//それぞれの色を表示するクラス（color-indicator）に対し
        push();
        colorMode(HSL, 255);//カラーモードをHSLに変更
        var c = color(colorList[counter],255-COLOR_ADJ*colorList[counter],128);//色相環が一周してしまったときの為に彩度を変更する処理
        pop();
        $(this).css('background-color', "rgb("+c._getRed()+","+c._getGreen()+","+c._getBlue()+")");//_get○○でRGBを取得
        counter++;
    });
}

//input to array
function dataFetch(){//データ取得
    ratioSum = 0.0;
    $('.item').each(function(){//ratioクラスのvalueを取得、加算
        var ratio = $(this).find('.ratio').val()-0;
        ratioSum += ratio;
    });
    nameList = [];
    probabilityList = [];
    $('.item').each(function(){//項目名を取得、構成割合を取得し、配列にpush
        var name = $(this).find('.name').val();
        var ratio = $(this).find('.ratio').val()-0;
        nameList.push(name);
        probabilityList.push(ratio/ratioSum);
    });
    //color
    var colors = [];
    len = nameList.length;//要素数
    for(var i=0;i<len;i++){//色相環を要素数で等分している（境目を認知しやすくするため）
        colors.push(Math.floor(255/len*i));
    }
    colorList = [];
    if(len%2==0){//偶数の項目に色相環の右半分の色を割り当てる
        for(var i=0;i<len;i+=2){
            colorList[i] = colors[Math.floor(i/2)];
        }
        for(var i=1;i<len;i+=2){
            colorList[i] = colors[Math.floor(i/2 + len/2)];
        }
    }else{//奇数の項目に色相環の左半分の色を割り当てる
        for(var i=0;i<len;i+=2){
            colorList[i] = colors[Math.floor(i/2)];
        }
        for(var i=1;i<len;i+=2){
            colorList[i] = colors[Math.floor(i/2)+Math.floor(len/2)+1];
        }
    }
    cssColorSet();
}

function validation(){
    var badflag = false;
    $('.name').each(function(){
        if($(this).val()==""){//値の存在チェック
            badflag = true;
        }
    });
    $('.ratio').each(function(){//値が0以上か
        if(!($(this).val()>0)){
            badflag = true;
        }
    });
    if(badflag){//上記二つのどちらかでも当てはまればアラート表示
        alert('項目名と割合を正しく設定してください。');
        return 1;
    }
    return 0;
}

function start(){
    if(mode==Mode.waiting){
        if(validation()==1){
            return;
        }
        $('#stop').css('display', 'inline-block');
        $('#start').css('display', 'none');
        dataFetch();
        mode = Mode.acceleration;
    }
}

function stop(){
    if(//mode==Mode.acceleration || //加速中でもストップボタンを効かせるにはコメントアウト
       mode==Mode.constant){
        $('#start').css('display', 'none');
        $('#stop').css('display', 'none');
        mode = Mode.deceleration;
    }
}

function reset(){
    $('#start').css('display', 'inline-block');
    $('#stop').css('display', 'none');
    theta = 0.0;
    speed = 0.0;
    mode = Mode.waiting;
    if(validation()==0){
        dataFetch();
    }
    $('#result').html('????');
    resultDisplayed = false;
}

function drawRoulette(){
    var angleSum = 0.0;
    push();
    colorMode(HSL, 255);
    for(var i=0;i<len;i++){
        fill(colorList[i],255-COLOR_ADJ*colorList[i],128);//色の設定
        arc(0,0,RADIUS*2,RADIUS*2,angleSum,angleSum+2*PI*probabilityList[i]);//各要素（円弧）の大きさを自動計算
        angleSum += probabilityList[i]*2*PI;
    }
    pop();
}

function drawRouletteWithText() {
    var angleSum = 0.0;
    push();
    colorMode(HSL, 255);
    for (var i = 0; i < len; i++) {
        fill(colorList[i], 255 - COLOR_ADJ * colorList[i], 185);
        var startAngle = angleSum;
        angleSum += probabilityList[i] * 2 * PI;
        var endAngle = angleSum;
        var midAngle = (startAngle + endAngle) / 2;

        // arc()で描画された円弧の中心座標を計算
        var centerX = RADIUS * cos(midAngle);
        var centerY = RADIUS * sin(midAngle);

        // arc()で描画
        var arcRadius = RADIUS * 3.5;
        arc(0, 0, arcRadius, arcRadius, startAngle, endAngle);

        // 対応する要素のテキストを描画
        textAlign(CENTER, CENTER);
        fill(0, 0, 0);
        textSize(32); // テキストサイズ（適宜変更してください）

        // 回転を適用
        push();
        translate(centerX, centerY);
        rotate(midAngle);

        // テキストを描画
        text(nameList[i], 0, 0);

        // 回転を元に戻す
        pop();
    }
    pop();
}

function goBack() {
    window.history.back();
}



function draw(){
    fill(255,255,255);//背景色指定
    // rect(0,0,width,height);
    translate(width/2, height/2);//cavasの中心を指定

    fill(255,0,0);
    push();
    translate(0, -RADIUS*1.8-MARGIN);
    triangle(0, 0, -TRIANGLE_SIZE/2*2, -TRIANGLE_SIZE*2, TRIANGLE_SIZE/2*2, -TRIANGLE_SIZE*2);
    pop();

    switch(mode){//ルーレットを動かす上での場合分け
    case Mode.waiting:
        break;
    case Mode.acceleration:
        if(speed<MAX_SPEED){
            speed += ACCEL;
        }else{
            mode = Mode.constant;
            speed = MAX_SPEED;
        }
        theta += speed;
        theta-=(Math.floor(theta/2/PI))*2*PI;
        rotate(theta);
        break;
    case Mode.constant:
        theta += speed;
        theta-=(Math.floor(theta/2/PI))*2*PI;
        rotate(theta);
        break;
    case Mode.deceleration:
        if(speed>DECEL){
            speed -= DECEL+getRandomInt(-DECEL_RAND_LEVEL,DECEL_RAND_LEVEL)*DECEL_RAND_MAGNITUDE;
        }else{
            speed = 0.0;
            mode = Mode.result;
        }
        theta += speed;
        theta-=(Math.floor(theta/2/PI))*2*PI;
        rotate(theta);
        break;
    case Mode.result:
        rotate(theta);
        if(!resultDisplayed){
            resultDisplayed = true;
            var angleSum = theta;
            var beforeAngleSum = theta;
            var result = 0;
            for(var i=0;i<len;i++){
                angleSum += probabilityList[i]*2*PI;
                if((angleSum>3/2*PI&&beforeAngleSum<3/2*PI) || (angleSum>7/2*PI&&beforeAngleSum<7/2*PI)){
                    result = i;
                    break;
                }
                beforeAngleSum = angleSum;
            }
            $('#result').html(nameList[result]);
            $('#introduction').html('<h3><a href="../src/betterAttractions.html?prefecture_id='+prefectureVerify(nameList[result])+'">'+nameList[result]+'のおすすめスポットを見る</a></h3>');
            console.log(this.prefectureVerify(nameList[result]));
        }
        break;
    }
    drawRouletteWithText()
}