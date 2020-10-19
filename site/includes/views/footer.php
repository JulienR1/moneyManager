</main>

<?php
    foreach(static::$info->jsFiles as $file){
        echo '<script src="js/'.$file.'"></script>';
    }
?>

</body>
</html>