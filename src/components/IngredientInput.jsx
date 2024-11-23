import React from "react";

const IngredientInput = ({ value, onChange }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter ingredients separated by commas (e.g., eggs, milk, flour)..."
        rows={4}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default IngredientInput;
