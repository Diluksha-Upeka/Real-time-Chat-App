const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
	  <div className="flex space-x-6 mt-4">
		<div className="form-control">
		  <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "text-purple-600" : ""}`}>
			<input
			  type="checkbox"
			  className="checkbox border-slate-900"
			  checked={selectedGender === "male"}
			  onChange={() => onCheckboxChange("male")}
			/>
			<span className="label-text">Male</span>
		  </label>
		</div>
		<div className="form-control">
		  <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "text-purple-600" : ""}`}>
			<input
			  type="checkbox"
			  className="checkbox border-slate-900"
			  checked={selectedGender === "female"}
			  onChange={() => onCheckboxChange("female")}
			/>
			<span className="label-text">Female</span>
		  </label>
		</div>
	  </div>
	);
  };
  
  export default GenderCheckbox;
  