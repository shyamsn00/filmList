import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Text, View, SafeAreaView, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import Slider from '@react-native-community/slider';
import { FontAwesome } from '@expo/vector-icons'; 
import InputSpinner from "react-native-input-spinner";
import { FontAwesome5 } from '@expo/vector-icons'; 
import Toast, { DURATION } from 'react-native-easy-toast'
import { Fontisto } from '@expo/vector-icons'; 
import styles from './styles'

export default class App extends Component 
{
	serverIP = 'http://192.168.0.200:8080'; // modify as fit

	constructor(props) 
	{
		super(props);
		this.state = { username: '', film: '', rating: 5, filmsButtonTitle: 'Show films', editingFilmId: '', editingFilmRating: 0, loginError: false, filmError: false, refreshing: false };
	}

	login = () => 
	{
		if(!/\w+/.test(this.state.username))
		{
			this.refs.redToast.show('Username cannot be empty, and can only be alphanumeric.', DURATION.LENGTH_SHORT);
			this.setState({loginError: true})
			return;	
		}

		try 
		{
			fetch(this.serverIP + "/api/v1/login", 
			{
				method: "POST",
				body: JSON.stringify({ username: this.state.username }),
				headers: 
				{
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((resp) => resp.json())
			.then((data) => 
			{
				this.refs.greenToast.show('You have been logged in successfully.', DURATION.LENGTH_SHORT);
				this.setState({ jwtToken: data.token });
				this.getFilms();
			});
		} 
		catch (e) 
		{
			console.log(e);
			console.log("----------");
		}
	};

	addFilm = () =>
	{
		if(!/\w+/.test(this.state.film))
		{
			this.refs.redToast.show('Film name cannot be empty, and can only be alphanumeric.', DURATION.LENGTH_SHORT);
			this.setState({ filmError: true })
			return;	
		}

		try
		{
			fetch(this.serverIP + '/api/v1/films',
			{
				method: 'POST',
				body: JSON.stringify({ name: this.state.film, rating: this.state.rating }),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.state.jwtToken
				}
			})
			.then(resp =>
				{
					if(resp.status == 200)
					{
						this.refs.greenToast.show('Film added.', DURATION.LENGTH_SHORT);
						this.setState({film: ''});
						this.getFilms();
					}
					else
					{	
						this.refs.redToast.show('Error: ' + resp.status + ' - ' + resp.statusText, DURATION.LENGTH_SHORT);
					}	
				})
		}
		catch(e)
		{
			console.log(e);
			console.log('----------');
		}
	}

	getFilms = () => 
	{
		this.setState({ refreshing: true });

		try
		{
			fetch(this.serverIP + '/api/v1/films',
			{
				method: 'GET',
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(resp => resp.json())
			.then(films => 
			{
				this.setState({films});
				this.setState({ refreshing: false });
			});
		}
		catch(e)
		{
			console.log(e);
			console.log('----------');
			this.setState({ refreshing: false });
		}
	};

	renderItem = ({ item, index }) => 
	{
		return (
			<View style={[styles.filmListRow, index % 2 == 0 ? styles.evenRow : styles.oddRow]}>
				<Text style={styles.filmListFilm}>{item.name}</Text>
				{
				this.state.editingFilmId == item._id 
				?
				<View style={styles.filmListRating}>
					<InputSpinner width={105} height={35} max={10} min={0} step={1} color={'black'} colorMax={"green"} colorMin={"red"} rounded={false} inputStyle={styles.spinnerText} value={this.state.editingFilmRating} onChange={ (editingFilmRating) => { this.setState({ editingFilmRating }) } }/>
					<TouchableOpacity onPress={ this.updateRating }>
						<FontAwesome5 name="check-circle" size={35} color="green" />
					</TouchableOpacity>
					<TouchableOpacity onPress={ () => this.setState({editingFilmId: ''}) }>
					<Fontisto name="close" size={35} color="red" />
					</TouchableOpacity>
				</View>
				:
				<View style={styles.filmListRating}>
					<Text style={styles.filmListRatingText}>{item.rating}</Text>
					<TouchableOpacity style={styles.filmListRatingEdit} onPress={ () => this.setState({ editingFilmId: item._id, editingFilmRating: item.rating }) }>
						<FontAwesome name="edit" size={35} color="black" />
					</TouchableOpacity>
				</View>
				}
			</View>
		)
	};

	updateRating = () => 
	{
		try
		{
			fetch(this.serverIP + '/api/v1/films',
			{
				method: 'PATCH',
				body: JSON.stringify({ id: this.state.editingFilmId, rating: this.state.editingFilmRating }),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.state.jwtToken
				}
			})
			.then(resp =>
				{
					if(resp.status == 200)
					{
						this.refs.greenToast.show('Film rating updated.', DURATION.LENGTH_SHORT);
						this.getFilms();
						this.setState({editingFilmId: ''});
					}
					else
					{	
						this.refs.redToast.show('Error: ' + resp.status + ' - ' + resp.statusText, DURATION.LENGTH_SHORT);
					}	
				})
		}
		catch(e)
		{
			console.log(e);
			console.log('----------');
		}
	}
		
	render() 
	{
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.header}>Film list</Text>				
				{ 
				!this.state.jwtToken 
				? 
				<View style={styles.innerContainer}>
					<Text style={styles.formLabel}>Enter your name:</Text>
					<TextInput style={[styles.formTextInput, this.state.loginError && styles.formTextInputError]} value={this.state.username} onChangeText={ (username) => this.setState({ username, loginError: false }) }></TextInput>
					<View style={styles.formButton}>
						<Button title="Login" onPress={this.login}></Button>
					</View>
				</View>
				: 
				<View style={styles.innerContainer}>
					<View>
						<Text style={styles.formLabel}>Enter the name (in English) of the film to be added:</Text>
						<TextInput style={[styles.formTextInput, this.state.filmError && styles.formTextInputError]} value={this.state.film} onChangeText={ (film) => this.setState({ film, filmError: false }) }></TextInput>
						<Text style={styles.formLabel}>Rate the film ([0..10]):</Text>
						<View style={styles.ratingView}> 
							<Slider style={styles.ratingSlider} minimumValue={0} maximumValue={10} 
								minimumTrackTintColor="green" maximumTrackTintColor="red" step={1} value={this.state.rating}
								onValueChange={ (rating) => this.setState({ rating }) }/>
							<Text style={styles.ratingText}>{this.state.rating}</Text>
						</View>
						<View style={styles.formButton}>
							<Button title="Add" onPress={this.addFilm}></Button>
						</View>
						<View style={styles.divider}></View>
						<View style={styles.formButton}>
							<Button style={styles.formButton} title={this.state.filmsButtonTitle} onPress={ () => this.setState({ filmsButtonTitle: this.state.filmsButtonTitle == 'Show films' ? 'Hide films' : 'Show films' }) }></Button>
						</View>
						{
							this.state.filmsButtonTitle == 'Hide films' 
							&&
							<View style={[styles.filmListRow, styles.filmListHeader]}>
									<Text style={styles.filmListHeaderFilm}>Film</Text>
									<Text style={styles.filmListHeaderRating}>Rating (10)</Text>
							</View>
						}
						
					</View>
					{
					this.state.filmsButtonTitle == 'Hide films' 
					&&
					<FlatList ListEmptyComponent={<View><Text style={styles.listEmptyComponent}>No films in list.</Text></View>} onRefresh={ this.getFilms } refreshing={ this.state.refreshing } style={styles.filmList} data={this.state.films} renderItem={this.renderItem} keyExtractor={item => item._id}/>
					} 
				</View>
				}
				<StatusBar style="auto" />
				<Toast ref="redToast" style={{backgroundColor: '#ff7777', height: 40}} textStyle={{color: 'black'}}/>
				<Toast ref="greenToast" style={{backgroundColor: 'greenyellow', height: 40}} textStyle={{color: 'black'}}/>
			</SafeAreaView>
		);
	};
}
