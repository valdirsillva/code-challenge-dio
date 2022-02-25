<?php 


header("Content-Type: application/json");

class ServicesApi 
{
     const FILE = '../videos.json';
     
     public static function get() 
     {
        return file_get_contents(SELF::FILE);
     }
}


echo ServicesApi::get();