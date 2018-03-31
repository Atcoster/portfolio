import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectDetail extends Component {

	constructor( props ) {
		super( props );
	}

	render() {
		let project  = this.props.data;

		return (
			<li className='project'>
				<Button />
				<h4 className='project__name'>
					<span className="project__name__text">{ project.name }</span>
				</h4>
				<img className='project__image' src={`./src/assets/images/projects/${project.images.thumb}`}/>
			</li>
		)
	}
}

Project.propTypes = {
	data : PropTypes.object.isRequired
}

export default ProjectDetail;
