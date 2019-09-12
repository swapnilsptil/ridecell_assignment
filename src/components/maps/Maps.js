/**
* Created on 12/09/19.
* Author : Swapnil Patil
* Details :  Maps for Assignment
*/

import React, { Component } from "react"
import { compose } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MapsTable from './../mapstable/MapsTable';
import {MARKERS} from './../../util/Const';
import './Maps.scss';

/**
* MapWithAMarker function.
* @function MapWithAMarker
* @description Function to show marker on maps with click and infoWindow functionality.
*/
const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
	return (
		<GoogleMap defaultZoom={10} defaultCenter={{ lat: 29.5, lng: -95 }}>
			{
				props.markers.map(marker => {
					const onClick = props.onClick.bind(this, marker)
					return (
						<Marker key={marker.id} onClick={onClick} position={{ lat: marker.latitude, lng: marker.longitude }} >
							{
								props.selectedMarker === marker &&
								<InfoWindow>
									<div>
										{marker.info}
									</div>
								</InfoWindow>
							}

						</Marker>
					)
				})
			}
		</GoogleMap>
	)
})

/**
* RideCellMap Stateful component .
* @function RideCellMap
* @description RideCellMap component with co-ordinate table and google map. 
*/
export default class RideCellMap extends Component {
	constructor(props) {
		super(props)
		this.state = { selectedMarker: MARKERS[0] }

		this.tableData = {
			columns: ['info', 'country', 'id', 'longitude', 'latitude'],
			rows: MARKERS
		};

	}
	/**
	* handleClick function 
	* @method RideCellMap#handleClick
	* @description Function to change marker for more information.
	*/
	handleClick = (marker) => {
		this.setState({ selectedMarker: marker })
	}

	/**
	* render function 
	* @method RideCellMap#render
	* @description rendering RideCellMap component.
	*/

	render() {
		return (
			<div className="ridecell-maps-container">
				<div className="ridecell-maps">
					<MapWithAMarker
						selectedMarker={this.state.selectedMarker}
						markers={MARKERS}
						onClick={this.handleClick}
						googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: `400px` }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/>
				</div>
				<div className="ridecell-maps-table">
					<MapsTable data={this.tableData} onTableRowClick={this.handleClick} />
				</div>
			</div>
		)
	}
}