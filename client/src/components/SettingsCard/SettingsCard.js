import React, { Component } from "react";
import API from '../../utils/API.js';
import { Container } from 'semantic-ui-react';
// import { Segment, Container, Header, Icon, Input, Label, Form, Button, Search, Grid, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
import vaSchools from '../../utils/vaSchools.js'
// import SearchForm from "../SearchForm";

const classStandingOptions = [
  { key: 'f', text: 'Freshman', value: 'freshman' },
  { key: 'so', text: 'Sophomore', value: 'sophomore' },
  { key: 'j', text: 'Junior', value: 'junior' },
  { key: 'se', text: 'Senior', value: 'senior' }
];

class SettingsCard extends Component {
  state = {
    facebook_id: this.props.facebook_id,
    schoolsForAutocomplete: vaSchools,
    user: this.props.user,
    name: '',
    email: '',
    school: '',
    classStanding: '',
    classID: '',
    classes: '',
    objMethods: [],
    objLocations: [],
    objTimes: [],
    results: [],
    //change major and minor when they are created
    major: '',
    minor: '',
    photo: '',
    methods: {
      flashcards: false,
      quizzes: false,
      rereading: false,
      revisionNotes: false,
      mneumonics: false,
      other: false
    },
    locations: {
      library: false,
      cafe: false,
      commons: false,
      home: false,
      online: false,
      other: false
    },
    times: {
      SundayMorning: false,
      SundayAfternoon: false,
      SundayEvening: false,
      SundayNight: false,
      MondayMorning: false,
      MondayAfternoon: false,
      MondayEvening: false,
      MondayNight: false,
      TuesdayMorning: false,
      TuesdayAfternoon: false,
      TuesdayEvening: false,
      TuesdayNight: false,
      WednesdayMorning: false,
      WednesdayAfternoon: false,
      WednesdayEvening: false,
      WednesdayNight: false,
      ThursdayMorning: false,
      ThursdayAfternoon: false,
      ThursdayEvening: false,
      ThursdayNight: false,
      FridayMorning: false,
      FridayAfternoon: false,
      FridayEvening: false,
      FridayNight: false,
      SaturdayMorning: false,
      SaturdayAfternoon: false,
      SaturdayEvening: false,
      SaturdayNight: false
    },
  };

