</main>

<script src="js/overlayManager.js?v=<?php echo static::$importFileVersion; ?>"></script>
<script src="js/utilities.js?v=<?php echo static::$importFileVersion; ?>"></script>
<?php
foreach (static::$info->jsFiles as $file) {
    echo '<script src="js/' . $file . '?v=' . static::$importFileVersion . '"></script>';
}
?>

</body>

</html>