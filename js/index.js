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

// Delete Row Button
const removeButtonEvent = () => {
    let removeButtonArray = document.querySelectorAll('.remove-button');
    removeButtonArray.forEach(button => {
        button.addEventListener('click', event => {
            deleteRow(event.target);
        });
    });
}

const updateRemoveButtonIndex = () => {
    let removeButtonArray = document.querySelectorAll('.remove-button');
    removeButtonArray.forEach((button, index) => {
        button.setAttribute('num', index + 1);
    });
}

const deleteRow = (button) => {
    let index = button.getAttribute('num');
    let beatColumns = Array.from(document.querySelector('.beats-container').children);
    let beatInstrument = Array.from(document.querySelector('.dropdowns-container').children);
    let beatVolume = Array.from(document.querySelector('.volumes-container').children);
    let beatPitch = Array.from(document.querySelector('.pitches-container').children);
    removeRow(beatColumns, index, true);
    removeRow(beatInstrument, index, false);
    removeRow(beatVolume, index, false);
    removeRow(beatPitch, index, false);
    button.remove();
    updateRemoveButtonIndex();
}

const removeRow = (array, index, type) => {
    if(type) {
        array.forEach(column => {
            column.children[index].remove();
        });
    } else {
        array[index].remove()
    };
}

// KITS
const kit = ['Instrument 1', 'Instrument 2', 'Instrument 3', 'Instrument 4', 'Instrument 5', 'Instrument 6', 'Instrument 7'];
const preload = ['Instrument 1', 'Instrument 2', 'Instrument 3'];

// Workspace Generator
const loadInstrumentDropdowns = (kit, preload, num) => {
    let instrumentDropdownKit = '';
    for(let i = 0; i < kit.length; i++) {
        instrumentDropdownKit += `<a href="#" class="instrument">${kit[i]}</a>`;
    };
    if(preload[num] == undefined) {
        preload[num] = 'Empty';
    };
    let instrumentDropdownElement = `<div class="instrument-dropdown">
                            <button id="instrument${num}" class="instrument-dropdown instrument-dropdown-button">${preload[num]}</button>
                            <div class="dropdown-content instrument-choice">
                                ${instrumentDropdownKit}
                            </div>
                        </div>`;
    document.querySelector('.dropdowns-container').innerHTML += instrumentDropdownElement;
}

const loadRowDeleteButtons = () => {
    let removeButtonElement = `<i class="bi bi-x-octagon-fill remove-button" num=""></i>`;
    document.querySelector('.close-container').innerHTML += removeButtonElement;
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

const loadNotes = () => {
    let noteElement = `<div class="note">${note}</div>`
}


const createWorkspace = () => {
    let beatsNumber = document.getElementById('beatsInput').value;
    let countsNumber = document.getElementById('countsInput').value;

    
}

// Changing Instruments, Beats, Counts

document.querySelector('#instruments').addEventListener('change', event => {
    let currentInstruments = document.querySelector('.dropdowns-container').children;
    let count = currentInstruments.length;
    while(currentInstruments.length - 1 < event.target.value) {
        loadInstrumentDropdowns(kit, preload, count - 1);
        loadRowDeleteButtons(count - 1);
        // loadBeats();
        // loadCounts();
        // loadNotes();
        loadVolumeControls();
        loadPitchControls();
        updateRemoveButtonIndex();
        addDropDownFunctions();
        removeButtonEvent();
        count++;
    };
    while(currentInstruments.length - 1 > event.target.value) {
        let button = document.querySelectorAll('.remove-button');
        deleteRow(button[button.length - 1]);
    };
})


// For testing
const loadWorkspaceTemp = () => {
    for(let i = 0; i < 7; i++) {
        loadInstrumentDropdowns(kit, preload, i);
        loadRowDeleteButtons(i);
        loadVolumeControls();
        loadPitchControls();
        updateRemoveButtonIndex()
    };
}

const addDropDownFunctions = () => {
    document.querySelectorAll('.instrument-dropdown-button').forEach(button => {
        instrumentDropDown(button);
    });
}

loadWorkspaceTemp();
addDropDownFunctions();
removeButtonEvent(); // << Making new delete buttons needs to remove ALL the delete buttons

// console.log(document.querySelectorAll('.remove-button'));

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