<?php

class Categories extends Controller
{

    private static $model;
    private static $categories;
    private static $icons;

    public static function CreateView($viewName)
    {
        self::$model = new m_categories();
        self::$categories = self::$model->getCategories();
        self::$icons = self::$model->getIcons();

        if (isset($_GET["save"])) {
            switch ($_GET["save"]) {
                case 1:
                    self::saveData();
                    break;
                case 2:
                    self::saveIcons();
                    break;
            }
            return;
        }

        self::CreateInfo();
        parent::CreateView($viewName);
    }

    private static function CreateInfo()
    {
        parent::$info = new PageInfo();
        parent::$info->setTitle("MM | Les catégories");
        parent::$info->setCss("categories/categories.css");
        parent::$info->setJs("categories/categories.js", "categories/categoryIcons.js");
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

    public static function GetIconsHTML()
    {
        $html = "";
        for ($i = 0; $i < sizeof(self::$icons); $i++) {
            $html .= "<li>";
            $html .= '<input type="radio" name="icon" id="icon' . $i . '" value="' . self::$icons[$i]["id"] . '">';
            $html .= '<label for="icon' . $i . '"><i class="' . self::$icons[$i]["iconUrl"] . '"></i></label>';
            $html .= "</li>";
        }
        return $html;
    }

    private static function saveData()
    {
        $response = array();
        $response["success"] = "fail";

        if (isset($_POST["title"]) && isset($_POST["icon"]) && isset($_POST["categoryId"])) {
            $title = $_POST["title"];
            $iconId = $_POST["icon"];
            $categoryId = $_POST["categoryId"];

            $title = filter_var($title, FILTER_SANITIZE_STRING);
            $iconId = filter_var($iconId, FILTER_VALIDATE_INT) ? $iconId : -1;
            if ($categoryId !== "new") {
                $categoryId = filter_var($categoryId, FILTER_VALIDATE_INT) ? $categoryId : -1;
            }

            $titleValid = strlen($title) > 0;

            $iconIdValid = false;
            for ($i = 0; $i < sizeof(self::$icons) && !$iconIdValid; $i++) {
                $iconIdValid = in_array($iconId, self::$icons[$i]);
            }

            $categoryIdValid = $categoryId === "new";
            for ($i = 0; $i < sizeof(self::$categories) && !$categoryIdValid; $i++) {
                $categoryIdValid = in_array($categoryId, self::$categories[$i]);
            }

            if ($iconIdValid && $categoryIdValid && $titleValid) {
                $saveSuccess = false;
                if ($categoryId === "new") {
                    $saveSuccess = self::$model->saveNewCategory($title, $iconId);
                } else {
                    $saveSuccess = self::$model->updateCategory($categoryId, $title, $iconId);
                }
                $response["success"] = $saveSuccess ? true : false;

                self::$categories = self::$model->getCategories();
                $response["html"] = self::GetCategoriesHTML();
            }
        }

        header('Content-type: application/json');
        echo json_encode($response);
    }

    public function saveIcons()
    {
        $response = array();
        $response["success"] = "fail";

        if (isset($_POST["newIcon"]) && !empty($_POST["newIcon"])) {
            $icon = filter_var($_POST["newIcon"], FILTER_SANITIZE_STRING);

            $response["duplicate"] = false;
            foreach (self::$icons as $savedIcon) {
                if ($savedIcon["iconUrl"] == $icon) {
                    $response["duplicate"] = true;
                    break;
                }
            }

            if ($response["duplicate"] === false) {
                $saveSuccess = self::$model->saveIcon($icon);
                $response["success"] = $saveSuccess ? true : false;

                self::$icons = self::$model->getIcons();
                $response["html"] = self::GetIconsHTML();
            }
        }

        header('Content-type: application/json');
        echo json_encode($response);
    }
}