<section>
    <h3>Connexion</h3>

    <?php
if (isset($_GET["e"])) {
    if ($_GET["e"] === "credentials") {
        echo '<p>Le nom d\'utilisateur et le mot de passe sont invalides</p>';
    } else if ($_GET["e"] === "nofields") {
        echo '<p>Veuillez saisir tous les champs</p>';
    } else if ($_GET["e"] === "mail") {
        echo '<p>Veuillez saisir une adresse courriel valide</p>';
    } else {
        echo '<p>Une erreur est survenue</p>';
    }
}
?>

    <form method="POST">
        <input type="text" id="username" name="username" placeholder="Adresse courriel">
        <input type="password" id="password" name="password" placeholder="Mot de passe">
        <button type="submit" name="connection-button">Se connecter</button>
    </form>
</section>