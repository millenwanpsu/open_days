<?php
//https://stackoverflow.com/questions/41369679/save-variable-to-text-file-serverside-using-jquery
$rfile = fopen("schedule.txt", "r") or die("Unable to open file!");
fclose($rfile);
$data = $_POST['selections'];
$wfile = fopen("schedule.txt","w");
fwrite($wfile, $data);
fclose($wfile);
?>
