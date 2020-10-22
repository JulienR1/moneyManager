<section id="category-section">
    <h2>Les catégories</h2>
    <ul>
        <?php echo static::getCategoriesHTML(); ?>

        <li>
            <input type="radio" id="category_new" name="category" value="new">
            <label for="category_new">
                <span><i class="fas fa-question"></i></span>
                <p>Nouvelle catégorie..</p>
            </label>
        </li>
    </ul>
</section>

<section id="edition-section">
    <form method="POST" autocomplete="off" onkeydown="return event.key != 'Enter';">
        <input type="text" name="title" placeholder="Nom">
        <ul>
            <?php echo static::getIconsHTML(); ?>
        </ul>
        <input type="text" id="id-input" name="categoryId">
    </form>
    <div>
        <a href="https://fontawesome.com/" target="_blank">Font Awesome</a>
        <form id="icon-form" method="POST" autocomplete="off">
            <input type="text" name="newIcon" id="newIconInput" placeholder="Saisir nouvel icône">
            <label for="newIconInput"><button type="submit"><i class="fas fa-plus"></i></button></label>
        </form>
    </div>
</section>