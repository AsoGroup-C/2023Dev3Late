<?php
//JSON形式で返却すること、文字形式がUTF-8だということの宣言

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=UTF-8');
class select_main
{
    function dbconnect()
    {
        $pdo = new PDO('mysql:host=localhost;dbname=traveroulette;charset=utf8','webuser','abccsd2');
    
        return $pdo;
    }
    
    //都道府県データ取得
    function get_prefectures($area_id)
    {
        $pdo = $this->dbconnect();
        $sql = 'SELECT prefecture_name FROM prefectures WHERE area_id = ?';
        $ps = $pdo->prepare($sql);
        $ps->bindValue(1, $area_id, PDO::PARAM_INT);
        $ps->execute();
        $prefecture_name = $ps->fetchAll();
    
        //配列の宣言（無いとエラーが発生した）
        $pre_data = array();
    
        //データベースから持ってきたデータをforeachを利用してデータの数だけ$com_dataに追加している
        foreach ($prefecture_name as $row) {
            array_push($pre_data, array(
                'prefecture_name' => $row['prefecture_name']
            ));
        }
        //arrayの中身をJSON形式に変換している
        $json_array = json_encode($pre_data);
    
        return $json_array;
    }

    //都道府県名からIDを索引
    public function verify_id($name)
    {
        $pdo = $this->dbConnect();
        $sql = 'SELECT prefecture_id FROM `prefectures` WHERE prefecture_name = ?';
        $ps = $pdo->prepare($sql);
        $ps->bindValue(1, $name, PDO::PARAM_STR);
        $ps->execute();
        $prefectureId = $ps->fetch(PDO::FETCH_COLUMN);

        echo json_encode($prefectureId);
    }
    
    function get_prefecturesArray()
    {
        $pre_array = array();
        
        for($i = 1;$i <= 7;$i++){
            array_push($pre_array, array(
                'prefectures' => $this->get_prefectures($i)
            ));
        }
    
        $json_array = json_encode($pre_array);
    
        print $json_array;
    }
}

?>