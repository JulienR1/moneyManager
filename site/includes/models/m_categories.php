<?php

class m_categories extends DatabaseHandler{

    public function getCategories(){
        $sql = "SELECT categories.id, title, iconUrl FROM categories, icons WHERE iconId = icons.id";
        return parent::query($sql);
    }

    public function getIcons(){
        $sql = "SELECT * FROM icons";
        return parent::query($sql);
    }

    public function saveNewCategory($title, $iconId){
        $sql = "INSERT INTO categories (id, title, iconId) VALUES(NULL, ?, ?)";
        return parent::query($sql, $title, $iconId);
    }

    public function updateCategory($categoryId, $newTitle, $newIconId){
        $sql = "UPDATE categories SET title=?, iconId=? WHERE id=?";
        return parent::query($sql, $newTitle, $newIconId, $categoryId);
    }

    public function saveIcon($icon){
        $sql = "INSERT INTO icons (id, iconUrl) VALUES(NULL, ?)";
        return parent::query($sql, $icon);
    }

}