import ButtonWidget from './widgets/ButtonWidget'
import ToggleVisibleWidget from './widgets/ToggleVisibleWidget'
// ZERO STYLING - As simple as possible
import DropdownWidget from './widgets/DropDownWidget'

import DropDownWidgetMultiple from './widgets/DropDownWidgetMultiple'
import PdfThing from './widgets/PdfThing'



function App() {
  return (
    <div className="App">
          <PdfThing />
          <hr></hr>
          <DropdownWidget />
          <hr></hr>
          <DropDownWidgetMultiple />
          <hr></hr>
          <ButtonWidget id='InputButtonWidget' />
          <hr></hr>
          <ToggleVisibleWidget id='ToggleVisibleWidget' />
          <hr></hr>
  
    </div>
  );
}

export default App;
