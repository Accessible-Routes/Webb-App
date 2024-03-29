import Select from 'react-select';

const BuildingDropdown = ({ place_holder_text, building_options, setSelectedBuilding }) => {
  // component for allowing a user to select a building from building options

  const handleChange = (selectedOption) => {
    setSelectedBuilding(selectedOption)
  }

  // const customStyles = {
  //   control: (provided, state) => ({
  //     flex: 1, 
  //     position: 'absolute',
  //     ...provided, // Spread provided styles to retain default styles
  //   }),
  // };


  return (
    <div id={place_holder_text}>
      <Select
        //menuPortalTarget={document.body}

        menuPosition={'fixed'}
        placeholder={place_holder_text}
        onChange={handleChange}
        options={building_options} />
        {/* styles={customStyles}  */}
    </div>
  );
}

export default BuildingDropdown;