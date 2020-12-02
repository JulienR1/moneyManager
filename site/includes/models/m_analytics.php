<?php

class m_analytics extends DatabaseHandler
{

    public function LoadAllData($startDate, $endDate)
    {
        $sql = 'SELECT transactionDate, transactions.title, amount, proofSrc, iconUrl, color, isIncome
                FROM transactions, categories, icons
                WHERE categoryId = categories.id AND iconId = icons.id AND transactionDate BETWEEN ? AND ?
                ORDER BY transactionDate ASC';
        return parent::query($sql, $startDate, $endDate);
    }

    public function LoadCategoryData($startDate, $endDate)
    {
        $sql = 'SELECT categoryId, SUM(amount) AS total, COUNT(amount) AS count, isIncome, categories.title, iconUrl, color
                FROM transactions, categories, icons
                WHERE categoryId = categories.id AND iconId = icons.id AND transactionDate BETWEEN ? AND ?
                GROUP BY categoryId, isIncome
                ORDER BY categoryId';
        return parent::query($sql, $startDate, $endDate);
    }

    public function GetSummaryData($startDate, $endDate)
    {
        $sql = 'SELECT SUM(amount) AS total, COUNT(amount) AS count, isIncome
                FROM transactions
                WHERE transactionDate BETWEEN ? AND ?
                GROUP BY isIncome
                ORDER BY isIncome';
        return parent::query($sql, $startDate, $endDate);
    }

}