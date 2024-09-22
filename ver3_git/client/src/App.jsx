import { useState, useEffect, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Main } from './components/main'
import { calcWindowParam } from './components/calcWindowParam.js'
import { values } from './components/VALUES.jsx'
import { Nav } from './components/nav.jsx'
import { Planet } from './components/planet.jsx'
import { wheelScale } from './components/wheelScale.js'
import { mouseMovement } from './components/mouseMovement.js'
import { drawCircle } from './components/drawCircle.js'
import { PlanetSlider } from './components/planetDescr.jsx'
import { useContext } from 'react'

//---------------------------------------------------------------------------
import { earthPage } from './planetPages/earth.jsx'
import { sunPage } from './planetPages/sun.jsx'
import { mercuryPage } from './planetPages/mercury.jsx'
import { venusPage } from './planetPages/venus.jsx'
import { marsPage } from './planetPages/mars.jsx'
import { jupiterPage } from './planetPages/jupiter.jsx'
import { saturnPage } from './planetPages/saturn.jsx'
import { neptunePage } from './planetPages/neptune.jsx'
import { uranusPage } from './planetPages/uranus.jsx'
//---------------------------------------------------------------------------


import { useRef } from 'react'
const innParPerc = values.innerParamPercent;

function drawCanvBase(ctx) {
  ctx.fillRect(0, 0, 1000, 1000);
}

function renderPlanet(planet, ctx, impValues, setCurrPlanet) {
  planet.renderPlanet(ctx, impValues.scale, impValues.changeX, impValues.changeY);
  planet.setCurrCoords(planet.currAngle)
  planet.setNextAngle();
}

