<?php
    require_once "../dao/prefecturesDAO.php";
    $dbm = new select_main();

    try{
        $dbm->get_attractions($_GET["prefecture_id"]);
    
    }catch(Exception $e){
        $errorMessage = $e->getMessage();
        echo "エラーメッセージ: $errorMessage";
    }
?>