<section id="dateSelection">
    <form>
        <div class="iconInput">
            <label for="startDate"><i class="fas fa-calendar-day"></i></label>
            <input onclick="toggleDatePicker(event)" type="submit" id="startDate" name="startDate" value="<?php echo date("Y-m-01"); ?>">
        </div>
        <div class="iconInput">
            <label for="endDate"><i class="fas fa-calendar-check"></i></label>
            <input onclick="toggleDatePicker(event)" type="submit" id="endDate" name="endDate" value="<?php echo date("Y-m-t"); ?>">
        </div>
        <?php require "includes/views/userControls/datepicker.php";?>
    </form>
</section>

<section id="pieSection">
    <div id="no-data-msg">
        <p>Aucune donnée sauvegardée</p>
    </div>
    <div class="pie-container">
        <h3>Transactions par catégorie</h3>
        <canvas id="categorySumChart"></canvas>
    </div>
    <div class="pie-container">
        <h3>Total par catégorie</h3>
        <canvas id="categoryAmountChart"></canvas>
    </div>
    <div id="chartjs-tooltip">
        <table></table>
    </div>
</section>

<section id="list">
    <table>
        <tbody>
            <tr>
                <th>
                    <div class="title">Date</div>
                    <div class="filter" dataset="date" state="0">
                        <i class="fas fa-sort-up"></i>
                        <i class="fas fa-sort-down"></i>
                    </div>
                </th>
                <th>
                    <div class="title">Transaction</div>
                    <div class="filter" dataset="transaction" state="0">
                        <i class="fas fa-sort-up"></i>
                        <i class="fas fa-sort-down"></i>
                    </div>
                </th>
                <th>
                    <div class="title">Montant</div>
                    <div class="filter" dataset="amount" state="0">
                        <i class="fas fa-sort-up"></i>
                        <i class="fas fa-sort-down"></i>
                    </div>
                </th>
                <th>
                    <div class="title">Catégorie</div>
                    <div class="filter" dataset="category" state="0">
                        <i class="fas fa-sort-up"></i>
                        <i class="fas fa-sort-down"></i>
                    </div>
                </th>
            </tr>
        </tbody>
    </table>
</section>