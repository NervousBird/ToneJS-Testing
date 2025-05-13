// import * as Tone from "tone";

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();


// Test Button
document.querySelector('#play').addEventListener('click', async () => {
    await Tone.start();
    console.log('tone started');
    synth.triggerAttackRelease("C4", "8n");
})

// document.querySelector('#test').addEventListener('click', event => {
//     synth.triggerAttackRelease("C4", "8n");
// })

// // create two monophonic synths
// const synthA = new Tone.FMSynth().toDestination();
// const synthB = new Tone.AMSynth().toDestination();
// //play a note every quarter-note
// const loopA = new Tone.Loop((time) => {
// 	synthA.triggerAttackRelease("C2", "8n", time);
// }, "4n").start(0);
// //play another note every off quarter-note, by starting it "8n"
// const loopB = new Tone.Loop((time) => {
// 	synthB.triggerAttackRelease("C4", "8n", time);
// }, "4n").start("8n");
// // all loops start when the Transport is started
// Tone.getTransport().start();
// // ramp up to 800 bpm over 10 seconds
// Tone.getTransport().bpm.rampTo(800, 10);

// // const player = new Tone.Player(
// // 	"https://tonejs.github.io/audio/berklee/gong_1.mp3"
// // ).toDestination();
// // Tone.loaded().then(() => {
// // 	player.start();
// // });

// const sampler = new Tone.Sampler({
// 	urls: {
// 		C4: "C4.mp3",
// 		"D#4": "Ds4.mp3",
// 		"F#4": "Fs4.mp3",
// 		A4: "A4.mp3",
// 	},
// 	release: 1,
// 	baseUrl: "https://tonejs.github.io/audio/salamander/",
// }).toDestination();


// document.querySelector('#button1').addEventListener('click', event => {
//     sampler.triggerAttackRelease(['C4'],1);
// })

// document.querySelector('#button2').addEventListener('click', event => {
//     sampler.triggerAttackRelease(['E4'],1);
// })

// document.querySelector('#button3').addEventListener('click', event => {
//     sampler.triggerAttackRelease(['G4'],1);
// })

// document.querySelector('#button4').addEventListener('click', event => {
//     sampler.triggerAttackRelease(['B4'],1);
// })

// document.querySelector('#button5').addEventListener('click', event => {
//     sampler.triggerAttackRelease(['C5'],1);
// })

const $playing = false;

let $playingInterval;
let $counter = 0;

const $kit1 = [];
const $kit1Preload = [];

let $beatsArray = [];



// let $instrumentDropdownElement = `<div class="instrument-dropdown">
//                         <button id="instrument${num}" class="instrument-dropdown">${kitPreload[index]}</button>
//                         <div class="dropdown-content instrument-choice">
//                             ${instrumentDropdownKit}
//                         </div>
//                     </div>`;

// let $instrumentDropdownKit = `<a href="#" class="instrument">${kit[index]}</a>`;

// let $closeButton = `<div class="remove-button"><i class="bi bi-x-octagon-fill"></i></div>`;




// Buttons

// Play/Pause/Stop
document.querySelector('#play').addEventListener('click', event => {
    if(!$playing) {

    };
})

document.querySelector('#pause').addEventListener('click', event => {
    if($playing) {

    };
})

document.querySelector('#stop').addEventListener('click', event => {
    if($playing) {

    };
})

// Beats Interaction
const toggleNotes = () => { // <<== Un-needed when generating beats
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        noteToggleEvent(note);
    });
}

const noteToggleEvent = note => {
    note.addEventListener('click', event => {
        if(note.getAttribute('checked') == 'true') {
            note.setAttribute('checked', 'false');
        } else {
            note.setAttribute('checked', 'true');
        };
    });
}

toggleNotes();

// Kits Dropdown
document.getElementById('kits').addEventListener('click', event => {
    document.querySelector('.kit-choice').style.display = 'grid';
    event.stopPropagation();
})

document.addEventListener('click', event => {
    let dropdown = document.querySelector('.kit-choice')
    if(dropdown.style.display = 'grid') {
        dropdown.style.display = 'none';
    };
})

document.querySelectorAll('.kit').forEach(option => {
    option.addEventListener('click', event => {
        document.getElementById('kits').innerHTML = event.target.innerHTML;
    })
})

// Instruments Dropdown
const instrumentDropDown = (button) => {
    let dropdown = button.parentElement.querySelector('.instrument-choice');
    button.addEventListener('click', event => {
        dropdown.style.display = 'grid';
        event.stopPropagation();
    });
    document.addEventListener('click', event => {
        if(dropdown.style.display = 'grid') {
            dropdown.style.display = 'none';
        };
    });
    dropdown.querySelectorAll('.instrument').forEach(option => {
        option.addEventListener('click', event => {
            button.innerHTML = event.target.innerHTML;
        });
    });
}



const kit = ['Instrument 1', 'Instrument 2', 'Instrument 3', 'Instrument 4', 'Instrument 5', 'Instrument 6', 'Instrument 7'];
const preload = ['Instrument 1', 'Instrument 2', 'Instrument 3'];

// Workspace Generator

const loadInstrumentDropdowns = (kit, preload, num) => {
    let instrumentDropdownKit = '';
    for(let i = 0; i < kit.length; i++) {
        instrumentDropdownKit += `<a href="#" class="instrument">${kit[i]}</a>`;
    };
    let instrumentDropdownElement = `<div class="instrument-dropdown">
                            <button id="instrument${num}" class="instrument-dropdown">${preload[num]}</button>
                            <div class="dropdown-content instrument-choice">
                                ${instrumentDropdownKit}
                            </div>
                        </div>`;
    document.querySelector('.dropdowns-container').innerHTML += instrumentDropdownElement;
}

const loadRowDeleteButtons = () => {

}

const loadVolumeControls = () => {
    let volumeElement = `<input class='volume' type="range" min="0" max="100">`;
    document.querySelector('.volumes-container').innerHTML += volumeElement;
}

const loadPitchControls = () => {
    let volumeElement = `<input class='pitch' type="range" min="0" max="100">`;
    document.querySelector('.pitches-container').innerHTML += volumeElement;
}

const loadBeats = () => {
    let beatColumn = `<div class="beatCol">
                    <p class="onBeat">${num}</p>`
}

const loadCounts = () => {
    let countColumn = `<div class="countCol">
                    <p class="onCount">.</p>`
}

const loadNote = () => {
    let noteElement = `<div class="note">${note}</div>`
}


const createWorkspace = () => {
    let beatsNumber = document.getElementById('beatsInput').value;
    let countsNumber = document.getElementById('countsInput').value;

    
}


// For testing
loadInstrumentDropdowns(kit, preload, 0); // < do ALL of these before running through and adding the event listeners
loadInstrumentDropdowns(kit, preload, 1);
loadInstrumentDropdowns(kit, preload, 2);

instrumentDropDown(document.getElementById('instrument0'));
instrumentDropDown(document.getElementById('instrument1'));
instrumentDropDown(document.getElementById('instrument2'));

loadVolumeControls();
loadVolumeControls();
loadVolumeControls();

loadPitchControls();
loadPitchControls();
loadPitchControls();

// Play Functions
const playLoop = () => {
    let beatColumns = Array.from(document.querySelector('.beats-container').children);
    beatColumns.forEach(column => {
        column.forEach(beat => {
            if(beat.getAttribute("checked")){
                synth.triggerAttackRelease("C4", "8n");
            };
        });
    });
}