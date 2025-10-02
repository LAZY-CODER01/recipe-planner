import React, { useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getWeekDays } from '../config/DateUtillities';
import { getMealPlanForWeek } from '../config/FirebaseUtillities';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Check, 
  Plus, 
  Trash2, 
  Download, 
  PrinterIcon,
  Search,
  Filter
} from 'lucide-react';

const ShoppingListPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weekDays] = useState(getWeekDays());
  const [mealPlan, setMealPlan] = useState({});
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [manualItems, setManualItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
// error resolving debugging
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      if (user) {
        fetchMealPlan(user.uid);
      } else {
        setLoading(false);
        setMealPlan({});
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchMealPlan = async (uid) => {
    setLoading(true);
    const startDate = weekDays[0].iso;
    const endDate = weekDays[6].iso;
    const planData = await getMealPlanForWeek(uid, startDate, endDate);
    
    // Process data into a format that's easy to render
    const processedPlan = {};
    weekDays.forEach(day => {
      processedPlan[day.iso] = { breakfast: [], lunch: [], dinner: [] };
    });
    planData.forEach(item => {
      if (processedPlan[item.date]) {
        processedPlan[item.date][item.mealType].push(item);
      }
    });

    setMealPlan(processedPlan);
    setLoading(false);
  };

  // Generate shopping list from meal plan
  const generatedShoppingList = useMemo(() => {
    const ingredientMap = new Map();

    // Extract ingredients from all recipes in the meal plan
    Object.values(mealPlan).forEach(day => {
      Object.values(day).forEach(meals => {
        meals.forEach(meal => {
          // Mock ingredients - in a real app, you'd extract from recipe.extendedIngredients
          const mockIngredients = [
            { name: 'Chicken breast', category: 'Meat', amount: '1 lb' },
            { name: 'Rice', category: 'Grains', amount: '2 cups' },
            { name: 'Broccoli', category: 'Vegetables', amount: '1 head' },
            { name: 'Olive oil', category: 'Condiments', amount: '1 bottle' },
            { name: 'Onion', category: 'Vegetables', amount: '2 pieces' },
            { name: 'Garlic', category: 'Vegetables', amount: '1 bulb' },
            { name: 'Tomatoes', category: 'Vegetables', amount: '4 pieces' },
            { name: 'Cheese', category: 'Dairy', amount: '200g' },
          ];

          // Randomly select 3-5 ingredients per recipe for variety
          const selectedIngredients = mockIngredients
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 3);

          selectedIngredients.forEach(ingredient => {
            const key = ingredient.name.toLowerCase();
            if (ingredientMap.has(key)) {
              // In a real app, you'd combine quantities intelligently
              const existing = ingredientMap.get(key);
              existing.count += 1;
            } else {
              ingredientMap.set(key, {
                ...ingredient,
                id: `generated-${key}`,
                count: 1,
                source: 'meal-plan'
              });
            }
          });
        });
      });
    });

    return Array.from(ingredientMap.values());
  }, [mealPlan]);

  // Combine generated and manual items
  const allItems = useMemo(() => {
    const combined = [...generatedShoppingList, ...manualItems];
    
    // Filter by search term
    let filtered = combined.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Group by category
    const grouped = filtered.reduce((acc, item) => {
      const category = item.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    return grouped;
  }, [generatedShoppingList, manualItems, searchTerm, categoryFilter]);

  const categories = ['all', 'Meat', 'Vegetables', 'Dairy', 'Grains', 'Condiments', 'Other'];

  const handleCheckItem = (itemId) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const handleAddManualItem = () => {
    if (newItemText.trim()) {
      const newItem = {
        id: `manual-${Date.now()}`,
        name: newItemText.trim(),
        category: 'Other',
        amount: '1',
        source: 'manual'
      };
      setManualItems([...manualItems, newItem]);
      setNewItemText('');
    }
  };

  const handleRemoveManualItem = (itemId) => {
    setManualItems(manualItems.filter(item => item.id !== itemId));
    const newChecked = new Set(checkedItems);
    newChecked.delete(itemId);
    setCheckedItems(newChecked);
  };

  const exportToPrint = () => {
    const printWindow = window.open('', '_blank');
    const totalItems = Object.values(allItems).flat().length;
    const checkedCount = checkedItems.size;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Shopping List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #22c55e; }
            .category { margin-bottom: 20px; }
            .category h3 { color: #374151; border-bottom: 1px solid #d1d5db; padding-bottom: 5px; }
            .item { margin: 5px 0; display: flex; align-items: center; }
            .checkbox { margin-right: 10px; }
            .summary { background: #f3f4f6; padding: 10px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>🛒 Shopping List</h1>
          <div class="summary">
            <strong>Week of:</strong> ${weekDays[0].display} - ${weekDays[6].display}<br>
            <strong>Total Items:</strong> ${totalItems} | <strong>Completed:</strong> ${checkedCount}
          </div>
          ${Object.entries(allItems).map(([category, items]) => `
            <div class="category">
              <h3>${category}</h3>
              ${items.map(item => `
                <div class="item">
                  <input type="checkbox" class="checkbox" ${checkedItems.has(item.id) ? 'checked' : ''}>
                  <span>${item.name} (${item.amount})</span>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToText = () => {
    let text = `Shopping List - Week of ${weekDays[0].display} to ${weekDays[6].display}\n\n`;
    
    Object.entries(allItems).forEach(([category, items]) => {
      text += `${category}:\n`;
      items.forEach(item => {
        const status = checkedItems.has(item.id) ? '✓' : '☐';
        text += `${status} ${item.name} (${item.amount})\n`;
      });
      text += '\n';
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shopping-list.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <p className="text-center p-12">Loading Shopping List...</p>;
  }

  const totalItems = Object.values(allItems).flat().length;
  const checkedCount = checkedItems.size;
  const completionPercentage = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <ShoppingCart size={32} className="text-green-500" />
          <div>
            <h1 className="text-3xl font-bold font-playfair">Shopping List</h1>
            <p className="text-gray-600">Week of {weekDays[0].display} - {weekDays[6].display}</p>
          </div>
        </div>
        
        {currentUser && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportToPrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PrinterIcon size={18} />
              Print
            </button>
            
            <button
              onClick={exportToText}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Download size={18} />
              Export
            </button>
          </div>
        )}
      </div>

      {!currentUser ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-gray-600">
            Please <Link to="/login" className="text-green-600 underline font-semibold">log in</Link> to view your shopping list.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Shopping Progress</h3>
              <span className="text-sm text-gray-600">{checkedCount} of {totalItems} items</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{Math.round(completionPercentage)}% complete</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add Manual Item */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Add custom item..."
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddManualItem()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
              <button
                onClick={handleAddManualItem}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
          </div>

          {/* Shopping List Items */}
          <div className="space-y-4">
            {Object.entries(allItems).map(([category, items]) => (
              <div key={category} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">
                  {category} ({items.length} items)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map(item => (
                    <div 
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        checkedItems.has(item.id) 
                          ? 'bg-green-50 border-green-200 text-green-800' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <button
                        onClick={() => handleCheckItem(item.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          checkedItems.has(item.id)
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {checkedItems.has(item.id) && <Check size={14} />}
                      </button>
                      
                      <div className="flex-1">
                        <div className={`font-medium ${checkedItems.has(item.id) ? 'line-through' : ''}`}>
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-600">{item.amount}</div>
                      </div>
                      
                      {item.source === 'manual' && (
                        <button
                          onClick={() => handleRemoveManualItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {totalItems === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No items in your shopping list</h3>
                <p className="text-gray-500">
                  Add recipes to your <Link to="/meal-planner" className="text-green-600 underline">meal planner</Link> to generate a shopping list automatically, or add items manually above.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListPage;
