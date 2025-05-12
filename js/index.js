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


document.querySelector('#play').addEventListener('click', event => {

})

document.querySelector('#stop').addEventListener('click', event => {

})

const playLoop = () => {
    let beatColumns = Array.from(document.querySelector('.beats-container').children);
    beatColumns.forEach(column => {
        column.forEach(beat => {
            if(beat.getAttribute("checked")){
                
            }
        })
    })
}

const toggleBeats = togglebeats => {
    const beats = document.querySelectorAll('.beat');
    beats.forEach(beat => {
        beatToggleEvent(beat);
    });
}

const beatToggleEvent = beat => {
    beat.addEventListener('click', event => {
        if(beat.getAttribute('checked') == 'true') {
            beat.setAttribute('checked', 'false');
        } else {
            beat.setAttribute('checked', 'true');
        };
    });
}

toggleBeats();



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
    console.log(option);
    option.addEventListener('click', event => {
        document.getElementById('kits').innerHTML = event.target.innerHTML;
    })
})

