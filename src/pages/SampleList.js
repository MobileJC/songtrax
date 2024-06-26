// Import libaries
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Link, useParams } from 'react-router-dom';

// Import components
import getCurrentDateTime from '../data/GetDateTime';
import SampleShare from './SampleShare';
import { getAllSamples } from '../data/api';
import { guitarTap, piano, frenchHorn } from '../data/ToneInstrument';

// Import css
import './../starterstyles.css';

const APIKEY = 'gdJY8BdnNf';

const newSample = 'new';

const SampleList = () => {

    const { id } = useParams();

    const [samples, setSamples] = useState([]);

    // Add state for loading
    const [isLoading, setIsLoading] = useState(true);
    

    // fetch sample data from Django, parsed as json
    useEffect(() => {
        const fetchSample = async () => {
            setIsLoading(true); // Start loading
            const data = await getAllSamples();
            console.log(data);
            setSamples(data);
            setIsLoading(false); // End loading
            console.log(data);
        };
        // call the async fetchSample function
        fetchSample();
    }, []);

    return (
        <>
            <h2 className="title">Your Song Samples</h2>
            <div className="create-card">        
                <Link to={`/SampleCreateEdit/${newSample}`} className="bright-button">Create Sample</Link>
            </div>

            <section className="sample">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                samples.map((sample) => (
                    <div className="card">
                        <div className="song-details">
                            <h3>{sample.name}</h3>
                            <p>Date Created: {sample.datetime}</p>
                        </div>
                        <div class="button-group-container">
                                <Link to={`/SampleShare/${sample.id}`} className="button">Share</Link>
                            <button className="button">Preview</button>
                                <Link to={`/SampleCreateEdit/${sample.id}`} className="bright-button">Edit</Link>
                        </div>
                    </div>
                ))
            )}
        </section>

        <div className="create-card">
            <Link to={`/SampleCreateEdit/${newSample}`} className="bright-button">Create Sample</Link>
        </div>
    </>
    );
};

export default SampleList;
