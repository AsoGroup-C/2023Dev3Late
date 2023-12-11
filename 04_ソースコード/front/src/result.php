<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <!-- bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <title>p5.js</title>
</head>
<body>
    <div id="app">
        <div class="app text-center">
            <img  @click="redirectTo('index')" src="../assets/img/aicon2.png" alt="アイコン" class="img-fluid mx-auto" width="40" height="40">
        </div>
        <hr class="bg-secondary">
    </div>

    <script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"></script>
    <script src="../script/p5.min.js"></script>
    <script src="../script/app.js"></script>
    <style>
    .p5Canvas{
        max-width: 600px;
        width: 100% !important;
        height: auto !important;
    }
    </style>
    <div id="canvas"></div>
    <div class="text-center">
        <button type="button" id="reset" onclick="reset()">リセット</button>
        <button type="button" id="start" onclick="start()">スタート！</button>
        <button type="button" id="stop" onclick="stop()" style="display:none;">ストップ！</button>
    </div>

    <h2 class="text-center">結果</h2>
    <p id="result">????</p>

    <div id="table" style="display: none;">
        <h2>ルーレット設定</h2>
        <div>
            <h3>項目名と割合</h3>
            <table>
                <?php
                    $prefecture_Array=preg_split("/[,]/", $_POST['selected']);
                    foreach($prefecture_Array as $c_ele){
                        echo "<tr class='item'>
                                <td>
                                    <div class='color-indicator' style='background-color:#000000;'></div>
                                </td>
                                <td>
                                    <input type='text' class='name' value='".$c_ele."'>
                                </td>
                                <td>
                                    <input type='number' class='ratio' value='1'
                                <td class='probability'></td>
                                <td>
                                    <button type='button' onclick='rmItem(this)'>削除</button>
                                </td>
                            </tr>";
    
                    }
                ?>
            </table>
        </div>
    </div>

    <style>
    .color-indicator{
        width: 10px;
        height: 10px;
    }
    #result{
        font-size: 40px;
        font-weight: bold;
        text-align: center;
    }
    </style>

    <script>
        function recalculate(){
            var ratioSumJs = 0;
            $('.ratio').each(function(){
                ratioSumJs += $(this).val()-0;
            });
            $(".item").each(function(){
                var probability = ($(this).find(".ratio").first().val()-0) / ratioSumJs;
                probability*=100;
                probability = probability.toFixed(3);
                $(this).children(".probability").first().html(probability+"%");
            });
        }
        $('.add').click(function(){
            var add = '<tr class="item"><td><div class="color-indicator" style="background-color:#000000;"></div></td><td><input type="text" class="name" value="項目"></td><td><input type="number" class="ratio" value="1"></td><td class="probability"></td><td><button type="button" onclick="rmItem(this)">削除</button></td></tr>';
            $('#table').append(add);
            recalculate();
            if(mode==Mode.waiting){
                dataFetch();
            }
        });
        function rmItem(e){
            if($('.ratio').length>2){
                $(e).parent().parent().remove();
                recalculate();
            }
            if(mode==Mode.waiting){
                dataFetch();
            }
        }
        $('#table').on('change', '.ratio', function(){
            recalculate();
            if(mode==Mode.waiting){
                dataFetch();
            }
        });
    </script>
    <!-- bootstrap js -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <!-- vue.jsのCDN -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <!-- JSONを扱うためのCDN -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- JSの読み込み -->
    <script src="../script/script.js"></script>
</body>
</html>