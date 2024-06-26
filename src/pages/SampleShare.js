import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink , useParams } from 'react-router-dom';
import { getSampleById, editSample } from '../data/api';
import { guitarTap, piano, frenchHorn } from '../data/ToneInstrument';
import './../starterstyles.css';

const APIKEY = 'gdJY8BdnNf';

const SampleShare = () => {
    const [sample, setSample] = useState([]);  
    
    const { api_key } = useParams();
    
    // Added state for sharing
    const [isSharing, setIsSharing] = useState(true);

    /**
     * Fetches the sample by its api_key.
     * Sets the local state with the fetched data.
     */
    useEffect(() => {
        const fetchSample = async () => {
            const data = await getSampleById(api_key);
            setSample(data);
        };
        // call the async fetchSample function
        fetchSample();
    }, [api_key]);

    return (
        <>
            <main>
            <h2 className="title">Share This Sample</h2>

                <div className="card">
                    <div className="song-details">
                        <h3>Sample Name</h3>
                        <p>Date Created</p>
                    </div>
                    <div className="buttons">
                        <a href="#" class="bright-button" >Preview</a>
                    </div>
                </div>

                <div className="toggle-row-container">
                    <div className="location-name-label">
                        <h4>Location 1</h4>
                    </div>
                    <div className="sequence-row-container">
                        <button className="toggle-selected" >Shared</button>
                        <button className="toggle">Not Shared</button>
                    </div>
                </div> 
            </main>
        </>
    );
};

export default SampleShare;