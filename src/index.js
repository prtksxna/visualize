/* eslint no-unused-vars: 0 */
import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import mermaid, {mermaidAPI} from 'mermaid';


registerBlockType( 'viz/mermaid', {
	title: 'Mermaid',
	icon: 'networking',
	category: 'layout',
	supports: {
		align: true,
		alignWide: false,
		reusable: false,
		lightBlockWrapper: true,
	},
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'pre',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
		diagramSVG: {
			type: 'string'
		}
	},
	example: {
		attributes: {
			content: 'graph LR',
			alignment: 'center',
		},
	},
	edit( props ) {
		const {
			attributes: { content, alignment, diagramSVG },
			setAttributes,
			className,
			isSelected,
		} = props;

		const updateGraph = (html) => {
			setAttributes({diagramSVG: html})
		}

		const onChangeContent = ( e ) => {
			var newContent = e.target.value;
			setAttributes( { content: newContent } );

			var graph = mermaidAPI.render('graphDiv', newContent, updateGraph)
		};

		const onChangeAlignment = ( newAlignment ) => {
			props.setAttributes( {
				alignment: newAlignment === undefined ? 'none' : newAlignment,
			} );
		};

		return (
			<div>
				{
					<BlockControls>
						<AlignmentToolbar
							value={ alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
				}
				{
					<InspectorControls>
						Test
					</InspectorControls>
				}
				<div className="mermaid__canvas" dangerouslySetInnerHTML={{__html: diagramSVG}}></div>
				<pre className='mermaid2'>{ content }</pre>
				{isSelected && (
					<textarea
						className={ className }
						style={ {
							textAlign: alignment,
						} }
						onChange={ onChangeContent }
					>{ content }</textarea>
				)}
			</div>
		);
	},
	save: ( props ) => {
		return (
			<pre className='mermaid'>{ props.attributes.content }</pre>
		);
	},
} );
