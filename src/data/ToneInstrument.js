// Import Tone library
import * as Tone from "tone";

export const toneObject = Tone;

export const toneTransport = toneObject.Transport;

/**
 * Triggers a sound of Piano.
 * @param {string} note - note to be triggered within an octave.
 * @param {integer} time - time interval between a sound is triggered.
 */
export const pianoTap = new toneObject.Part((time, note) => {
    piano.triggerAttackRelease(note + 3, "8n", time);
}, []).start(0);

/**
 * Triggers a sound of Frech Horn.
 * @param {string} note - note to be triggered within an octave.
 * @param {integer} time - time interval between a sound is triggered.
 */
export const frenchHornTap = new toneObject.Part((time, note) => {
    frenchHorn.triggerAttackRelease(note + 3, "8n", time);
}, []).start(0);

/**
 * Triggers a sound of Guitar.
 * @param {string} note - note to be triggered within an octave.
 * @param {integer} time - time interval between a sound is triggered.
 */
export const guitarTap = new toneObject.Part((time, note) => {
    guitar.triggerAttackRelease(note + 3, "8n", time);
}, []).start(0);

/**
 * Triggers a sound of Drum.
 * @param {string} note - note to be triggered within an octave.
 * @param {integer} time - time interval between a sound is triggered.
 */
export const drumTap = new toneObject.Part((time, note) => {
    drum.triggerAttackRelease(note + 3, "8n", time);
}, []).start(0);

export const synth = new toneObject.PolySynth().toDestination();

export const piano = new toneObject.Sampler({
    urls: {
        "B3": "B3.mp3",
        "A3": "A3.mp3",
        "G3": "G3.mp3",
        "F3": "F3.mp3",
        "E3": "E3.mp3",
        "D3": "D3.mp3",
        "C3": "C3.mp3",
    },
    release: 1,
    baseUrl: "samples/piano-acoustic/"
}).toDestination();

export const frenchHorn = new toneObject.Sampler({
    urls: {
        "B3": "B3.mp3",
        "A3": "A3.mp3",
        "G3": "G3.mp3",
        "F3": "F3.mp3",
        "E3": "E3.mp3",
        "D3": "D3.mp3",
        "C3": "C3.mp3",
    },
    release: 1,
    baseUrl: "samples/french-horn-acoustic/"
}).toDestination();

export const guitar = new toneObject.Sampler({
    urls: {
        "B3": "B3.mp3",
        "A3": "A3.mp3",
        "G3": "G3.mp3",
        "F3": "F3.mp3",
        "E3": "E3.mp3",
        "D3": "D3.mp3",
        "C3": "C3.mp3",
    },
    release: 1,
    baseUrl: "samples/guitar-acoustic/"
}).toDestination();

export const drum = new toneObject.Sampler({
    urls: {
        "B3": "B3.mp3",
        "A3": "A3.mp3",
        "G3": "G3.mp3",
        "F3": "F3.mp3",
        "E3": "E3.mp3",
        "D3": "D3.mp3",
        "C3": "C3.mp3",
    },
    release: 1,
    baseUrl: "samples/drum-acoustic/"
}).toDestination();