import styled from 'styled-components';

const Ball = styled.div`
  background-color: #ff5252;
  width: 160px;
  height: 200px;
  border-radius: 100% / 80% 80% 120% 120%;
  position: relative;
`;

const Face = styled.div`
  background-color: #fca;
  width: 85%;
  height: 55%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 30%;
  border-bottom-right-radius: 30%;
  position: absolute;
  top: ${props => props.top || 'auto'};
  right: ${props => props.right || 'auto'};
  left: ${props => props.left || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
`;

const EyeBrow = styled.div`
  background-color: #000;
  border-radius: 10px;
  width: 7.5%;
  height: 25%;
  position: absolute;
  top: ${props => props.top || 'auto'};
  right: ${props => props.right || 'auto'};
  left: ${props => props.left || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  transform: rotate(${props => props.rotation || '90'}deg);
`;

const Eye = styled.div`
  background-color: #fff;
  width: 20%;
  height: 30%;
  border-radius: 100%;
  position: absolute;
  top: ${props => props.top || 'auto'};
  right: ${props => props.right || 'auto'};
  left: ${props => props.left || 'auto'};
  bottom: ${props => props.bottom || 'auto'};

  ${({border}) => {
      return border ? {
        border: '3px solid #000'
      } : null
  }};
`;

const Pupil = styled.div`
  background-color: #000;
  width: 37%;
  height: 37%;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;

  ${({active}) => {
      return active ? {
        display: 'block'
      } : null
  }};
`;

const Nose = styled.div`
  display: block;
  width: 15%;
  height: 35%;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;
  border-bottom: 0.8vh solid #cc0000;
  
  &:before, &:after {
    content: "";
    display: block;
    width: 100%;
    height: 70%;
    position: absolute;
    bottom: -10%;
    right: -60%;
    border-radius: 50%;
    box-shadow: inset -0.3vh 1vh 0px 0.1vh #cc0000;
  }
  
  &:after {
    right: auto;
    left: -60%;
    box-shadow: inset 0.3vh 1vh 0px 0.1vh #cc0000;
  }
`;

const Mustache = styled.div`
  &:before, &:after {
    content: "";
    box-sizing: border-box;
    display: block;
    width: 28%;
    height: 25%;
    position: absolute;
    top:  ${props => props.top || 'auto'};
    left: ${props => props.left || 'auto'};
    box-shadow: inset 0.8vh -1vh 0px 0.8vh #222222;
    border-radius: 45%;
  }
  &:after {
    left: auto;
    right: ${props => props.right || 'auto'};
    box-shadow: inset -0.8vh -1vh 0px 0.8vh #222222;
  }
`;

const Chin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
  width: 80%;
  height: 20%;
  position: absolute;
  left: 10%;
  bottom: 12% !important;
`;

const ChinMark = styled.div`
  display: block;
  width: ${props => props.width || '6%'};
  height: ${props => props.height || '75%'};
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  box-shadow: inset 2vh 1.5vh 0px 0px gold;
`;

const KanjiMark = styled.p`
  color: gold;
  font-size: 2.3rem;
`;

function DarumaBall() {
  return (
    <Ball>
      <Face top='10%' left='8%'>
        <EyeBrow top='12%' left='20%' rotation='110' />
        <EyeBrow top='12%' right='20%' rotation='65'  />
        <Eye top='35%' left='15%'>
          <Pupil active={true}/>
        </Eye>
        <Eye top='35%' right='15%'>
          <Pupil active={true}/>
        </Eye>
        <Nose />
        <Mustache top='65%' left='9.5%' right='9.5%' />
      </Face>

      <Chin>
        <ChinMark />
        <ChinMark height='100%' />
        <KanjiMark>幸</KanjiMark>
        <ChinMark height='100%' />
        <ChinMark />
      </Chin>
    </Ball>
  )
}

// https://codepen.io/william-index/pen/pJZpgN
// https://codepen.io/alvaromontoro/pen/KKMWWLv

export default DarumaBall;