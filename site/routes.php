<?php

Route::set("index.php", function(){
    header("Location: /analytics");
    eixt();
});

Route::set("analytics", function(){
    echo "analytics";
});

Route::set("new", function(){
    NewTransaction::CreateView("newTransaction");
});

Route::set("categories", function(){
    echo "categories";
});

// 404: Page not found
if (!in_array($_GET["url"], Route::$validRoutes)) {
    echo "404: page not found";
}