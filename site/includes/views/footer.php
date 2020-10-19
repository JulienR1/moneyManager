</main>

<script src="js/overlayManager.js"></script>
<?php
    foreach(static::$info->jsFiles as $file){
        echo '<script src="js/'.$file.'"></script>';
    }
?>

</body>
</html>