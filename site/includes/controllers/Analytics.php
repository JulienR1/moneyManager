<?php

class Analytics extends Controller {

    public static function CreateView($viewName)
    {
        if(isset($_POST["ajax_request"])){
            self::LoadData();
            return;
        }

        self::CreateInfo();
        parent::CreateView($viewName);
    }

    private static function CreateInfo()
    {
        parent::$info = new PageInfo();
        parent::$info->setTitle("MM | Stats!");
        parent::$info->setLibraries('https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js');
        parent::$info->setJs("analytics/charts.js", "analytics/filters.js", "analytics/data.js");
        parent::$info->setCss("analytics/analytics.css", "analytics/analytics_list.css");
    }

    private static function LoadData(){
        if(!isset($_POST["start"]) || !isset($_POST["end"])){
            exit();
        }

        $model = new m_analytics();
        $data = $model->LoadAllData($_POST["start"], $_POST["end"]);        
        echo json_encode($data);
    }
}