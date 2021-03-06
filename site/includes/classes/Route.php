<?php

class Route
{

    public static $validRoutes = array();

    public static function set($route, $callback)
    {
        self::$validRoutes[] = $route;

        if ($_GET["url"] == $route) {
            $_SESSION["currentPage"] = $route . "/" . $_GET["subpage"];
            $callback->__invoke();
        }
    }
}