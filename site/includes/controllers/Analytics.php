<?php

class Analytics extends Controller {

    public static function CreateView($viewName)
    {        
        self::CreateInfo();
        parent::CreateView($viewName);
    }

    private static function CreateInfo()
    {
        parent::$info = new PageInfo();
        parent::$info->setTitle("MM | Stats!");
    }
}