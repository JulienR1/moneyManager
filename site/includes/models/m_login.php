<?php

class m_login extends DatabaseHandler
{

    public function ValidateUserProfile($username)
    {
        $sql = "SELECT * FROM users WHERE email=?";
        return parent::query($sql, $username);
    }

}