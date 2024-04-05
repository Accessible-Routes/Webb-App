import Select from 'react-select';

const BuildingDropdown = ({ place_holder_text, building_options, setSelectedBuilding }) => {
  const handleChange = (selectedOption) => {
    setSelectedBuilding(selectedOption);
  };

  return (
    <div id={place_holder_text}>
      <Select
        menuPortalTarget={document.body}
        menuPosition={'fixed'}
        placeholder={place_holder_text}
        onChange={handleChange}
        options={building_options}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 }), // Apply high z-index to the menu
          menu: provided => ({ ...provided, zIndex: 9999 }), // Apply high z-index to the dropdown menu
          option: provided => ({ ...provided, zIndex: 9999 }) // Apply high z-index to the dropdown options
        }}
      />
    </div>
  );
};

export default BuildingDropdown;
