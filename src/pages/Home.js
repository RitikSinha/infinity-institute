import {Link ,Redirect} from 'react-router-dom';
import Team from '../components/team'
import Courses from '../components/courses'
import Homehead from '../components/homehead'
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from '../context/authContex';

const Home = () => {
   const {currentUser} = useContext(AuthContext);


    if(currentUser==null){
        return ( <><header>
            <div id="section-1">
                <div id="div-1">
                    <h1 id="heading">Shape your future</h1>
                    <p id="subheading">Prepare for your exam by the best teachers in town.</p>
                    <Link to="/signup" id="register">REGISTER NOW</Link>
                </div>
            </div>
        </header>
      <Homehead/>
    <Team/>
    <Courses/>
        </> );
    }
    return (
        <Redirect to='/dashboard'/>
      );

}
 
export default Home;