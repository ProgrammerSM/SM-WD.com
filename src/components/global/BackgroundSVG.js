// Modules
import styled from 'styled-components'

// Data
import { mediumUp } from 'data/media-queries'

const BackgroundSVG = () => {
  console.log('mediumup', mediumUp)
  const isAnimationActive = true
  const tempColor = '#000'
  const BackgroundSVGStyles = styled.svg`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 80vw;
    z-index: 0;
    ${isAnimationActive && 'animation: loadSvg 5s;'}

    ${mediumUp} {
      max-width: 675px;
      max-height: 675px;
    }

    circle {
      transform-origin: center center;
    }

    .circle1,
    .circle2,
    .circle3,
    .circle4,
    .circle5,
    .circle6,
    .circle7,
    .circle8,
    .circle9,
    .circle10,
    .circle11,
    .circle12,
    .circle13 {
      fill: transparent;
    }

    .circle1,
    .circle3,
    .circle4,
    .circle5,
    .circle7,
    .circle9,
    .circle12 {
      stroke: ${tempColor}40;
    }

    .circle2,
    .circle11,
    .circle13 {
      stroke: ${tempColor};
    }

    .circle1,
    .circle4,
    .circle5,
    .circle7,
    .circle10,
    .circle12 {
      stroke-width: 2px;
    }

    .circle2,
    .circle6,
    .circle8,
    .circle11 {
      stroke-width: 4px;
    }

    .circle5,
    .circle6 {
      stroke-dasharray: 23%;
    }

    .circle2 {
      stroke-dasharray: 10%, 1%;
      transform: rotate(2deg);
      ${isAnimationActive && 'animation: continuousRotation 200s linear alternate infinite;'}
    }

    .circle3 {
      stroke-width: 1.5%;
      stroke-dasharray: 1%;
      ${isAnimationActive && 'animation: opacityFlux 30s linear alternate infinite;'}

      ${mediumUp} { stroke-dasharray: .3%; }
    }

    .circle5 {
      transform: rotate(-51deg);
    }

    .circle6 {
      stroke: ${tempColor};
      ${isAnimationActive && 'animation: alternatingRataion 30s linear alternate-reverse infinite;'}
    }

    .circle8 {
      stroke: ${tempColor};
      stroke-dasharray: 21%;
      ${isAnimationActive && 'animation: continuousRotation 200s linear alternate-reverse infinite;'}
    }
    
    .circle9 {
      stroke-width: 5%;
      stroke-dasharray: .8%;
      ${isAnimationActive && 'animation: opacityFlux 30s 2s linear alternate-reverse infinite;'}

      ${mediumUp} { stroke-dasharray: .48%; }
    }

    .circle10 {
      stroke: ${tempColor}40;
    }

    .circle11 {
      stroke: ${tempColor};
      stroke-dasharray: 8% 82%;
      ${isAnimationActive && 'animation: alternatingRataion 200s linear alternate infinite;'}
    }

    .circle12 {
      stroke-dasharray: 35% 75%;
      transform: rotate(61deg);
    }
    
    .circle13 {
      stroke-width: 2%;
      stroke-dasharray: 15% 96%;
      transform: rotate(-13deg);
      ${isAnimationActive && 'animation: alternatingRataion 100s linear alternate-reverse infinite;'}
    }

    @keyframes loadSvg {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes continuousRotation {
      from { transform: rotate(0deg); }
      to { transform: rotate(1800deg); }
    }

    @keyframes alternatingRataion {
      0% { transform: rotate(0deg); }
      10% { transform: rotate(-90deg); }
      20% { transform: rotate(45deg); }
      30% { transform: rotate(-180deg); }
      40% { transform: rotate(45deg); }
      50% { transform: rotate(-20deg); }
      60% { transform: rotate(180deg); }
      70% { transform: rotate(-90deg); }
      80% { transform: rotate(220deg); }
      90% { transform: rotate(-360deg); }
      100% { transform: rotate(0deg); }
    }

    @keyframes opacityFlux {
      0% { stroke: ${tempColor}40; }
      10% { stroke: ${tempColor}80; }
      20% { stroke: ${tempColor}40; }
      30% { stroke: ${tempColor}BF; }
      40% { stroke: ${tempColor}40; }
      50% { stroke: ${tempColor}66; }
      60% { stroke: ${tempColor}40; }
      70% { stroke: ${tempColor}; }
      71% { stroke: ${tempColor}4D; }
      72% { stroke: ${tempColor}; }
      80% { stroke: ${tempColor}40; }
      90% { stroke: ${tempColor}; }
      100% { stroke: ${tempColor}40; }
    }
  `

  return (
    <BackgroundSVGStyles>
      <defs>
        <radialGradient id='highlightGradient'>
          <stop
            offset='0%'
            stopColor='#333'
          />
          <stop
            offset='100%'
            stopColor='transparent'
          />
        </radialGradient>
      </defs>

      <circle
        cx='50%'
        cy='50%'
        fill='url(#highlightGradient)'
        r='48%'
      />

      <circle
        className='circle1'
        cx='50%'
        cy='50%'
        r='5%'
      />

      <circle
        className='circle2'
        cx='50%'
        cy='50%'
        r='7%'
      />

      <circle
        className='circle3'
        cx='50%'
        cy='50%'
        r='9%'
      />

      <circle
        className='circle4'
        cx='50%'
        cy='50%'
        r='11%'
      />

      <circle
        className='circle5'
        cx='50%'
        cy='50%'
        r='14%'
      />

      <circle
        className='circle6'
        cx='50%'
        cy='50%'
        r='14%'
      />

      <circle
        className='circle7'
        cx='50%'
        cy='50%'
        r='20%'
      />

      <circle
        className='circle8'
        cx='50%'
        cy='50%'
        r='20%'
      />

      <circle
        className='circle9'
        cx='50%'
        cy='50%'
        r='24%'
      />

      <circle
        className='circle10'
        cx='50%'
        cy='50%'
        r='28%'
      />

      <circle
        className='circle11'
        cx='50%'
        cy='50%'
        r='28%'
      />

      <circle
        className='circle12'
        cx='50%'
        cy='50%'
        r='35%'
      />

      <circle
        className='circle13'
        cx='50%'
        cy='50%'
        r='35%'
      />
    </BackgroundSVGStyles>
  )
}

export default BackgroundSVG
