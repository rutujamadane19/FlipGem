import React from 'react';
import './About.css'
import { GitHub, TravelExplore } from '@mui/icons-material';

const About = () => {
    return (
        <div className="we-are-block">
            <div id="about-us-section">
                <div className="about-us-image">
                    <img
                        src="./team1.jpg"
                        width="700"
                        height="458"
                        alt="Lobby Image"
                    />
                </div>
                <div className="about-us-info" >
                    <h2 style={{color:"whitesmoke", fontFamily:'Inconsolata, monospace'}}>We are System Slayers</h2>
                    <p style={{color:'whitesmoke'}}>
 We are a dynamic team of dedicated individuals and our mission is to bring innovative ideas to life through technology. We're committed to embracing challenges, collaborating effectively, and delivering solutions that make a meaningful impact. With a focus on continuous learning and growth, we aim to carve a path towards excellence in the field of computer science and beyond.
                    </p>
                    <a href="https://github.com/NeutronHive/FLipGem" target='_blank' style={{backgroundColor:"white",padding:"5px",display:"flex", alignItems:'center', color:'black', fontSize:'14px', justifyContent:'center'}} title="About Us Button">
                        <div style={{fontWeight:'bolder', fontFamily:'monospace'}}>View GitHub</div>
                        <GitHub style={{fontSize:"1.5rem", marginLeft:'4px'}}/>
                    </a>
                </div>
            </div>
            <div id="history-section">
                <div className="history-image">
                    <img
                        src="./griidproj1.jpeg"
                        width="808"
                        height="471"
                        alt="Building Pic"
                    />
                </div>
                <div className="history-info">
                    <h2 style={{fontFamily:'Inconsolata, monospace'}} >Flipkart Grid 5.0 Project</h2>
                    <p>
                    Our blockchain-based platform enhances E-commerce loyalty programs through transparent rewards, utilizing fungible tokens for engagement. Brands and partners can seamlessly manage tokens, while users track their rewards. The user-friendly blue-gold portal simplifies token issuance and offers a verifiable, scalable solution.
                    </p>
                    <a href="/" title="History Button" style={{backgroundColor:"#111",color:'whitesmoke',padding:"5px",display:"flex", alignItems:'center', fontSize:'14px', justifyContent:'center'}}>
                    <div style={{fontWeight:'bolder', fontFamily:'monospace'}}>Explore</div>
                        <TravelExplore style={{fontSize:"1.5rem", marginLeft:'4px'}}/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
