<?php

class PageInfo
{
    public $title;
    public $cssFiles = array();
    public $jsFiles = array();

    public function setTitle($newTitle)
    {
        $this->title = $newTitle;
    }

    public function setCss(...$css)
    {
        $this->cssFiles = $css;
    }

    public function setJs(...$js)
    {
        $this->jsFiles = $js;
    }

}