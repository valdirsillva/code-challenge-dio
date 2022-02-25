<?php

header('Cache-Control: no-cache, no-store, must-revalidate');

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json");

require "ServicesApi.php";

echo ServicesApi::get();