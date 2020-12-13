<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
    <link rel="manifest" href="assets/site.webmanifest">

    <title><?php echo static::$info->title; ?></title>

    <?php
foreach (static::$info->libraries as $lib) {
    echo '<script src="' . $lib . '"></script>';
}
?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/df8eedba6f.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="css/general/general.css?v=<?php echo static::$importFileVersion; ?>">
    <link rel="stylesheet" href="css/general/header.css?v=<?php echo static::$importFileVersion; ?>">

    <?php
foreach (static::$info->cssFiles as $file) {
    echo '<link rel="stylesheet" href="css/' . $file . '?v=' . static::$importFileVersion . '">';
}
?>
</head>

<body>

    <header>
        <div id="logo">
            <a href="/"><img src="assets/android-chrome-512x512.png" alt="MM"></a>
        </div>

        <?php
if (!isset($_SESSION["connected"]) || !$_SESSION["connected"]) {
    echo '<ul><li><a href="login">Se connecter</a></li></ul>';
    echo "</header><main>";
    return;
}
?>

        <ul>
            <li><a href="/analytics">Stats</a></li>
            <li><a href="/new">Ajouter</a></li>
            <li><a href="/categories">Catégories</a></li>
            <li>
                <div id="img-container">
                    <img src="files/profiles/<?php echo $_SESSION["img"] == null ? "default_profile.jpg" : $_SESSION["img"]; ?>">
                </div>
                <a href="logout">Déconnexion</a>
            </li>
        </ul>
    </header>

    <header id="cell-disconnect">
        <div>
            <div id="img-container">
                <img src="files/profiles/<?php echo $_SESSION["img"] == null ? "default_profile.jpg" : $_SESSION["img"]; ?>">
            </div>
            <a href="logout">Déconnexion</a>
        </div>
    </header>

    <main>