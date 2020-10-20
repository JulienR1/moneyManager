<?php

class NewTransaction extends Controller{

    public static function CreateView($viewName)
    {
        self::CreateInfo();
        parent::CreateView($viewName);
    }

    private static function CreateInfo()
    {
        parent::$info = new PageInfo();
        parent::$info->setTitle("MM | Ajouter une transaction");
        parent::$info->setCss("userControls/datePicker/datePicker.css", "newTransaction/newTransaction.css", "userControls/toggle/toggle.css");
        parent::$info->setJs("userControls/datePicker.js","userControls/toggle.js");
    }

}