<div id="datePicker">
    <div id="pickerHeader">
        <button onclick="previousMonth()">
            <i class="fas fa-caret-left"></i>
        </button>
        <h3>20 mars 2020</h3>
        <button onclick="nextMonth()">
            <i class="fas fa-caret-right"></i>
        </button>
    </div>
    <div id="calendar">
        <?php 
            for($row = 0; $row < 6; $row++){
                echo "<ul>";
                for($col = 0; $col < 7; $col++){
                    echo "<li><span></span></li>";
                }
                echo "</ul>";
            }
        ?>
    </div>
    <button onclick="closePicker()">Fermer</button>
</div>