<?php
	session_start();

	$q = $_REQUEST['q'];

	$hint = array();
	$hint_img = array();
	$hint_id = array();

	function convert_vi_to_en($str) {
		$str = preg_replace('/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/', 'a', $str);
	  $str = preg_replace('/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/', 'e', $str);
		$str = preg_replace('/(ì|í|ị|ỉ|ĩ)/', 'i', $str);
		$str = preg_replace('/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/', 'o', $str);
		$str = preg_replace('/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/', 'u', $str);
		$str = preg_replace('/(ỳ|ý|ỵ|ỷ|ỹ)/', 'y', $str);
		$str = preg_replace('/(đ)/', 'd', $str);

		$str = preg_replace('/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|A)/', 'a', $str);
		$str = preg_replace('/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|E)/', 'e', $str);
		$str = preg_replace('/(Ì|Í|Ị|Ỉ|Ĩ|I)/', 'i', $str);
		$str = preg_replace('/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|O)/', 'o', $str);
		$str = preg_replace('/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|U)/', 'u', $str);
		$str = preg_replace('/(Ỳ|Ý|Ỵ|Ỷ|Ỹ|Y)/', 'y', $str);
		$str = preg_replace('/(Đ|D)/', 'd', $str);
	  $str = strtolower($str);
		return $str;
	}

	if ($q !== '') {
		$q = convert_vi_to_en($q);
		$len = strlen($q);
		foreach($_SESSION['data'] as $name) {
			$convert_name = convert_vi_to_en($name['title']);
			$pos = strpos($convert_name, $q);
	        if ($pos !== false) {
							array_push($hint_id, $name['id']);
							array_push($hint, $name['title']);
							array_push($hint_img, $name['display_src']);
	        }
	    }
	}

	$hint_test = $hint_id;
	$hint_test = array_filter($hint_test);
	array_push($hint_id, $hint);
	array_push($hint_id, $hint_img);
	echo (empty($hint_test)) ? 'no suggestion' : json_encode($hint_id);
?>
