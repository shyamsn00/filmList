import { StyleSheet } from 'react-native';

export default StyleSheet.create(
{
	container: 
	{
		flex: 1,
		backgroundColor: "#eee",
		justifyContent: "space-evenly",
		alignItems: "stretch",
	},
	innerContainer: 
	{
		flex: 1,
		justifyContent: "center",
		alignItems: "stretch",
		padding: 10
	},
	showHideLabel:
	{
		alignSelf: "flex-end"
	},
	header: 
	{
		marginTop: 25,
		paddingLeft: 10,
		fontSize: 40,
		fontWeight: "bold",
		alignSelf: "stretch",
		backgroundColor: 'black',
		color: 'white'
	},
	ratingView:
	{
		flexDirection: 'row',
		marginBottom: 10,
		alignItems: 'center',
	},
	ratingSlider:
	{
		flex: 9,
		height: 40,
	},
	ratingText:
	{
		flex: 1,
		fontSize: 20,
		alignSelf: "flex-start"
	},
	filmListRow:
	{
		flexDirection: 'row',
		minHeight: 60,
		alignItems: 'center',
	},
	filmListFilm:
	{
		flex: 6,
		fontSize: 20,
		paddingLeft: 10,
	},
	filmListRating:
	{
		flex: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	filmListRatingText:
	{
		fontSize: 20,
	},
	filmListHeaderFilm:
	{
		flex: 6,
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold',
		paddingLeft: 10
	},
	filmListHeaderRating:
	{
		flex: 4,
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold',
		paddingLeft: 50
	},
	formLabel:
	{
		fontSize: 20,
		marginBottom: 10
	},
	formTextInput:
	{
		height: 40,
		backgroundColor: 'white',
		marginBottom: 10,
		borderColor: 'black',
		borderWidth: 1,
		padding: 4
	},
	filmList:
	{
		marginTop: 2
	},
	evenRow:
	{
		backgroundColor: '#eee'
	},
	oddRow:
	{
		backgroundColor: '#ddd'
	},
	filmListHeader:
	{
		backgroundColor: '#000'
	},
	formButton:
	{
		height: 40,
		marginBottom: 10,
		alignItems: "stretch"
	},
	formTextInputError:
	{
		borderColor: 'red',
		borderWidth: 2
	},
	spinnerText:
	{
		fontSize: 20
	},
	divider:
	{
		backgroundColor: 'black',
		height: 4,
		marginBottom: 10
	},
	listEmptyComponent:
	{
		fontSize: 20, 
		paddingLeft: 10, 
		paddingTop: 10
	}
});