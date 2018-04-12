import React from "react";
import "./PracticeProfileLayout.css";
import { Card, Image, Container, Button, List, Transition } from 'semantic-ui-react'



    const PracticeProfileLayout = (props) => {
    // state = { items: profiles.slice(0) }
    //handleNext = () => this.setState({ items: users.slice(this.state.items.length + 1) })
      console.log(props);
      return(
      <div>
        <Container>
        {props.profiles.data.map(profile => (
            <Card fluid style={{marginTop: 20}} align="center" key={profile._id}>
              {/* <Segment align="center"> */}
                <Image src={profile.photo} size='small' />
                <h2>Name: {profile.name}</h2>
                <h2>Class: {profile.classStanding}</h2>
                <h3>Major: {profile.major}</h3>
                {profile.minor ? 
                  <h3>Minor: {profile.minor}</h3>
                  : "" 
                }
              {/* </ Segment> */}
            </ Card>
        /*
            <div>
                <Button.Group>
                    <Button={items.length === profiles.length} icon='plus' onClick={this.handleNext} />
                 </Button.Group>
             </div>

                 <Transition.Group
                    as={List}
                    duration={200}
                    divided
                    size='huge'
                    verticalAlign='middle'
                  >
                  {profiles.map(item => (
                    <List.Item key={item}>
                       <Card fluid style={{marginTop: 20}} align="center" key={profile._id}>
                       { <Segment align="center"> }
                      /<Image src={profile.photo} size='small' />
                       <h2>Name: {profile.name}</h2>
                       <h2>Class: {profile.classStanding}</h2>
                       <h3>Major: {profile.major}</h3>
                        {profile.minor ? 
                         <h3>Minor: {profile.minor}</h3>
                            : "" 
                       }
                      { Segment> } 
                    ))}
                     < /Card >
          */
                  
      

        ))}
        </ Container>
        {/* <Card
          image='/assets/images/avatar/large/elliot.jpg'
          header='Elliot Baker'
          meta='Friend'
          description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        /> */}
      </div>
      );
    }

export default PracticeProfileLayout;