function planetClicked(hoverElId, planets, impValues, setCurrPlanet){
  let mouseHover = false;
  document.getElementById(hoverElId).addEventListener('mouseover', (event)=>{mouseHover = true})
  document.getElementById(hoverElId).addEventListener('mouseleave', ()=>{
    mouseHover = false;
  })
  addEventListener('click', (event)=>{
    if(!mouseHover){
      console.log(
        'x: ' + event.clientX + '\ny: '+ event.clientY
      )
      planets.reduce((prev, curr, i)=>{
        let check = planets[i].InProximity(+event.clientX, +event.clientY, impValues.scale, impValues.changeX, impValues.changeY);
        if(check){
          setCurrPlanet(i);
          console.log(i + ' abaababba');
        }
      }, planets[0])
    }
  })
}

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function App() {
  const [count, setCount] = useState(0)
  let main = new Main();

  // function reducer(state, action){
  //   return {
  //     interval: action.newInterval + ''
  //   };
  // }

  // let [planetsState, dispatch] = useReducer(reducer, {
  //   interval: ''
  // })

  // useEffect(() => {
  //   async function foo() {
  //     let res = await fetch('http://localhost:2007/api')
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.text();
  //         }
  //         else {
  //           console.log('Something went wrong');
  //         }
  //       })
  //       .then((res) => {
  //         return res;
  //       })
  //     console.log(res);
  //   }

  //   foo();
  // })

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  let intervalRef = useRef('0');
  //________________________________Planets_____________________________________________________________________-
  let sun = new Planet;
  sun.setValues('src/assets/sun.png', 0, 0, centerX, centerY, 0, 150);
  sun.waitImageLoad(300, 300);
  sun.setRenderComp(sunPage);

  let mercury = new Planet;
  mercury.setValues('src/assets/mercury.png', 250, 0.1, centerX, centerY, 30, 25);
  mercury.waitImageLoad(50, 50);
  mercury.setRenderComp(mercuryPage);

  let venus = new Planet;
  venus.setValues('src/assets/venus.png', 550, 0.04, centerX, centerY, 50, 50);
  venus.waitImageLoad(100, 100);
  venus.setRenderComp(venusPage);

  let earth = new Planet;
  earth.setValues('src/assets/earth.png', 900, 0.025, centerX, centerY, 160, 60);
  earth.waitImageLoad(120, 120);
  earth.setRenderComp(earthPage)

  let mars = new Planet;
  mars.setValues('src/assets/mars.png', 1300, 0.0125, centerX, centerY, 70, 50);
  mars.waitImageLoad(100, 100);
  mars.setRenderComp(marsPage);

  let jupiter = new Planet;
  jupiter.setValues('src/assets/jupiter.png', 1900, 0.002, centerX, centerY, 0, 125);
  jupiter.waitImageLoad(250, 250);
  jupiter.setRenderComp(jupiterPage);

  let saturn = new Planet;
  saturn.setValues('src/assets/saturn.png', 2400, 0.001, centerX, centerY, 180, 125);
  saturn.waitImageLoad(250, 250);
  saturn.setRenderComp(saturnPage);

  let uranus = new Planet;
  uranus.setValues('src/assets/uranus.png', 2900, 0.0003, centerX, centerY, 270, 100);
  uranus.waitImageLoad(200, 200);
  uranus.setRenderComp(uranusPage)

  let neptune = new Planet;
  neptune.setValues('src/assets/neptune.png', 3400, 0.00015, centerX, centerY, 60, 90);
  neptune.waitImageLoad(180, 180);
  neptune.setRenderComp(neptunePage);

  let planets = new Array();
  planets.push(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);
  //-------------------------------------------------------------------------------------------------------------


  //dispatch({newInterval: int})
  useEffect(() => {
    let canv = document.getElementById('canvMain');
    let ctx = canv.getContext('2d');

    let backgroundImg = new Image();
    backgroundImg.src = 'src/assets/main_back2.png'

    let windowH = +calcWindowParam(+window.innerHeight, innParPerc);
    let windowW = +calcWindowParam(+window.innerWidth, innParPerc);

    let pattern;
    backgroundImg.onload = () => {
      pattern = ctx.createPattern(backgroundImg, "repeat");
      ctx.fillStyle = pattern;
    }

    let impValues = {
      scale: 1,
      mouseDown: false,
      changeX: 0,
      changeY: 0,
      currPlanet: 0
    }
    //let scale = 1;
    const deltaScale = 0.025;
    const deltaChange = 2;
    const speed = 1;

    clearInterval(intervalRef.current);
    let int = setInterval(() => {
      for (let i = 0; i < speed; i++) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canv.width, canv.height);
        //ctx.drawImage(test, 250 + planet1.currX, 250 + planet1.currY)
        // drawCircle(ctx, 'white', 1, 360, centerX, centerY, 250, impValues.scale, impValues.changeX, impValues.changeY, (scale)=>{
        //   return (scale < 0.2? 1 - scale: 1);
        // });
        renderPlanet(sun, ctx, impValues);
        renderPlanet(mercury, ctx, impValues);
        renderPlanet(earth, ctx, impValues);
        renderPlanet(venus, ctx, impValues)
        renderPlanet(mars, ctx, impValues);
        renderPlanet(jupiter, ctx, impValues);
        renderPlanet(saturn, ctx, impValues);
        renderPlanet(uranus, ctx, impValues);
        renderPlanet(neptune, ctx, impValues);
      }
    }, 20)
    intervalRef.current = int + '';
    console.log(int + ' int');

    //-------------------------------------------------------------------------------------------------------------------------------
    const MAX_SCALE = values.maxScale;
    const MIN_SCALE = values.minScale;
    wheelScale(impValues, deltaScale, 'sliderMain', MAX_SCALE, MIN_SCALE);
    mouseMovement(impValues, deltaChange)
    planetClicked('sliderMain', planets, impValues, setCurrPlanet);
    //-------------------------------------------------------------------------------------------------------------------------------
  }, [])

  let [currPlanet, setCurrPlanet] = useState(0);
  return (
    <>
      <Nav></Nav>
      <PlanetSlider currPlanet={currPlanet} display='true' planets={planets}></PlanetSlider>
      <main.render></main.render>
      {/* <button onClick={() => {
        console.log(currPlanet + 'bogusus');
      }}>bogus</button> */}
    </>
  )
}

export default App
