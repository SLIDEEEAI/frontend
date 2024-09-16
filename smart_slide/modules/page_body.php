<?php


if (isset($_GET['page'])) {
    $page = $_GET['page'] . '.php';
}
else {$page = 'main_page.php';}


include 'pages/' . $page;
?>