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
import mermaid, { mermaidAPI } from 'mermaid';

registerBlockType( 'visualize/mermaid', {
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
			selector: 'pre.js-visualize-content',
		},
		error: {
			type: 'string',
			source: 'text',
			selector: 'pre.js-visualize-error',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
		diagramSVG: {
			type: 'string',
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
			attributes: { content, alignment, diagramSVG, error },
			setAttributes,
			className,
			isSelected,
		} = props;

		const updateGraph = ( svg ) => {
			setAttributes( { diagramSVG: svg } );
		};

		const onChangeContent = ( e ) => {
			const newContent = e.target.value;
			setAttributes( { content: newContent } );

			let shouldParse = true;
			try {
				mermaid.parse( newContent );
			} catch ( parseError ) {
				setAttributes( { error: parseError.str } );
				shouldParse = false;
			}

			if ( shouldParse ) {
				setAttributes( { error: '' } );
				mermaid.initialize( { theme: 'neutral' } );
				mermaidAPI.render(
					'graphDiv' + new Date().getTime(),
					newContent,
					updateGraph
				);
			}
		};

		const onChangeAlignment = ( newAlignment ) => {
			props.setAttributes( {
				alignment: newAlignment === undefined ? 'none' : newAlignment,
			} );
		};

		return (
			<div className={ className }>
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
						<PanelBody
							title={ __( 'Documentation' ) }
							initialOpen={ false }
						>
							<PanelRow>
								<a href="https://mermaid-js.github.io/mermaid/#/flowchart">
									Flowchart
								</a>
							</PanelRow>
							<PanelRow>
								<a href="https://mermaid-js.github.io/mermaid/#/sequenceDiagram">
									Sequence diagram
								</a>
							</PanelRow>
							<PanelRow>
								<a href="https://mermaid-js.github.io/mermaid/#/classDiagram">
									Class diagram
								</a>
							</PanelRow>
							<PanelRow>
								<a href="https://mermaid-js.github.io/mermaid/#/stateDiagram">
									State diagram
								</a>
							</PanelRow>
							<PanelRow>
								<a href="https://mermaid-js.github.io/mermaid/#/entityRelationshipDiagram">
									Entity relation diagram
								</a>
							</PanelRow>
							<PanelRow>
								<a href="https://mermaid-js.github.io/mermaid/#/user-journey">
									User journey
								</a>
							</PanelRow>
							<PanelRow>
								<a href="https://mermaid-js.github.io/mermaid/#/gantt">
									Gantt
								</a>
							</PanelRow>
							<PanelRow>
								<a href="https://mermaid-js.github.io/mermaid/#/pie">
									Pie chart
								</a>
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				}
				<div
					className="visualizeMermaid__canvas"
					dangerouslySetInnerHTML={ { __html: diagramSVG } }
				/>
				{ isSelected && (
					<>
						<div className="visualizeMermaid__error">{ error }</div>
						<textarea
							className="visualizeMermaid__textarea"
							style={ {
								textAlign: alignment,
							} }
							onChange={ onChangeContent }
						>
							{ content }
						</textarea>
					</>
				) }
			</div>
		);
	},
	save: ( props ) => {
		return (
			<div>
				<pre className="visualizeMermaid__content js-visualize-content">
					{ props.attributes.content }
				</pre>
				<pre className="visualizeMermaid__error visualizeMermaid__error--hidden js-visualize-error">
					{ props.attributes.error }
				</pre>
				<div
					className="visualizeMermaid__canvas"
					dangerouslySetInnerHTML={ {
						__html: props.attributes.diagramSVG,
					} }
				/>
			</div>
		);
	},
} );
