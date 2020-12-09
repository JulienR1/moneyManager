<?php

class Controller
{
    public static $info;
    public static $importFileVersion = 4;

    public static function CreateView($viewName)
    {
        require_once "includes/views/header.php";
        require_once "includes/views/$viewName.php";
        require_once "includes/views/footer.php";
    }
}