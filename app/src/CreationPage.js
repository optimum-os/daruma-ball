import { useCallback, useRef, useState } from "react";
import DarumaBall from "./components/DarumaBall";
import "./CreationPage.css";

function CreationPage() {
  const [description, setDescription] = useState("");
  const descriptionElement = useRef();
  const [activeLeftPupil, setActiveLeftPupil] = useState(false);
  const [activeRightPupil, setActiveRightPupil] = useState(false);

  const onUpdatePupil = useCallback((position) => {
    if (
      (position === "left" && activeLeftPupil) ||
      (position === "right" && activeRightPupil)
    )
      return;

    if (position === "left") {
      setActiveLeftPupil(true);
      setActiveRightPupil(false);
    } else if (position === "right") {
      setActiveRightPupil(true);
      setActiveLeftPupil(false);
    }
  }, []);

  return (
    <div className='creationpage__container'>
      <div className='creationpage__daruma__ball_wrapper'>
        <DarumaBall
          editable
          activeLeftPupil={activeLeftPupil}
          activeRightPupil={activeRightPupil}
          onUpdatePupil={onUpdatePupil}
        />
      </div>
      <div
        className='creationpage__description_box'
        onClick={() => {
          descriptionElement.current.focus();
        }}>
        <input
          ref={descriptionElement}
          type='text'
          maxLength='100'
          placeholder='Tapez ici votre voeu ou rêve à réaliser.'
          className='creationpage__description_content'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}

export default CreationPage;
