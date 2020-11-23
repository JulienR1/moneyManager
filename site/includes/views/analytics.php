<section id="dateSelection">
    <form>
        <!-- TODO: Remplacer par datepicker -->
        <input type="text" name="startDate" id="startDate" value="<?php echo date('Y-m-01'); ?>">
        <input type="text" name="endDate" id="endDate" value="<?php echo date("Y-m-t");?>">
        <button>Reload data</button>
    </form>
</section>

<section id="pieSection">
    <div>
        <h3>Transactions par catégorie</h3>
        <canvas id="categorySumChart"></canvas>
    </div>
    <div>
        <h3>Total par catégorie</h3>
        <canvas id="categoryAmountChart"></canvas>
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