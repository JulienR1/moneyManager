<?php

session_start();

if (!isset($_SESSION["connected"]) || !$_SESSION["connected"]) {
    $_SESSION["connected"] = false;
    if ($_GET["url"] != "login" && $_GET["url"] != "logout") {
        header("Location: /login");
        exit();
    }
}

Route::set("index.php", function () {
    header("Location: /analytics");
    exit();
});

Route::set("login", function () {
    Login::CreateView("login");
});

Route::set("logout", function () {
    Logout::CreateView("logout");
});

Route::set("analytics", function () {
    Analytics::CreateView("analytics");
});

Route::set("new", function () {
    NewTransaction::CreateView("newTransaction");
});

Route::set("categories", function () {
    Categories::CreateView("categories");
});

// 404: Page not found
if (!in_array($_GET["url"], Route::$validRoutes)) {
    echo "404: page not found";
}