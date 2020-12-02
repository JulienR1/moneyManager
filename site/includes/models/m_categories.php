<?php

class m_categories extends DatabaseHandler
{

    public function getCategories()
    {
        $sql = "SELECT categories.id, title, iconUrl, color FROM categories, icons WHERE iconId = icons.id";
        return parent::query($sql);
    }

    public function getIcons()
    {
        $sql = "SELECT * FROM icons";
        return parent::query($sql);
    }

    public function saveNewCategory($title, $iconId, $colorHex)
    {
        $sql = "INSERT INTO categories (id, title, iconId, color) VALUES(NULL, ?, ?, ?)";
        return parent::query($sql, $title, $iconId, $colorHex);
    }

    public function updateCategory($categoryId, $newTitle, $newIconId, $colorHex)
    {
        $sql = "UPDATE categories SET title=?, iconId=?, color=? WHERE id=?";
        return parent::query($sql, $newTitle, $newIconId, $colorHex, $categoryId);
    }

    public function saveIcon($icon)
    {
        $sql = "INSERT INTO icons (id, iconUrl) VALUES(NULL, ?)";
        return parent::query($sql, $icon);
    }

}