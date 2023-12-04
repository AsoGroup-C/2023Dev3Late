<?php
    require_once "../dao/prefecturesDAO.php";
    $dbm = new select_main();

    try{
        $dbm->get_prefecturesArray();
        
    }catch(Exception $e){
        $errorMessage = $e->getMessage();
        echo "エラーメッセージ: $errorMessage";
    }
?>