import styled from 'styled-components';

const Ball = styled.div`
  background-color: #ff5252;
  width: 250px;
  height: 300px;
  border-radius: 100% / 80% 80% 120% 120%;
  position: relative;
`;

const Face = styled.div`
  background-color: #fca;
  width: 80%;
  height: 40%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 30%;
  border-bottom-right-radius: 30%;
  position: absolute;
  top: ${props => props.top || 'none'};
  right: ${props => props.right || 'none'};
  left: ${props => props.left || 'none'};
  bottom: ${props => props.bottom || 'none'};
`;

const EyeBrow = styled.div`
  background-color: #000;
  border-radius: 10px;
  width: 5%;
  height: 37%;
  position: absolute;
  top: ${props => props.top || 'none'};
  right: ${props => props.right || 'none'};
  left: ${props => props.left || 'none'};
  bottom: ${props => props.bottom || 'none'};
  transform: rotate(${props => props.rotation || '90'}deg);
`;

const Eye = styled.div`
  background-color: #fff;
  width: 20%;
  height: 37%;
  border-radius: 100%;
  position: absolute;
  top: ${props => props.top || 'none'};
  right: ${props => props.right || 'none'};
  left: ${props => props.left || 'none'};
  bottom: ${props => props.bottom || 'none'};

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
`;

function DarumaBall() {
  return (
    <Ball>
      <Face top='50px' left='25px'>
        <EyeBrow top='15px' left='40px' rotation='110' />
        <EyeBrow top='15px' right='40px' rotation='65'  />
        <Eye top='50px' left='30px'>
          <Pupil />
        </Eye>
        <Eye top='50px' right='30px'>
          <Pupil />
        </Eye>
      </Face>
    </Ball>
  )
}

// https://codepen.io/william-index/pen/pJZpgN
// https://codepen.io/alvaromontoro/pen/KKMWWLv

export default DarumaBall;