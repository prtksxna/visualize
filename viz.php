<?php
/**
 * Viz block for Gutenberg.
 *
 * @file Main file.
 * @package viz
 */

/**
 * Plugin Name: Viz
 * Plugin URI: https://github.com/prtksxna/viz
 * Description: Gutenberg block to add visualizations to your blog posts.
 * Version: 1.2.1
 * Requires at least: 5.2
 * Requires PHP: 7.2
 * Author: Prateek Saxena
 * Author URI: https://prtksxna.com
 * License: GPL v2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */
function viz_block() {
  $asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

  wp_register_script(
    'viz',
    plugins_url( 'build/index.js', __FILE__ ),
    $asset_file['dependencies'],
    $asset_file['version'],
    true
  );

  wp_register_style(
    'viz-style',
    plugins_url( 'style.css', __FILE__),
    array(),
    filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
  );

  wp_enqueue_style( 'viz-google-fonts', 'https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap', false, 'custom' );

  register_block_type(
    'viz/viz',
    array(
        'style'         => 'viz-style',
        'editor_script' => 'viz',
    )
  );
}
add_action( 'init', 'viz_block' );

/**
 * Register Google Font styles.
 */
function viz_styles() {
  wp_enqueue_style( 'viz-google-fonts', 'https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap', false, 'custom' );
}
add_action( 'wp_enqueue_scripts', 'viz_styles' );
