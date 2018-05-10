<?php


function getbowtied_theme_register_required_plugins() {

  if ( defined('ENVATO_HOSTED_SITE') ) {
    $plugins = array(
      'js_composer' =>
        array(
          'name'               => 'WPBakery Page Builder',
          'slug'               => 'js_composer',
          'source'             => get_template_directory() . '/inc/plugins/js_composer.zip',
          'required'           => true,
          'external_url'       => '',
          'description'        => '#1 WordPress Page Builder Plugin',
        ),
        'woocommerce' => array(
          'name'               => 'WooCommerce',
          'slug'               => 'woocommerce',
          'required'           => true,
          'description'        => 'The eCommerce engine',
        ),
        'one-click-demo-import' => array(
          'name'               => 'One Click Demo Import',
          'slug'               => 'one-click-demo-import',
          'required'           => true,
          'description'        => 'Import your demo content, widgets and theme settings with one click.',
        ),
      );
  } else {
    $plugins = array(
      // PREMIUM Plugins
      array(
         'name'                  => 'GetBowtied Tools', // The plugin name
         'slug'                  => 'getbowtied-tools', // The plugin slug (typically the folder name)
         'source'                => 'https://api.getbowtied.com/v2/getbowtied-tools/update.php', // The plugin source
         'required'              => true, // If false, the plugin is only 'recommended' instead of required
         'version'               => '2.0', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
         'force_activation'      => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
         'force_deactivation'    => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
         'external_url'          => '', // If set, overrides default API URL and points to an external URL
         'image_url'             => '',
      ),
    );
  }

	$config = array(
	   'id'                => 'getbowtied',
		'default_path'      => '',
		'parent_slug'       => 'themes.php',
		'menu'              => 'tgmpa-install-plugins',
		'has_notices'       => true,
		'is_automatic'      => true,
	);

	tgmpa( $plugins, $config );
}

add_action( 'tgmpa_register', 'getbowtied_theme_register_required_plugins' );


