<?php
date_default_timezone_set("America/Toronto");
?>

<form action="" method="POST" autocomplete="off" toggled>
    <section id="title-section">
        <span>Revenu</span>
        <?php include "includes/views/userControls/toggle.php"; ?>
        <span>Dépense</span>
    </section>

    <section id="general-section">
        <h2>Informations générales</h2>
        <div id="wrapper">
            <div>
                <div class="iconInput">
                    <input type="text" name="title" placeholder="Titre">
                    <span><i class="fas fa-signature"></i></span>
                </div>
                <div class="iconInput">
                    <input onclick="toggleOn(event)" type="text" id="dateField" name="date" value="<?php echo date("Y-m-d"); ?>">
                    <span><i class="fas fa-calendar-day"></i></span>                    
                </div>
            </div>
            <div>
                <div class="iconInput">
                    <label for="proof">Sélectionner un fichier</label>
                    <input type="file" name="proof" id="proof" accept="image/png, image/jpeg">
                    <span><i class="fas fa-file-import"></i></span>
                </div>
                <div class="iconInput">
                    <input type="number" min="0" step="0.01" placeholder="100.00" name="cost">
                    <span><i class="fas fa-dollar-sign"></i></span>
                </div>
            </div>
        </div>
    </section>

    <section id="category-section">
        <h2>Catégorie</h2>
        <ul>
            <li>
                <input type="radio" id="category1" name="category[]">
                <label for="category1">
                    <span><i class="fas fa-dollar-sign"></i></span>
                    <p>Nourriture</p>
                </label>                
            </li>
            <li>
                <input type="radio" id="category2" name="category[]">
                <label for="category2">
                    <span><i class="fas fa-dollar-sign"></i></span>
                    <p>Nourriture</p>
                </label>                
            </li>
            <li>
                <input type="radio" id="category3" name="category[]">
                <label for="category3">
                    <span><i class="fas fa-dollar-sign"></i></span>
                    <p>Nourriture</p>
                </label>                
            </li>
            <li>
                <input type="radio" id="category4" name="category[]" selected>
                <label for="category4">
                    <span><i class="fas fa-dollar-sign"></i></span>
                    <p>Nourriture</p>
                </label>
            </li>
            <li>
                <input type="radio" id="category5" name="category[]">
                <label for="category5">
                    <span><i class="fas fa-dollar-sign"></i></span>
                    <p>Nourriture</p>
                </label>                
            </li>
            <li>
                <input type="radio" id="category6" name="category[]">
                <label for="category6">
                    <span><i class="fas fa-dollar-sign"></i></span>
                    <p>Nourriture</p>
                </label>                
            </li>
            <li>
                <input type="radio" id="category7" name="category[]">
                <label for="category7">
                    <span><i class="fas fa-dollar-sign"></i></span>
                    <p>Nourriture</p>
                </label>                
            </li>
        </ul>
        <div>
            <a href="/categories">Ajouter</a>
        </div>
    </section>

    <section id="save-section">
        <button disabled type="submit" name="save-button">Enregistrer</button>

    </section>

    <?php require "includes/views/userControls/datepicker.php"; ?>
</form>

<script>

document.addEventListener("DOMContentLoaded",()=>{
    let parent = $("#dateField");
    let offset = parent.offset();
    let picker = $("#datePicker");

    offset.top += 2 * parent.height();
    offset.left -= picker.width() / 2 - parent.width() / 2;
    picker.offset(offset);

    addCallback(function(){
        document.querySelector("form").toggleAttribute("toggled");
    });
});

function toggleOn(event){
    event.preventDefault();
    event.stopPropagation();

    let dateStr = document.getElementById("dateField").value;
    togglePicker(dateStr, (data)=>{
        month = ((data.getMonth() + 1).toString().length == 1 ? "0" : "") + (data.getMonth() + 1);
        day = ((data.getDate() + 1).toString().length == 1 ? "0" : "") + data.getDate();
        data = data.getFullYear() + "-" + month + "-" + day;
        document.getElementById("dateField").value = data;
    });
}

</script>

<script src="js/fileUpload.js"></script>