/* eslint no-unused-vars: 0 */
import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow, FontSizePicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType( 'viz/mermaid', {
	title: 'Mermaid',
	icon: 'networking',
	category: 'layout',
	styles: [
		{
			name: 'paper',
			label: 'Paper', // TODO: What to do here? Use _x
			isDefault: true,
		},
		{
			name: 'flat',
			label: 'Flat',
		},
	],
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
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
		color: {
			type: 'string',
			default: '#f9eeaa',
		},
		fontSize: {
			type: 'number',
			default: 16,
		},
	},
	example: {
		attributes: {
			content: 'Type something…',
			alignment: 'center',
		},
	},
	edit( props ) {
		const {
			attributes: { content, alignment, color, fontSize },
			setAttributes,
			className,
		} = props;

		const onChangeContent = ( newContent ) => {
			setAttributes( { content: newContent } );
		};

		const onChangeAlignment = ( newAlignment ) => {
			props.setAttributes( {
				alignment: newAlignment === undefined ? 'none' : newAlignment,
			} );
		};

		const onChangeColor = ( newColor ) => {
			props.setAttributes( {
				color: newColor === undefined ? '#f9eeaa' : newColor,
			} );
		};

		const fontSizes = [
			{
				name: __( 'Normal' ),
				slug: 'normal',
				size: 16,
			},
			{
				name: __( 'Medium' ),
				slug: 'medium',
				size: 20,
			},
			{
				name: __( 'Large' ),
				slug: 'large',
				size: 36,
			},
			{
				name: __( 'Huge' ),
				slug: 'huge',
				size: 48,
			},
		];
		const fallbackFontSize = 20;

		const onFontSizeChange = ( newFontSize ) => {
			props.setAttributes( {
				fontSize:
					newFontSize === undefined ? fallbackFontSize : newFontSize,
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
						<PanelBody title={ __( 'Color' ) }>
							<PanelRow>
								<ColorPalette
									disableCustomColors={ false }
									value={ color }
									onChange={ onChangeColor }
									clearable={ true }
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody title={ __( 'Font size' ) }>
							<PanelRow>
								<FontSizePicker
									fontSizes={ fontSizes }
									fallbackFontSize={ fallbackFontSize }
									value={ fontSize }
									onChange={ onFontSizeChange }
								/>
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				}
				<RichText
					tagName="p"
					className={ className }
					style={ {
						textAlign: alignment,
						backgroundColor: color,
						fontSize,
					} }
					onChange={ onChangeContent }
					value={ content }
				/>
			</div>
		);
	},
	save: ( props ) => {
		return (
			<RichText.Content
				className={ `viz-${ props.attributes.alignment }` }
				style={ {
					fontSize: props.attributes.fontSize,
					backgroundColor: props.attributes.color,
				} }
				tagName="p"
				value={ props.attributes.content }
			/>
		);
	},
} );
