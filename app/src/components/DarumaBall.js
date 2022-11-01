import React from "react";
import styled from "styled-components";

const BallColor = {
  green: { primary: "#30980e" },
  white: {
    primary: "#fff",
    filter: "drop-shadow(-1px 2px 4px #c6c6c6)",
  },
  black: { primary: "#000" },
  red: { primary: "#ff5252" },
  gold: {
    primary: "#fff039",
    textColor: "#ff5252",
  },
};

const Face = styled.div`
  background-color: #fca;
  width: 85%;
  height: 55%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 30%;
  border-bottom-right-radius: 30%;
  position: absolute;
  top: ${(props) => props.top || "auto"};
  right: ${(props) => props.right || "auto"};
  left: ${(props) => props.left || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
`;

const EyeBrow = styled.div`
  background-color: #000;
  border-radius: 10px;
  width: 7.5%;
  height: 25%;
  position: absolute;
  top: ${(props) => props.top || "auto"};
  right: ${(props) => props.right || "auto"};
  left: ${(props) => props.left || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
  transform: rotate(${(props) => props.rotation || "90"}deg);
`;

const Eye = styled.div`
  background-color: #fff;
  width: 20%;
  height: 30%;
  border-radius: 100%;
  position: absolute;
  top: ${(props) => props.top || "auto"};
  right: ${(props) => props.right || "auto"};
  left: ${(props) => props.left || "auto"};
  bottom: ${(props) => props.bottom || "auto"};

  ${({ border }) => {
    return border
      ? {
          border: "3px solid #000",
        }
      : null;
  }};

  ${({ pointer }) => {
    return pointer
      ? {
          cursor: "pointer",
        }
      : null;
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

  ${({ active }) => {
    return active
      ? {
          display: "block",
        }
      : null;
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

  &:before,
  &:after {
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
  &:before,
  &:after {
    content: "";
    box-sizing: border-box;
    display: block;
    width: 28%;
    height: 25%;
    position: absolute;
    top: ${(props) => props.top || "auto"};
    left: ${(props) => props.left || "auto"};
    box-shadow: inset 0.8vh -1vh 0px 0.8vh #222222;
    border-radius: 45%;
  }
  &:after {
    left: auto;
    right: ${(props) => props.right || "auto"};
    box-shadow: inset -0.8vh -1vh 0px 0.8vh #222222;
  }
`;

const Chin = styled.div`
  --mark-color: gold;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
  width: 80%;
  height: 20%;
  position: absolute;
  left: 10%;
  bottom: 12% !important;
  color: var(--mark-color);
`;

const ChinMark = styled.div`
  display: block;
  width: ${(props) => props.width || "6%"};
  height: ${(props) => props.height || "75%"};
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  box-shadow: inset 2vh 1.5vh 0px 0px var(--mark-color);
`;

const KanjiMark = styled.p`
  font-size: 2.3rem;
`;

const Ball = styled.div`
  background-color: ${(props) =>
    BallColor[props.color]?.["primary"] || BallColor["red"]["primary"]};
  filter: ${(props) => BallColor[props.color]["filter"]};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  /* Face like border-radius */
  /* border-radius: 100% / 80% 80% 120% 120%; */
  border-radius: 50%;
  position: relative;

  > ${Chin} {
    --mark-color: ${(props) => BallColor[props.color]?.["textColor"] || "gold"};
  }
`;

function DarumaBall({
  activeLeftPupil = false,
  activeRightPupil = false,
  border = false,
  height = "150px",
  width = "130px",
  color = "red",
  editable = false,
  onUpdatePupil,
}) {
  return (
    <Ball height={height} width={width} color={color}>
      <Face top='10%' left='8%'>
        <EyeBrow top='12%' left='20%' rotation='110' />
        <EyeBrow top='12%' right='20%' rotation='65' />
        {!editable ? (
          <Eye top='35%' left='15%' border={border}>
            <Pupil active={activeLeftPupil} />
          </Eye>
        ) : (
          <Eye
            top='35%'
            left='15%'
            pointer
            border={border}
            onClick={() => onUpdatePupil("left")}>
            <Pupil active={activeLeftPupil} />
          </Eye>
        )}

        {!editable ? (
          <Eye top='35%' right='15%' border={border}>
            <Pupil active={activeRightPupil} />
          </Eye>
        ) : (
          <Eye
            top='35%'
            right='15%'
            pointer
            border={border}
            onClick={() => onUpdatePupil("right")}>
            <Pupil active={activeRightPupil} />
          </Eye>
        )}
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
  );
}

// https://codepen.io/william-index/pen/pJZpgN
// https://codepen.io/alvaromontoro/pen/KKMWWLv

export default React.memo(DarumaBall);
