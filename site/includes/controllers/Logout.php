<?php

class Logout extends Controller
{

    public static function CreateView($viewName)
    {
        if ($_SESSION["connected"]) {
            session_destroy();
            header("Refresh:0");
            exit();
        }

        self::CreateInfo();
        parent::CreateView($viewName);
    }

    private static function CreateInfo()
    {
        parent::$info = new PageInfo();
        parent::$info->setTitle("MM | Déconnexion");
        parent::$info->setCss("logout/logout.css");
    }
}