  //this function is good
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
      });
  };

  handleAddClass = event => {
    event.preventDefault();
    let classArray=this.state.classes;
    classArray.push(this.state.classID);
    this.setState({
      classes: classArray,
      classID: ""
    });
  }

  //jordan worked on this part...it is working. the objToSave is the data structure that I need...facebook_id will change as it's working with fake data right now
  handleFormSubmit = event => {
    event.preventDefault();
    let schoolCode;
    for (var i = 0; i < this.state.schoolsForAutocomplete.length; i++) {
      if (this.state.school === this.state.schoolsForAutocomplete[i].name){
        schoolCode = this.state.schoolsForAutocomplete[i].code
      }
    }
    const objToSave = {
      isLoading: '',
      results: [],
      value: '',

      name: this.state.name,
      email: this.state.email,
      school: this.state.school,
      schoolCode: schoolCode,
      facebook_id: this.state.facebook_id + 1,
      classStanding: this.state.classStanding,
      classes: this.state.classes,
      methods: this.state.methods,
      times: this.state.times,
      locations: this.state.locations,
      photo: "https://images-na.ssl-images-amazon.com/images/I/71EigcnfsyL.pnghttps://images-na.ssl-images-amazon.com/images/I/71EigcnfsyL.png",
      major: this.state.major,
      minor: this.state.minor,

      flashcardActive: false,
    }
    // need to make check functions here. they will set states and if those states exist, they will highlight where something needs to change
    this.checkFunctions(objToSave);
  };

  updateClassStanding = event => {
    event.preventDefault();
    let standing = this.state.classStanding
    standing.push(EventTarget.dataset.classStanding)
    this.setState({ classStanding: standing })
  };

  setStates = () => {
    this.setState({name: this.state.user.name, email: this.state.user.email, school: this.state.user.school, classStanding: this.state.user.classStanding, classes: this.state.user.classes, objMethods: this.props.user.methods, objLocations: this.props.user.locations, objTimes: this.props.user.times, major: this.state.user.major, minor: this.state.user.minor, photo: this.state.user.photo});
    return("done");
  }

  componentDidMount() {
    console.log("component did mount here is a user")
    // console.log(this.state.user.methods);
    // console.log(this.state.user.locations);
    // console.log(this.state.user.times);
    // this.setState({user: this.props.user});
    const promise = this.setStates();

    promise().then( () => {
      for (var i = 0; i < this.props.user.methods.length; i++) {
        console.log("this ran")
        const  obj  = this.props.user.methods[i];
        console.log(obj);
        console.log(this.props.user.methods[i])
        const methods = {...this.state.methods, [obj]: !this.state.methods[obj] };
        this.setState({methods})
      }
      // console.log("OBJJJJJJ");
      // console.log(this.state.objLocations)
      for (var i = 0; i < this.props.user.locations.length; i++) {
        console.log("this ran")
        const  obj  = this.props.user.locations[i];
        console.log(obj);
        console.log(this.props.user.locations[i])
        const locations = {...this.state.locations, [obj]: !this.state.locations[obj] };
        this.setState({locations})
      }
      for (var i = 0; i < this.props.user.times.length; i++) {
        console.log("this ran")
        const  obj  = this.props.user.times[i];
        console.log(obj);
        console.log(this.props.user.times[i])
        const times = {...this.state.times, [obj]: !this.state.times[obj] };
        this.setState({times})
      }
    }).catch(err => console.log(err));

    // for (var i = 0; i < this.props.user.methods.length; i++) {
    //   console.log("this ran")
    //   const  obj  = this.props.user.methods[i];
    //   console.log(obj);
    //   console.log(this.props.user.methods[i])
    //   const methods = {...this.state.methods, [obj]: !this.state.methods[obj] };
    //   this.setState({methods})
    // }
    // // console.log("OBJJJJJJ");
    // // console.log(this.state.objLocations)
    // for (var i = 0; i < this.props.user.locations.length; i++) {
    //   console.log("this ran")
    //   const  obj  = this.props.user.locations[i];
    //   console.log(obj);
    //   console.log(this.props.user.locations[i])
    //   const locations = {...this.state.locations, [obj]: !this.state.locations[obj] };
    //   this.setState({locations})
    // }
    // for (var i = 0; i < this.props.user.times.length; i++) {
    //   console.log("this ran")
    //   const  obj  = this.props.user.times[i];
    //   console.log(obj);
    //   console.log(this.props.user.times[i])
    //   const times = {...this.state.times, [obj]: !this.state.times[obj] };
    //   this.setState({times})
    // }
  }
    // console.log(this.props);


  componentWillMount() {
    this.resetComponent()
  }

  handleMethodToggle = event => {
    event.preventDefault();
    const { name } = event.target;

    const methods = {...this.state.methods, [name]: !this.state.methods[name]};
    this.setState({
      methods
    });
  }

  handleLocationToggle = event => {
    event.preventDefault();
    const { name } = event.target;

    const location = {...this.state.location, [name]: !this.state.location[name]};
    this.setState({
      location
    });
  }
  
  handleTimeToggle = event => {
    event.preventDefault();
    const { name } = event.target;

    const time = {...this.state.time, [name]: !this.state.time[name]};
    this.setState({
      time
    });
  }

  filterMethods = () => {
    return Object.keys(this.state.methods).filter((option, index) => this.state.methods[option]);
  }
  
  filterLocations = () => {
    return Object.keys(this.state.locations).filter((option, index) => this.state.locations[option]);
  }
  
  filterTimes = () => {
    return Object.keys(this.state.times).filter((option, index) => this.state.times[option]);
  }

  //this starts all the search form autocomplete shit /////////////////////////////////////////////////////////////////////////////////////////
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ school: result.name })

  handleSearchChange = (e, { value }) => {

    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)
      // const tempResults = this.state.results.filter(result => result.state = this.state.state.toUpperCase())
      // this.setState({results: tempResults});

      this.setState({
        isLoading: false,
        results: _.filter(this.state.schoolsForAutocomplete, isMatch),
      })
    }, 300)
  }
  //this ends the autocomplete shit//////////////////////////////////////////////////////////////////////////////////////////////////

  render() { 
    return(
      <Container>
        <h1>this is the settings page</h1>
      </Container>
    )
  }
}

export default SettingsCard;
