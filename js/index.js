// import * as Tone from "tone";

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

async() => {
    await Tone.start();
}

// Test Button
// document.querySelector('#play').addEventListener('click', async () => {
//     await Tone.start();
//     console.log('tone started');
//     synth.triggerAttackRelease("C4", "8n");
// })

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

const sampler = new Tone.Sampler({
	urls: {
		C4: "C4.mp3",
		"D#4": "Ds4.mp3",
		"F#4": "Fs4.mp3",
		A4: "A4.mp3",
	},
	release: 1,
	baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();


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

let $playing = false;

let $playingInterval;
let $counter = 0;

const beatContainer = document.querySelector('.beats-container');
const instrumentSet = document.getElementById('kits');

// KITS
const kit = ['Instrument 1', 'Instrument 2', 'Instrument 3', 'Instrument 4', 'Instrument 5', 'Instrument 6', 'Instrument 7'];
const preload = ['Instrument 1', 'Instrument 2', 'Instrument 3', 'Instrument 4', 'Instrument 5', 'Instrument 6'];

const kitPiano = ['G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'G3', 'F3', 'E3', 'D3', 'C3', 'B2', 'A2'];
const kitPianoPreload = ['G5', 'F5', 'E5', 'D5', 'C5', 'B5', 'A5', 'G4', 'F4', 'E4', 'D4', 'C4', 'B4', 'A4', 'G3', 'F3', 'E3', 'D3', 'C3', 'B2', 'A2'];

const kitArrayDict = {
  "Synth Piano": [kitPiano, kitPianoPreload, 'load sound library?'], 
  "Basic Set": ['', '', '']
}



let $beatsArray = [];

// Buttons

// Play/Pause/Stop
document.querySelector('#play').addEventListener('click', event => {
    playLoop();
    console.log('test');
    if(!$playing) {
        // playLoop();
    };
})

document.querySelector('#pause').addEventListener('click', event => {
    if($playing) {
        stopPlaying();
    };
})

document.querySelector('#stop').addEventListener('click', event => {
    if($playing) {
        stopPlaying();
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
    });
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
    document.getElementById('instruments').value = Array.from(document.querySelector('.dropdowns-container').children).length -1;
}

const removeRow = (array, index, type) => {
    if(type) {
        array.forEach(column => {
            column.children[index].remove();
        });
    } else {
        array[index].remove();
    };
}

document.getElementById('overflow').addEventListener('click', event => {
    beatContainer.style.overflow = 'auto';
    beatContainer.style.flexWrap = 'nowrap';
})

document.getElementById('wrap').addEventListener('click', event => {
    beatContainer.style.overflow = 'none';
    beatContainer.style.flexWrap = 'wrap';
})

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

const loadBeats = (num) => {
    let beatColumn = `<div class="beatCol">
                    <p class="onBeat">${num + 1}</p>`;
    let instruments = document.querySelector('#instruments').value;
    for(let i = 0; i < instruments; i++) {
        beatColumn += `<div class="note" checked="false">${num + 1}</div>`
    };
    beatContainer.innerHTML += beatColumn;
    toggleNotes();
}

const loadCounts = () => {
    let countColumn = `<div class="countCol">
                    <p class="onCount">.</p>`
    let instruments = document.querySelector('#instruments').value;
    for(let i = 0; i < instruments; i++) {
        countColumn += `<div class="note" checked="false">.</div>`
    };
    beatContainer.innerHTML += countColumn;
    toggleNotes();
}

const loadNotes = () => {
    let columnsArray = Array.from(beatContainer.children);
    columnsArray.forEach(column => {
        let note = column.querySelector('p').innerHTML;
        column.innerHTML += `<div class="note" checked="false">${note}</div>`;
    });
    toggleNotes();
}

const loadNoteChecks = (checksArray) => {
    let notesArray = Array.from(document.querySelectorAll('.note'));
}

// Changing Instruments, Beats, Counts
const instrumentUpdater = (event) => {
    let currentInstruments = document.querySelector('.dropdowns-container').children;
    let count = currentInstruments.length;
    let kit = kitArrayDict[instrumentSet.innerHTML][0];
    let preload = kitArrayDict[instrumentSet.innerHTML][0];
    document.getElementById('instruments').value = preload.length;
    while(currentInstruments.length - 1 < event) {
        loadInstrumentDropdowns(kit, preload, count - 1);
        loadRowDeleteButtons(count - 1);
        loadNotes();
        loadVolumeControls();
        loadPitchControls();
        updateRemoveButtonIndex();
        addDropDownFunctions();
        removeButtonEvent();
        count++;
    };
    while(currentInstruments.length - 1 > event) {
        let button = document.querySelectorAll('.remove-button');
        deleteRow(button[button.length - 1]);
    };
}

const beatUpdater = (event) => {
    let beatsInput = event;
    let beatsAmount = beatContainer.querySelectorAll('.beatCol').length;
    let countsAmount = document.getElementById('countsInput').value;
    while(beatsAmount < beatsInput) {
        loadBeats(beatsAmount); // MAKE THE ADDING WORK
        for(let i = 0; i < countsAmount; i++) {
            loadCounts();
        }
        beatsAmount = beatContainer.querySelectorAll('.beatCol').length;
    };
    while(beatsAmount > beatsInput) {
        beatContainer.lastChild.remove();
        beatsAmount = beatContainer.querySelectorAll('.beatCol').length;
    };
}

const countUpdater = (event) => {
    let countsAmount = beatContainer.querySelectorAll('.countCol').length;
    let countColumn = `<div class="countCol">
                    <p class="onCount">.</p>`
    let instruments = document.querySelector('#instruments').value;
    for(let i = 0; i < instruments; i++) {
        countColumn += `<div class="note" checked="false">.</div>`
    };
    let beatColumns = beatContainer.querySelectorAll('.beatCol');
    console.log(countsAmount, event * document.querySelector('#beatsInput').value);
    while(countsAmount < event * document.querySelector('#beatsInput').value) {
        beatColumns.forEach(column => {
            column.insertAdjacentHTML("afterend", countColumn);
        });
        countsAmount = beatContainer.querySelectorAll('.countCol').length;
    };
    while(countsAmount > event * document.querySelector('#beatsInput').value) {
        beatColumns.forEach(column => {
            column.nextSibling.remove();
        });
        countsAmount = beatContainer.querySelectorAll('.countCol').length;
    };
    toggleNotes();
}

document.querySelector('#instruments').addEventListener('change', event => {
    instrumentUpdater(event.target.value);
});

document.querySelector('#beatsInput').addEventListener('change', event => {
    beatUpdater(event.target.value);
});

document.querySelector('#countsInput').addEventListener('change', event => {
    countUpdater(event.target.value);
})

// For testing
const loadWorkspace = () => {
    let kit = kitArrayDict[instrumentSet.innerHTML][0];
    let preload = kitArrayDict[instrumentSet.innerHTML][0];
    document.getElementById('instruments').value = preload.length;
    for(let i = 0; i < document.getElementById('instruments').value; i++) {
        loadInstrumentDropdowns(kit, preload, i);
        loadRowDeleteButtons(i);
        loadVolumeControls();
        loadPitchControls();
        updateRemoveButtonIndex();
        beatUpdater(document.querySelector('#beatsInput').value);
    };
}

const addDropDownFunctions = () => {
    document.querySelectorAll('.instrument-dropdown-button').forEach(button => {
        instrumentDropDown(button);
    });
}

loadWorkspace();
addDropDownFunctions();
removeButtonEvent(); // << Making new delete buttons needs to remove ALL the delete buttons

// Play Functions
const playLoop = () => {
    let timer = 60000 / (document.getElementById('tempo').value * document.getElementById('countsInput').value);
    let columnsToPlay = parseInt(document.getElementById('beatsInput').value) * (parseInt(document.getElementById('countsInput').value) + 1);
    let beatColumns = Array.from(beatContainer.children);
    let instruments = Array.from(document.querySelectorAll('.instrument-dropdown-button'));

    $playingInterval = setInterval(function() {playNote(beatColumns, columnsToPlay, instruments)}, timer);
    $playing = true;
}

const playNote = (notesArray, toPlay, instruments) => {
    let notes = Array.from(notesArray[$counter].children);

    notes.forEach((note, index) => {
        if(note.getAttribute('play') == 'true') {
            note.setAttribute('play', 'false');
        } else {
            note.setAttribute('play', 'true');
        };
        if(note.getAttribute('checked') == 'true') {
            console.log(instruments[index-1].innerHTML);
            sampler.triggerAttackRelease([instruments[index - 1].innerHTML], 1);
        };
    });

    $counter += 1;
    if($counter == toPlay) {
        $counter = 0;
    };
}

const stopPlaying = () => {
    clearInterval($playingInterval);
    resetNotes();
    $playing = false;
}

const resetNotes = () => {
    let notes = Array.from(document.querySelectorAll('.note,.onBeat,.onCount'));
    notes.forEach(note => {
      note.setAttribute('play', 'false');
    });
    $counter = 0;
}