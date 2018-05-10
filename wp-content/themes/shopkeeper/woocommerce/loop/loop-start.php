<?php
/**
 * Product Loop Start
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.3.0
 */
 
global $shopkeeper_theme_options, $woocommerce_loop;
?>

<?php

if ( ( isset($woocommerce_loop['columns']) && $woocommerce_loop['columns'] != "" ) ) {
	$products_per_column = $woocommerce_loop['columns'];
} else {
	$products_per_column = get_option('woocommerce_catalog_columns', 5);

	if (isset($_GET["products_per_row"])) {
		$products_per_column = $_GET["products_per_row"];
	}
}

if ($products_per_column == 6) {
	$products_per_column_xlarge = 6;
	$products_per_column_large = 4;
	$products_per_column_medium = 3;
}

if ($products_per_column == 5) {
	$products_per_column_xlarge = 5;
	$products_per_column_large = 4;
	$products_per_column_medium = 3;
}

if ($products_per_column == 4) {
	$products_per_column_xlarge = 4;
	$products_per_column_large = 4;
	$products_per_column_medium = 3;
}

if ($products_per_column == 3) {
	$products_per_column_xlarge = 3;
	$products_per_column_large = 3;
	$products_per_column_medium = 2;
}

if ($products_per_column == 2) {
	$products_per_column_xlarge = 2;
	$products_per_column_large = 2;
	$products_per_column_medium = 2;
}

if ($products_per_column == 1) {
	$products_per_column_xlarge = 1;
	$products_per_column_large = 1;
	$products_per_column_medium = 1;
}

?>

<div class="row">
	<div class="large-12 columns">
		<ul id="products-grid" class="row products products-grid <?php echo $shopkeeper_theme_options['mobile_columns'] == 1 ? 'small-up-1' : 'small-up-2'; ?> medium-up-<?php echo $products_per_column_medium; ?> large-up-<?php echo $products_per_column_large; ?> xlarge-up-<?php echo $products_per_column_xlarge; ?> xxlarge-up-<?php echo $products_per_column; ?>">