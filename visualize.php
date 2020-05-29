<?php
/**
 * Visualize block for Gutenberg.
 *
 * @file Main file.
 * @package visualize
 */

/**
 * Plugin Name: Visualize
 * Plugin URI: https://github.com/prtksxna/visualize
 * Description: Gutenberg block to add visualizations to your blog posts.
 * Version: 1.0.1
 * Requires at least: 5.1
 * Requires PHP: 7.2
 * Author: Prateek Saxena
 * Author URI: https://prtksxna.com
 * License: GPL v2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */
function visualize_block() {
  $asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

  wp_register_script(
    'visualize',
    plugins_url( 'build/index.js', __FILE__ ),
    $asset_file['dependencies'],
    $asset_file['version'],
    true
  );

  wp_register_style(
    'visualize-style',
    plugins_url( 'style.css', __FILE__),
    array(),
    filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
  );

  register_block_type(
    'visualize/mermaid',
    array(
        'style'         => 'visualize-style',
        'editor_script' => 'visualize',
    )
  );
}
add_action( 'init', 'visualize_block' );
