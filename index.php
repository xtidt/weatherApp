<?php
include('curl_class.php');
header("Content-Type: text/html; charset=UTF-8");
$headers = array(
    'apikey: XXXXX'
);
if(isset( $_GET['city'] )) {
    $getData = $_GET['city'];
    $arr = json_encode(array('city' => $getData));
    $url = 'http://apis.baidu.com/heweather/weather/free?city='.$getData;
    $curl = new Curl();
    $output = $curl->get($url, '', $headers);
    print_r($output);
}else{
    print_r('error city code');
}

?>

