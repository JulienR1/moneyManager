<?php

class NewTransaction extends Controller
{

    static $model;
    private static $categories;

    public static function CreateView($viewName)
    {
        self::$model = new m_newTransaction();
        self::CheckForFormInputs();

        self::$categories = (new m_categories())->getCategories();
        self::CreateInfo();
        parent::CreateView($viewName);
    }

    private static function CreateInfo()
    {
        parent::$info = new PageInfo();
        parent::$info->setTitle("MM | Ajouter une transaction");
        parent::$info->setCss("userControls/datePicker/datePicker.css", "newTransaction/newTransaction.css", "userControls/toggle/toggle.css");
        parent::$info->setJs("userControls/datePicker.js", "userControls/toggle.js", "newTransaction/newTransactionFormChecker.js", "fileUpload.js", "userControls/datePickerManager.js");
    }

    public static function GetCategoriesHTML()
    {
        if (self::$categories == null) {
            return "";
        }

        $html = "";
        for ($i = 0; $i < sizeof(self::$categories); $i++) {
            $html .= "<li>";
            $html .= '<input type="radio" id="category' . $i . '" name="category" value="' . self::$categories[$i]["id"] . '">';
            $html .= '<label for="category' . $i . '">';
            $html .= '<span><i class="' . self::$categories[$i]["iconUrl"] . '"></i></span>';
            $html .= "<p>" . self::$categories[$i]["title"] . "</p>";
            $html .= "</label></li>";
        }
        return $html;
    }

    private static function CheckForFormInputs()
    {
        if (isset($_POST["save-button"])) {
            self::ManageFormInputs();
        }
    }

    private static function ManageFormInputs()
    {
        $isIncome = (isset($_POST["toggleInput"]) && $_POST["toggleInput"] == "on") ? 0 : 1;
        $title = isset($_POST["title"]) ? $_POST["title"] : null;
        $dateStr = isset($_POST["date"]) ? $_POST["date"] : null;
        $cost = isset($_POST["cost"]) ? $_POST["cost"] : null;
        $categoryId = isset($_POST["category"]) ? $_POST["category"] : null;

        if ($title == null || $dateStr == null || $cost == null || $categoryId == null) {
            header("Location: /new?error=emptyfields");
            exit();
        }

        if (!preg_match("/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/", $dateStr)) {
            header("Location: /new?error=invaliddate");
            exit();
        }

        $success = false;
        $fileSrc = self::$model->saveImg($dateStr);
        if ($fileSrc !== false) {
            if (self::$model->saveTransaction($title, $dateStr, $fileSrc, $cost, $categoryId, $isIncome)) {
                header("Location: /analytics");
                exit();
            }
        }

        header("Location: /new?error=save");
        exit();
    }
}