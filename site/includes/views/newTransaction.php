<?php
date_default_timezone_set("America/Toronto");
?>

<?php
if (isset($_GET["error"])) {
    echo "<p>";
    switch ($_GET["error"]) {
        case "emptyfields":
            echo "Erreur: Renseigner tous les champs";
            break;
        case "invaliddate":
            echo "Erreur: Renseigner une date valide";
            break;
        case "save":
            echo "Une erreur est survenue au cours de l'enregistrement";
            break;
    }
    echo "</p>";
}
?>

<form action="#" method="POST" autocomplete="off" enctype="multipart/form-data" toggled>
    <section id="title-section">
        <span>Revenu</span>
        <?php include "includes/views/userControls/toggle.php";?>
        <span>Dépense</span>
    </section>

    <section id="general-section">
        <h2>Informations générales</h2>
        <div id="wrapper">
            <div>
                <div class="iconInput">
                    <input type="text" id="title" name="title" placeholder="Titre">
                    <span><i class="fas fa-signature"></i></span>
                </div>
                <div class="iconInput">
                    <input onclick="toggleDatePicker(event)" type="text" id="dateField" name="date" value="<?php echo date("Y-m-d"); ?>">
                    <span><i class="fas fa-calendar-day"></i></span>
                </div>
            </div>
            <div>
                <div class="iconInput">
                    <label for="proofStr">Sélectionner un fichier</label>
                    <input type="file" name="proof" id="proofStr" accept="image/*;capture=camera">
                    <span><i class="fas fa-file-import"></i></span>
                </div>
                <div class="iconInput">
                    <input id="amount" type="number" min="0" step="0.01" placeholder="100.00" name="cost">
                    <span><i class="fas fa-dollar-sign"></i></span>
                </div>
            </div>
        </div>
    </section>

    <section id="category-section">
        <h2>Catégorie</h2>
        <ul>
            <?php echo static::getCategoriesHTML(); ?>
        </ul>
        <div>
            <a href="/categories">Ajouter</a>
        </div>
    </section>

    <section id="save-section">
        <button disabled type="submit" name="save-button">Enregistrer</button>
    </section>

    <?php require "includes/views/userControls/datepicker.php";?>
</form>