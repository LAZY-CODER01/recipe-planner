import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

const SearchFilters = ({ onFiltersChange, activeFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(activeFilters || {});

  const cuisineOptions = [
    'Italian', 'Mexican', 'Chinese', 'Indian', 'French', 'Japanese', 
    'Thai', 'Greek', 'Spanish', 'Korean', 'American', 'Mediterranean'
  ];

  const dietOptions = [
    'vegetarian', 'vegan', 'gluten free', 'ketogenic', 'paleo', 
    'pescetarian', 'dairy free', 'whole30', 'low carb'
  ];

  const mealTypeOptions = [
    'breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'appetizer', 
    'salad', 'bread', 'soup', 'beverage'
  ];

  const handleFilterChange = (category, value) => {
    const newFilters = { ...filters };
    
    if (category === 'cuisine') {
      newFilters.cuisine = value;
    } else if (category === 'diet') {
      newFilters.diet = value;
    } else if (category === 'type') {
      newFilters.type = value;
    } else if (category === 'maxReadyTime') {
      newFilters.maxReadyTime = value;
    } else if (category === 'minHealthScore') {
      newFilters.minHealthScore = value;
    }

    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="relative md:right-64">
    
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center right-16 gap-2 px-4 py-2 rounded-lg border transition-colors ${
          hasActiveFilters 
            ? 'bg-green-50 border-green-500 text-green-700' 
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Filter size={18} />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
            {Object.keys(filters).length}
          </span>
        )}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Search Filters</h3>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Cuisine Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine
            </label>
            <select
              value={filters.cuisine || ''}
              onChange={(e) => handleFilterChange('cuisine', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Any Cuisine</option>
              {cuisineOptions.map(cuisine => (
                <option key={cuisine} value={cuisine.toLowerCase()}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          {/* Diet Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diet
            </label>
            <select
              value={filters.diet || ''}
              onChange={(e) => handleFilterChange('diet', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Any Diet</option>
              {dietOptions.map(diet => (
                <option key={diet} value={diet}>
                  {diet.charAt(0).toUpperCase() + diet.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Meal Type Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meal Type
            </label>
            <select
              value={filters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Any Type</option>
              {mealTypeOptions.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Max Ready Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Cooking Time (minutes)
            </label>
            <select
              value={filters.maxReadyTime || ''}
              onChange={(e) => handleFilterChange('maxReadyTime', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Any Duration</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          {/* Min Health Score */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Health Score
            </label>
            <select
              value={filters.minHealthScore || ''}
              onChange={(e) => handleFilterChange('minHealthScore', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Any Score</option>
              <option value="50">50+ (Good)</option>
              <option value="70">70+ (Very Good)</option>
              <option value="85">85+ (Excellent)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
