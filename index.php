<?php
include('curl_class.php');
header("Content-Type: text/html; charset=UTF-8");
$headers = array(
    'apikey: 6e1f208007190302d70b40657dfe25d9'
);
if(isset( $_GET['city'] )) {
    $getData = $_GET['city'];
    $arr = json_encode(array('org_id' => $getData));
    print_r($arr);
    $url = 'http://apis.baidu.com/heweather/weather/free?city='.$getData;
    $curl = new Curl();
    $output = $curl->get($url, '', $headers);
    print_r($output);
}else{
    print_r('请求参数出错');
}

?>

