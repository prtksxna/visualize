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
 * Version: 1.0.0
 * Requires at least: 5.1
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

  register_block_type(
    'viz/mermaid',
    array(
        'style'         => 'viz-style',
        'editor_script' => 'viz',
    )
  );
}
add_action( 'init', 'viz_block' );

/**
 * Enque assets for editor
 */
function viz_assets() {
  wp_enqueue_script(
    'viz-mermaid',
    plugins_url( '/lib/mermaid.min.js', __FILE__ ),
    array(),
    filemtime(plugins_url( '/lib/mermaid.min.js', __FILE__ )),
    false
  );
}
add_action( 'enqueue_block_editor_assets', 'viz_assets' );
