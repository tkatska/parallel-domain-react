import { Select, MenuItem } from "@mui/material";

const MenuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "rgb(17, 26, 32)",
      "& .MuiMenuItem-root.Mui-selected": {
        backgroundColor: "rgb(36, 51, 65)",
      },
      "& .MuiMenuItem-root.Mui-selected:hover": {
        backgroundColor: "rgb(17, 26, 32)",
      },
    },
  },
};

const FilterContainer = ({
  onCategoryChange,
  options,
  defaultOption,
  className,
}) => {
  return (
      <Select
        className={className}
        defaultValue={"0"}
        onChange={(e) => onCategoryChange(e.target.value)}
        MenuProps={MenuProps}        
      >
        <MenuItem value={"0"} selected>
          {defaultOption}
        </MenuItem>
        {options.map((optDescription, index) => (
          <MenuItem value={optDescription} key={index}>
            {optDescription}
          </MenuItem>
        ))}
      </Select>
  );
};

export default FilterContainer;
