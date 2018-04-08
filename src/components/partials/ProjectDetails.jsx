import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipe from 'react-easy-swipe';

class ProjectDetails extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			projects : this.props.data,
			id       : 0,
			show     : ''
		}
	}

	componentDidMount() {
		let count = Object.keys( this.state.projects ).length,
			id    = 1 >= count ? 0 : 1;

		this.setState( {
			id : id
		} )
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.show !== this.state.show ) {
			this.setState( {
				show : nextProps.show
			} );
		}

		if ( nextProps.id !== this.state.id ) {
			this.setState( {
				id : nextProps.id
			} );
		}
	}

	closeProductDetails( event ) {
		let clickedElem  = event.target.className,
			acceptedElem = [ 'active', 'close' ];

		for ( let elem of acceptedElem ) {
			if ( 0 <= clickedElem.indexOf( elem )) {
				this.props.closeProductDetails();
			}
		}
	}

	onSwipeLeft( id ) {
		let newID = id + 1;

		this.props.handleActiveProject( newID, 'onClick' );
	}

	onSwipeRight( id ) {
		let newID = id - 1;

		this.props.handleActiveProject( newID, 'onClick' );
	}

	handleActiveProject( e ) {
		let clickedElem = e.target.className,
			currentID   = this.state.id,
			newID       = 0 < clickedElem.indexOf( 'larrow' ) ? currentID - 1 : currentID + 1;

		this.props.handleActiveProject( newID, 'onClick' );
	}

	render() {
		let project      = this.state.projects[ this.state.id ],
			activeClass  = this.state.show ? ' details--active' : '',
			company      = project.company.replace( /\s+/g, '' ).toLowerCase(),
			folder       = project.folder.toLowerCase(),
			name         = project.name,
			descriptions = [],
			disciplines  = [],
			techniques   = [],
			images       = [];

		[].forEach.call( project.description, ( desc, index ) => {
			descriptions.push( <p key={ index }> { desc } </p> );
		} );

		[].forEach.call( project.disciplines, ( disc, index ) => {
			let comma = index < project.disciplines.length - 1 ? ',' : '';
			disciplines.push( <span key={ index }> { disc }{ comma } </span> );
		} );

		[].forEach.call( project.techniques, ( tech, index ) => {
			let comma = index < project.techniques.length - 1 ? ',' : '';
			techniques.push( <span key={ index }> { tech }{ comma } </span> );
		} );

		[].forEach.call( project.images.showcase, ( img, index ) => {
			images.push(
				<img key={ index }
					src={`./src/assets/images/projects/${ company }/${ folder }/${ img }`}
					alt={ project.name }
				/>
			);
		} );

		return (
			<div className={`details ${ activeClass }`} onClick={ this.closeProductDetails.bind( this )}>
				<Swipe onSwipeLeft={ this.onSwipeLeft.bind( this, this.state.id ) } onSwipeRight={ this.onSwipeRight.bind( this, this.state.id ) }>
					<div className='details__wrapper'>
						<div className='details__control'>
							<span className={`details__icon details__icon--larrow${ 0 >= this.state.id ? ' details__icon--off' : '' }`}
								onClick={ this.handleActiveProject.bind( this ) }></span>
							<span className={`details__icon details__icon--rarrow
								${ this.state.id >= this.state.projects.length - 1 ? ' details__icon--off' : '' }`}
								onClick={ this.handleActiveProject.bind( this ) }></span>
							<span className='details__icon details__icon--close'
								onClick={ this.closeProductDetails.bind( this ) }></span>
						</div>
						<article className='details__info'>
							<h2 className='details__name'> { name } </h2>
							<div className='details__descriptions'>
								{ descriptions }
							</div>
							<p className='details__disciplines'>
								<strong> Disciplines: </strong>
								{ disciplines }
							</p>
							<p className='details__techniques'>
								<strong> Techniques: </strong>
								{ techniques }
							</p>
						</article>
						<div className='details__images'>
							{ images }
						</div>
					</div>
				</Swipe>
			</div>
		)
	}
}

ProjectDetails.propTypes = {
	data                : PropTypes.array.isRequired,
	closeProductDetails : PropTypes.func.isRequired,
	handleActiveProject : PropTypes.func.isRequired,
	show                : PropTypes.bool.isRequired,
	id                  : PropTypes.number.isRequired
}

export default ProjectDetails;