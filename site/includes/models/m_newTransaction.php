<?php

class m_newTransaction extends DatabaseHandler {

    public function getCategories(){
        $sql = "SELECT * FROM categories";
        return parent::query($sql);
    }

    public function saveImg($dateStr){
        if(!empty($_FILES["proof"]["name"])){
            
            $targetDir = "files/" . date("Y", strtotime($dateStr)) . "/";
            if(!is_dir($targetDir)){
                mkdir($targetDir);
            }
            $targetDir .= date("m", strtotime($dateStr)) . "/";
            if(!is_dir($targetDir)){
                mkdir($targetDir);
            }

            $file = $_FILES["proof"]["name"];
            $path = pathinfo($file);
            $filename = $dateStr . date("_His");
            $extension = $path["extension"];
            $tempName = $_FILES["proof"]["tmp_name"];

            $fullpath = $targetDir.$filename.".".$extension;

            if(file_exists($fullpath)){
                return false;
            }else{
                move_uploaded_file($tempName, $fullpath);
                return $fullpath;
            }
        }
        return null;
    }

    public function saveTransaction($title, $dateStr, $proofStr, $cost, $categoryId, $isIncome){
        $categoryIdVerificationSql = "SELECT * FROM categories WHERE id=?";
        $resultTable = parent::query($categoryIdVerificationSql, $categoryId);
        if($resultTable != null && sizeof($resultTable) > 0){
            $saveSql = 'INSERT INTO transactions
                        (id, title, amount, transactionDate, proofSrc, categoryId, isIncome)
                        VALUES (NULL,?,?,?,?,?,?)';
            return parent::query($saveSql, $title, $cost, $dateStr, $proofStr, $categoryId, $isIncome);
        }
        return false;
    }

}