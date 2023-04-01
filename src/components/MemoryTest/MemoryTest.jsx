import React, { useState } from 'react'
import './MemoryTest.css';

function generateRandomNumber(min, max, prev, prevToPrev) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    while (randomNumber === prev || randomNumber === prevToPrev) {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randomNumber;
}
const ids = ["grid_col_0", "grid_col_1", "grid_col_2", "grid_col_3", "grid_col_4", "grid_col_5", "grid_col_6", "grid_col_7", "grid_col_8"];
const STARTING = "starting", SHOWING_ROUND = "showing_round", CLICK_PHASE = "click_phase", ENDING = "ending";
let currentClickCount = 0;

const MemoryTest = () => {

    const [pattern, setPattern] = useState([]);
    const [state, setState] = useState(STARTING); // states : starting, showing_round, click_phase, ending

    // -------------------- TODO --------------------
    const NO_ISSUES_CONTINUE_THE_PROCESS_ANIMATION = () => {
        console.log("NO_ISSUES_CONTINUE_THE_PROCESS_ANIMATION");
    };
    const SHOW_ROUND_END_ANIMATION = () => {
        console.log("SHOW_ROUND_END_ANIMATION");
    };
    const SHOWING_ROUND_END_ANIMATION = () => {
        console.log("SHOWING_ROUND_END_ANIMATION");
    }
    const TEST_ENDING_ANIMATION = () => {
        console.log("TEST_ENDING_ANIMATION");
    }
    // ----------------------------------------------

    const onStart = () => {
        currentClickCount = 0;
        setPattern([]);
        setState(SHOWING_ROUND);
        setTimeout(showNextRound, 100);
    }
    const forceStop = () => {
        currentClickCount = 0;
        setPattern([]);
        setState(STARTING);
        // TODO: stop setTimeouts also !
    }
    const onTryAgain = () => {
        currentClickCount = 0;
        setPattern([]);
        setState(STARTING);
    }

    const showNextRound = () => {

        const newBlock = generateRandomNumber(0, 8, pattern.length === 0 ? 9 : pattern[pattern.length - 1], pattern.length <= 1 ? 9 : pattern[pattern.length - 2]);
        setPattern(prev => [...prev, newBlock]);

        const elements = ids.map(id => document.getElementById(id));
        const duration = 600;

        // using this function so as to get most updated value of pattern !
        setPattern(pattern => {
            pattern.forEach((indx, id) => {
                setTimeout(() => {
                    elements[indx].classList.add("grid_active");
                    setTimeout(() => {
                        elements[indx].classList.remove("grid_active");
                        if (id == pattern.length - 1) {
                            // reached the end !
                            SHOWING_ROUND_END_ANIMATION();
                            setState(CLICK_PHASE);
                        }
                    }, duration - 10);
                }, (id + 1) * duration);
            });
            return pattern;
        });

    }

    const generalClickHandler = event => {
        event.preventDefault();
        const id = event.target.id;
        const idIndx = ids.findIndex(value => value === id);

        if (state !== CLICK_PHASE || idIndx === -1) return;

        if (idIndx === pattern[currentClickCount]) {
            NO_ISSUES_CONTINUE_THE_PROCESS_ANIMATION();
            if (currentClickCount === pattern.length - 1) {
                SHOW_ROUND_END_ANIMATION();
                currentClickCount = 0;
                setState(SHOWING_ROUND);
                showNextRound();
            } else currentClickCount++;
        } else {
            setState(ENDING);
            TEST_ENDING_ANIMATION();
        }
    }

    return (
        <section id="memory-test" className="grid_container">
            <div className="grid_gridWrapper">
                {(state === STARTING) && <>
                    <div className='grid_startContainer'>
                        <div className='grid_start_img' />
                        <h1 className='grid_start_h1'>Sequence Memory Test</h1>
                        <h3 className='grid_start_h3'>Memorize the pattern !</h3>
                        <button onClick={onStart} className='grid_start_btn'>Start</button>
                    </div>
                </>}
                {(state === ENDING) && <>
                    <div className='grid_startContainer'>
                        <h1 className='grid_start_h1'>GAME OVER</h1>
                        <p className='grid_end_p'>Your Score in Sequence Memory Test is :</p>
                        <div className='grid_end_level_div'>Level: {pattern.length}</div>
                        <button onClick={onTryAgain} className='grid_start_btn'>Try Again</button>
                    </div>
                </>}
                {(state !== STARTING && state !== ENDING) && <>
                    <div className="grid_level">
                        <span className="grid_levelSpan">Level: </span>
                        <span>{pattern.length}</span>
                    </div>
                    <div id="grid_grid" className={`grid_grid ${state}`} onClick={generalClickHandler}>
                        <div className="grid_row">
                            <div id="grid_col_0" className="grid_col"></div>
                            <div id="grid_col_1" className="grid_col"></div>
                            <div id="grid_col_2" className="grid_col"></div>
                        </div>
                        <div className="grid_row">
                            <div id="grid_col_3" className="grid_col"></div>
                            <div id="grid_col_4" className="grid_col"></div>
                            <div id="grid_col_5" className="grid_col"></div>
                        </div>
                        <div className="grid_row">
                            <div id="grid_col_6" className="grid_col"></div>
                            <div id="grid_col_7" className="grid_col"></div>
                            <div id="grid_col_8" className="grid_col"></div>
                        </div>
                    </div>
                </>}
            </div>
            {(state !== STARTING && state !== ENDING) && <a href='/' className='grid_a'>Go Back</a>}
        </section>
    )
}

export default MemoryTest;
