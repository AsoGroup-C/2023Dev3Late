<?php
    require_once "../dao/prefecturesDAO.php";
    $dbm = new select_main();

    try{
        $dbm->verify_id($_GET["prefecture_id"]);
        
    }catch(Exception $e){
        $errorMessage = $e->getMessage();
        echo "エラーメッセージ: $errorMessage";
    }
?>