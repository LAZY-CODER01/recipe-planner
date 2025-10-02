import React, { useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getWeekDays } from '../config/DateUtillities';
import { getMealPlanForWeek, removeRecipeFromMealPlan, addRecipeToMealPlan } from '../config/FirebaseUtillities';
import { Link } from 'react-router-dom';
import { Trash2, Download, Calendar, TrendingUp, Utensils } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'react-toastify';

// Sortable meal item component
const SortableMealItem = ({ item, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group bg-white rounded-md shadow-sm p-1 cursor-move hover:shadow-md transition-shadow"
    >
      <Link to={`/recipe/${item.recipe.id}`} className="pointer-events-none">
        <img src={item.recipe.image} alt={item.recipe.title} className="w-full h-16 object-cover rounded"/>
        <p className="text-xs font-medium truncate mt-1 px-1">{item.recipe.title}</p>
      </Link>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }} 
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
      >
        <Trash2 size={12}/>
      </button>
    </div>
  );
};

// Droppable meal slot component
const DroppableMealSlot = ({ day, mealType, items, onRemove }) => {
  const id = `${day}-${mealType}`;
  const { isOver, setNodeRef } = useDroppable({ id });
  
  const style = {
    backgroundColor: isOver ? '#f0fdf4' : undefined,
    borderColor: isOver ? '#22c55e' : undefined,
  };
  
  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="min-h-[4rem] space-y-2 p-2 rounded-md border-2 border-dashed border-gray-300 transition-colors"
    >
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        {items.map(item => (
          <SortableMealItem 
            key={item.id} 
            item={item} 
            onRemove={onRemove}
          />
        ))}
      </SortableContext>
      {items.length === 0 && (
        <div className="h-16 bg-gray-100 rounded-md flex items-center justify-center">
          <p className="text-xs text-gray-400">
            {isOver ? 'Drop here!' : 'Drop recipe here'}
          </p>
        </div>
      )}
    </div>
  );
};

const MealPlannerPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weekDays] = useState(getWeekDays());
  const [mealPlan, setMealPlan] = useState({});
  const [nutritionData, setNutritionData] = useState({});
  const [showNutritionSummary, setShowNutritionSummary] = useState(false);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleRemove = async (mealPlanDocId) => {
    if (!currentUser) return;
    try {
      await removeRecipeFromMealPlan(mealPlanDocId);
      toast.success('Recipe removed from meal plan successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
      fetchMealPlan(currentUser.uid); // Re-fetch to update the view
    } catch (error) {
      toast.error('Failed to remove recipe from meal plan. Please try again.', {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  // Calculate nutrition data
  const calculateNutrition = useMemo(() => {
    const dailyNutrition = {};
    let weeklyTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

    weekDays.forEach(day => {
      let dayTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
      
      ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
        const meals = mealPlan[day.iso]?.[mealType] || [];
        meals.forEach(meal => {
          // Mock nutrition data - in real app, you'd fetch from API
          const mockNutrition = {
            calories: Math.floor(Math.random() * 400) + 200,
            protein: Math.floor(Math.random() * 30) + 10,
            carbs: Math.floor(Math.random() * 50) + 20,
            fat: Math.floor(Math.random() * 20) + 5
          };
          
          dayTotals.calories += mockNutrition.calories;
          dayTotals.protein += mockNutrition.protein;
          dayTotals.carbs += mockNutrition.carbs;
          dayTotals.fat += mockNutrition.fat;
        });
      });
      
      dailyNutrition[day.iso] = dayTotals;
      weeklyTotals.calories += dayTotals.calories;
      weeklyTotals.protein += dayTotals.protein;
      weeklyTotals.carbs += dayTotals.carbs;
      weeklyTotals.fat += dayTotals.fat;
    });

    return { daily: dailyNutrition, weekly: weeklyTotals };
  }, [mealPlan, weekDays]);

  // Drag and drop handler
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || !currentUser) return;

    const activeId = active.id;
    const overId = over.id;

    // Parse the drop target (day-mealType format)
    const overParts = overId.toString().split('-');
    if (overParts.length < 2) return;

    const targetDate = overParts[0];
    const targetMealType = overParts[1];

    // Find the active item
    let activeItem = null;
    let sourceDate = null;
    let sourceMealType = null;

    for (const [date, dayMeals] of Object.entries(mealPlan)) {
      for (const [mealType, meals] of Object.entries(dayMeals)) {
        const item = meals.find(m => m.id === activeId);
        if (item) {
          activeItem = item;
          sourceDate = date;
          sourceMealType = mealType;
          break;
        }
      }
      if (activeItem) break;
    }

    if (!activeItem) return;

    // If moving to a different slot, update the meal plan
    if (sourceDate !== targetDate || sourceMealType !== targetMealType) {
      try {
        // Remove from old location
        await removeRecipeFromMealPlan(activeItem.id);
        
        // Add to new location
        await addRecipeToMealPlan(currentUser.uid, targetDate, targetMealType, activeItem.recipe);
        
        // Refresh the meal plan
        fetchMealPlan(currentUser.uid);
        toast.success('Recipe moved successfully!', {
          position: "top-right",
          autoClose: 2000,
        });
      } catch (error) {
        toast.error('Failed to move recipe. Please try again.', {
          position: "top-right",
          autoClose: 4000,
        });
      }
    }
  };

  // Export functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Weekly Meal Plan', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Week of ${weekDays[0].display} - ${weekDays[6].display}`, 20, 35);

    let yPosition = 50;
    
    weekDays.forEach((day, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.text(day.display, 20, yPosition);
      yPosition += 10;
      
      ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
        doc.setFontSize(10);
        doc.text(`${mealType.toUpperCase()}:`, 25, yPosition);
        yPosition += 7;
        
        const meals = mealPlan[day.iso]?.[mealType] || [];
        if (meals.length === 0) {
          doc.text('No meals planned', 30, yPosition);
          yPosition += 7;
        } else {
          meals.forEach(meal => {
            doc.text(`- ${meal.recipe.title}`, 30, yPosition);
            yPosition += 7;
          });
        }
      });
      
      // Add nutrition summary
      const dayNutrition = calculateNutrition.daily[day.iso];
      if (dayNutrition) {
        doc.setFontSize(8);
        doc.text(`Calories: ${dayNutrition.calories} | Protein: ${dayNutrition.protein}g | Carbs: ${dayNutrition.carbs}g | Fat: ${dayNutrition.fat}g`, 25, yPosition);
        yPosition += 15;
      }
    });

    doc.save('meal-plan.pdf');
    toast.success('Meal plan exported to PDF successfully!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const exportToCSV = () => {
    let csvContent = 'Day,Meal Type,Recipe,Calories,Protein (g),Carbs (g),Fat (g)\n';
    
    weekDays.forEach(day => {
      ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
        const meals = mealPlan[day.iso]?.[mealType] || [];
        if (meals.length === 0) {
          csvContent += `${day.display},${mealType},"No meal planned",0,0,0,0\n`;
        } else {
          meals.forEach(meal => {
            // Mock nutrition - in real app, use actual data
            const mockNutrition = {
              calories: Math.floor(Math.random() * 400) + 200,
              protein: Math.floor(Math.random() * 30) + 10,
              carbs: Math.floor(Math.random() * 50) + 20,
              fat: Math.floor(Math.random() * 20) + 5
            };
            csvContent += `${day.display},${mealType},"${meal.recipe.title}",${mockNutrition.calories},${mockNutrition.protein},${mockNutrition.carbs},${mockNutrition.fat}\n`;
          });
        }
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'meal-plan.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Meal plan exported to CSV successfully!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  if (loading) {
    return <p className="text-center p-12">Loading Meal Plan...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold font-playfair mb-4 md:mb-0">This Week's Meal Plan</h1>
        
        {currentUser && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowNutritionSummary(!showNutritionSummary)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <TrendingUp size={18} />
              Nutrition Summary
            </button>
            
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download size={18} />
              Export PDF
            </button>
            
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        )}
      </div>

      {/* Nutrition Summary Panel */}
      {currentUser && showNutritionSummary && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Utensils size={20} className="text-green-500" />
            Weekly Nutrition Summary
          </h2>
          
          {/* Weekly Totals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{calculateNutrition.weekly.calories}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{calculateNutrition.weekly.protein}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{calculateNutrition.weekly.carbs}g</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{calculateNutrition.weekly.fat}g</div>
              <div className="text-sm text-gray-600">Fat</div>
            </div>
          </div>

          {/* Daily Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDays.map(day => {
              const dayNutrition = calculateNutrition.daily[day.iso];
              return (
                <div key={day.iso} className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">{day.display.split(',')[0]}</h3>
                  <div className="space-y-1 text-xs">
                    <div>Cal: {dayNutrition?.calories || 0}</div>
                    <div>P: {dayNutrition?.protein || 0}g</div>
                    <div>C: {dayNutrition?.carbs || 0}g</div>
                    <div>F: {dayNutrition?.fat || 0}g</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!currentUser ? (
         <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-gray-600">Please <Link to="/login" className="text-green-600 underline font-semibold">log in</Link> to view your meal plan.</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {weekDays.map(day => (
              <div key={day.iso} className="bg-gray-50 rounded-lg p-3">
                <h2 className="font-bold text-center mb-3">{day.display.split(',')[0]}</h2>
                
                {/* Daily Nutrition */}
                {calculateNutrition.daily[day.iso] && (
                  <div className="bg-white p-2 rounded mb-3 text-xs">
                    <div className="font-medium text-center mb-1">Daily Total</div>
                    <div className="text-center text-gray-600">
                      {calculateNutrition.daily[day.iso].calories} cal
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {['breakfast', 'lunch', 'dinner'].map(mealType => (
                    <div key={mealType}>
                      <h3 className="text-sm font-semibold capitalize text-gray-500 mb-1">{mealType}</h3>
                      <DroppableMealSlot
                        day={day.iso}
                        mealType={mealType}
                        items={mealPlan[day.iso]?.[mealType] || []}
                        onRemove={handleRemove}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DndContext>
      )}
    </div>
  );
};

export default MealPlannerPage;
