<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?php echo static::$info->title; ?></title>

    <script src="https://kit.fontawesome.com/df8eedba6f.js" crossorigin="anonymous"></script>

    <?php
    foreach (static::$info->cssFiles as $file) {
        echo '<link rel="stylesheet" href="css/' . $file . '">';
    }
    ?>
</head>
<body>

<main>