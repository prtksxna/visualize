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
	},
	example: {
		attributes: {
			content: 'graph LR',
			alignment: 'center',
		},
	},
	edit( props ) {
		const {
			attributes: { content, alignment },
			setAttributes,
			className,
			isSelected,
		} = props;

		console.log(isSelected);

		const onChangeContent = ( e ) => {
			var newContent = e.target.value;
			setAttributes( { content: newContent } );
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
