// Import libraries
import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, useParams, useNavigate } from 'react-router-dom';

// Import components
import getCurrentDateTime from '../data/GetDateTime';
import { getSampleById, 
        createSample, 
        editSample } from '../data/api';
import { synth, 
        pianoTap, 
        frenchHornTap, 
        guitarTap, 
        drumTap, 
        piano, 
        frenchHorn, 
        guitar, 
        drum, 
        toneObject} from '../data/ToneInstrument';

// Import css
import './../starterstyles.css';

var instrumentType = [
    {type: "Piano", selectedStatus: true},
    {type: "Frech Horn", selectedStatus: false},
    {type: "Guitar", selectedStatus: false},
    {type: "Drums", selectedStatus: false}
];

const initialKeys = [
  {"B": [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"A": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"G": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"F": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"E": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"D": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"C": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}
];

var tobeUpdatedKeys = [
  {"B": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"A": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"G": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"F": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"E": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"D": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
	{"C": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}
];

const passedKeys = [];

const initialKeysNote = Object.keys(initialKeys);
const initialKeysSeq = Object.values(initialKeys);


const baseURL = 'https://comp2140.uqcloud.net/api/sample/';

const APIKEY = 'gdJY8BdnNf';

const songName = "test";


const SampleCreateEdit = () => {

  // Extracts the "api_key" param from the route.
  const { id } = useParams();

  const [isSaving, setIsSaving] = useState(false); 

  // Allows for navigation.
  const history = useNavigate();

  // Local state for holding the sample's instrument and keys.
  const [sample, setSample] = useState({
    name: '', 
    instrument: '', 
    tobeUpdatedKeys: []
  });


  // Determine whether it's a new sample (POST) or editing an existing one (PUT).
  const isEditing = id !== 'new';
  const method = isEditing ? 'PUT' : 'POST';

  console.log(instrumentType);
  console.log(tobeUpdatedKeys);
  console.log(sample);

  const [instsType, setInstsSelection] = useState(instrumentType);

  /**
     * Fetches sample by API key if it's has been created before.
     * Sets the local state with the feteched data.
     */
  useEffect(() => {
    if (!isEditing) {
      // When creating a new sample, initialize with initialKeys
      setSample({
        ...sample,
        tobeUpdatedKeys: initialKeys,
      });
    } else {
      const fetchSample = async () => {
        const data = await getSampleById(id);
        const recordingData = JSON.parse(data.recording_data)
        // Set the sample state with the fetched data
        setSample({
          id: id,
          name: data.name,
          tobeUpdatedKeys: [...recordingData], 
          instrument: data.type,
        });

        // Set the instrument type based on the fetched data
        instrumentType = instsType.map((inst) => ({
          ...inst,
          selectedStatus: inst.type === data.type,
        }));
        setInstsSelection(instrumentType);
      };
      fetchSample();
    }
  }, [id, isEditing]);

  const toggleInstrument = (inst) => {
    const instResult = instsType.map((_inst) => ({
      ..._inst,
      selectedStatus: _inst.type === inst.type,
    }));
    setInstsSelection(instResult);
    setSample({ ...sample, instrument: inst.type });
  };
    
    const [key, setKeys] = useState(tobeUpdatedKeys);

    // Toggle key selection and changing className
    const toggleNotes = (note, noteSelection) => {
      const newKeys = [...sample.tobeUpdatedKeys]; // Create a new copy of tobeUpdatedKeys
      const noteKey = Object.keys(newKeys[note])[0];
      newKeys[note][noteKey][noteSelection] = !newKeys[note][noteKey][noteSelection];
  
      // Update the local state of sample's tobeUpdatedKeys
      setSample({
        ...sample,
        tobeUpdatedKeys: newKeys,
      });
    };
  

    /**
    * Handles the form submission. 
    * Calls either createSample or editSample based on whether it's a new sample or an existing one.
    */
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      setIsSaving(true); // Set loading to true when save starts
    
      try {
        const formData = {
          api_key: APIKEY,
          name: sample.name,
          type: sample.instrument,
          recording_data: sample.tobeUpdatedKeys,
        };
    
        if (id === 'new') {
          await createSample(formData);
          history('/'); // Redirect to the home page after creating a new sample
        } else {
          await editSample(id, formData);
          // Handle the case of editing an existing sample
          // ...
        }
      } catch (error) {
        // Handle error appropriately
      } finally {
        setIsSaving(false); // Set loading to false when save is complete
      }
    };
    
    

    return (
        <>
            <main>
                <h2 className="title">Edit Sample:</h2>
                <form onSubmit={handleSubmit} className="card edit-card">
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={sample.name}
                        onChange={(e) => setSample({ ...sample, name: e.target.value })}>
                    </input>
                    <div className="button-group-container">
                        <button type="button" className="button">Preview</button>
                        <button type="Submit" className="bright-button">Save</button>
                    </div>
                </form>

                <div className="toggle-row-container">
                    <div className="row-label">
                        <h4>Instrument</h4>
                    </div>
                    <div className="sequence-row-container">
                    {instsType.map((inst) => (
                            <SelectInstrument
                            key={inst.type}
                            instrument={inst.type}
                            selected={inst.selectedStatus}
                            toggleSelection={() => toggleInstrument(inst)}
                          />
                        ))}
                    </div>
                </div>

                {sample.tobeUpdatedKeys.map((keyObject, index) => {
                  const keyName = Object.keys(keyObject)[0];
                  const keyStatuses = keyObject[keyName];

                  return (
                    <div key={keyName} className="toggle-row-container">
                      <div className="row-label">
                        <h4>{keyName}</h4>
                      </div>
                      <div className="sequence-row-container">
                        {keyStatuses.map((status, buttonIndex) => (
                          <button
                            className={status ? "toggle-selected" : "toggle"} // Set className based on status
                            key={`button-${keyName}-${buttonIndex}`}
                            onClick={() => toggleNotes(index, buttonIndex)}
                          ></button>
                        ))}
                      </div>
                    </div>
                  );
                })}


            </main>
        </>
    ); 
};

/**
 * 
 * @param {string} instrument - Instrument selected by user.
 * @param {boolean} selected - Status of instrument selection.
 * @param {*} toggleSelection - Changing the status of instrument selection.
 * @returns 
 */
function SelectInstrument({instrument, selected, toggleSelection}) {
    const handleClick = () => {
        toggleSelection();
    }   

    const buttonClass = selected ? 'toggle-selected' : 'toggle';

  return (
    <button className={buttonClass} onClick={handleClick}>
      {instrument}
    </button>
  );
}

function Preview({ previewing, setPreviewing, toneObject, toneTransport }) {

    function handleButtonClick() {

        toneObject.start();
        toneTransport.stop();

        if(previewing) {
            setPreviewing(false);
            console.log("Preview stopped manually.");
        }
        else {
            setPreviewing(true);
            console.log("Preview started.");
            toneTransport.start();
        }

    }

    return <button onClick={handleButtonClick} className={previewing ? "toggle-selected" : "toggle"}>{previewing ? "Stop Previewing" : "Previewing"}</button>
}

function Sequencer({ toneObject, toneTransport, tonePart }) {
    
    
    const [sequence, setSequence] = useState(initialKeysSeq);

    const initialPreviewing = false;
    const [previewing, setPreviewing] = useState(initialPreviewing);

    useEffect(() => {

        tonePart.clear();
        toneTransport.cancel();

        sequence.filter();
    });
}

function Bar({ barID, barEnabled, handleBarClick, instrument }) {
    function barSelected() {
      return barEnabled ? "selected" : "";
    }
  
    return (
      <div className={`bar bar-${barID} ${barSelected()}`} onClick={() => handleBarClick(barID)}>
        {barID}
      </div>
    );
  }

  function Bars({ sequence, setSequence, instrument }) {
    function handleBarClick(barID) {
      const now = toneObject.now();
  
      // Determine which instrument to trigger based on the selected instrument
      let instrumentToTrigger;
      switch (instrument) {
        case "Piano":
          instrumentToTrigger = piano;
          break;
        case "French Horn":
          instrumentToTrigger = frenchHorn;
          break;
        case "Guitar":
          instrumentToTrigger = guitar;
          break;
        case "Drum":
          instrumentToTrigger = drum;
          break;
        default:
          instrumentToTrigger = synth; // Use a default instrument if none is selected
      }
  
      // Trigger the notes for the selected key using the chosen instrument
      const selectedKeys = sequence[barID - 1].keys;
      selectedKeys.forEach((status, buttonIndex) => {
        if (status) {
          const note = selectedKeys[buttonIndex]; // Assuming you have an array of note values corresponding to your keys
          instrumentToTrigger.triggerAttackRelease(note, "8n", now);
        }
      });
  
      const updatedSequence = sequence.map((bar) =>
        bar.barID === barID ? { ...bar, barEnabled: !bar.barEnabled } : bar
      );
      setSequence(updatedSequence);
    }
  
    return sequence.map((bar) => (
      <Bar
        key={bar.barID}
        barID={bar.barID}
        barEnabled={bar.barEnabled}
        handleBarClick={handleBarClick}
        instrument={instrument}
      />
    ));
}


export default SampleCreateEdit;