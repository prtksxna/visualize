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
		alignWide: true,
		reusable: false,
		lightBlockWrapper: true,
	},
	attributes: {
		content: {
			type: 'string',
			source: 'text',
			selector: 'pre.js-viz-content',
		},
		error: {
			type: 'string',
			source: 'text',
			selector: 'pre.js-viz-error',
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
			attributes: { content, alignment, diagramSVG, error },
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

			var shouldParse = true;
			try {
				mermaid.parse(newContent)
			} catch (e) {
				setAttributes({error: e.str})
				shouldParse = false
			}

			if (shouldParse) {
				setAttributes({error: ''})
				var graph = mermaidAPI.render('graphDiv'+new Date().getTime(), newContent, updateGraph)
			}
		};

		const onChangeAlignment = ( newAlignment ) => {
			props.setAttributes( {
				alignment: newAlignment === undefined ? 'none' : newAlignment,
			} );
		};

		return (
			<div className={className}>
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
				<div className="vizMermaid__canvas" dangerouslySetInnerHTML={{__html: diagramSVG}}></div>
				{isSelected && (
					<>
						<pre className="vizMermaid__error">{ error }</pre>
						<textarea
							className="vizMermaid__textarea"
							style={ {
								textAlign: alignment,
							} }
							onChange={ onChangeContent }
							>{ content }</textarea>
					</>
				)}
			</div>
		);
	},
	save: ( props ) => {
		return (
			<div>
				<pre className="vizMermaid__content js-viz-content">
					{ props.attributes.content }
				</pre>
				<pre className="vizMermaid__error vizMermaid__error--hidden js-viz-error">
					{ props.attributes.error }
				</pre>
				<div
					className="vizMermaid__canvas"
					dangerouslySetInnerHTML={{__html: props.attributes.diagramSVG}}
				/>
			</div>
		);
	},
} );
