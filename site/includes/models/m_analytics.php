<?php

class m_analytics extends DatabaseHandler{

    public function LoadAllData($startDate, $endDate){
        $sql = 'SELECT transactionDate, transactions.title, amount, proofSrc, iconUrl, isIncome
                FROM transactions, categories, icons
                WHERE categoryId = categories.id AND iconId = icons.id AND transactionDate BETWEEN ? AND ?
                ORDER BY transactionDate ASC';
        return parent::query($sql, $startDate, $endDate);
    }

}