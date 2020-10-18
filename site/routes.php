<?php

Route::set("index.php", function(){
    echo "home";
});

Route::set("new", function(){
    NewTransaction::CreateView("newTransaction");
});

// 404: Page not found
if (!in_array($_GET["url"], Route::$validRoutes)) {
    echo "404: page not found";
}