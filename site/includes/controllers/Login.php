<?php

class Login extends Controller
{

    public static function CreateView($viewName)
    {
        if (isset($_POST["connection-button"])) {
            self::Connect();
            exit();
        }

        self::CreateInfo();
        parent::CreateView($viewName);
    }

    private static function CreateInfo()
    {
        parent::$info = new PageInfo();
        parent::$info->setTitle("MM | Connexion");
        parent::$info->setCss("login/login.css");
    }

    private static function Connect()
    {
        if (isset($_POST["username"]) && isset($_POST["password"])) {
            $username = $_POST["username"];
            $password = $_POST["password"];

            $usernameValid = false;
            if (filter_var($username, FILTER_VALIDATE_EMAIL)) {
                $usernameIsValid = true;
            }

            $password = filter_var($password, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);

            if ($usernameIsValid === true) {
                if (self::ValidateConnection($username, $password)) {
                    header("Location: /");
                    exit();
                } else {
                    header("Location: login?e=credentials");
                    exit();
                }
            } else {
                header("Location: login?e=mail");
                exit();
            }
        }
        header("Location: login?e=nofields");
        exit();
    }

    private static function ValidateConnection($username, $password)
    {
        $model = new m_login();
        $userData = $model->ValidateUserProfile($username);
        if ($userData != null) {
            if (sizeof($userData) === 1) {
                $userData = $userData[0];
                print_r($userData);
                if (password_verify($password, $userData["password"])) {
                    $_SESSION["connected"] = true;
                    $_SESSION["firstname"] = $userData["firstname"];
                    $_SESSION["lastname"] = $userData["lastname"];
                    $_SESSION["img"] = $userData["img"];
                    return true;
                }
            }
        }
        return false;
    }
}