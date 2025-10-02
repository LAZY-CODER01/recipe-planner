import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Heart, 
  Shield, 
  Palette, 
  Save,
  Edit3,
  Sun,
  Moon,
  Bell,
  Globe,
  Info
} from 'lucide-react';

const ProfileSettingsPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  // Profile data
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    bio: '',
    location: '',
    favoriteGenre: '',
  });

  // Settings data
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: false,
      mealReminders: true,
      shoppingReminders: false,
    },
    privacy: {
      profilePublic: false,
      shareRecipes: true,
      showActivity: false,
    },
    dietary: {
      restrictions: [],
      allergies: [],
      preferredCuisines: [],
      calorieGoal: 2000,
      macroGoals: {
        protein: 25,
        carbs: 50,
        fat: 25,
      },
    },
  });

  const dietaryRestrictions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 
    'Paleo', 'Low-Carb', 'Pescatarian', 'Halal', 'Kosher'
  ];

  const commonAllergies = [
    'Nuts', 'Shellfish', 'Eggs', 'Milk', 'Soy', 'Wheat', 'Fish', 'Sesame'
  ];

  const cuisineTypes = [
    'Italian', 'Mexican', 'Chinese', 'Indian', 'French', 'Japanese', 
    'Thai', 'Greek', 'Spanish', 'Korean', 'American', 'Mediterranean'
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);
      if (user) {
        await loadUserData(user);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserData = async (user) => {
    setLoading(true);
    try {
      // Load profile data
      setProfileData({
        displayName: user.displayName || '',
        email: user.email || '',
        bio: '',
        location: '',
        favoriteGenre: '',
      });

      // Load settings from Firestore
      const settingsRef = doc(db, 'userSettings', user.uid);
      const settingsSnap = await getDoc(settingsRef);
      
      if (settingsSnap.exists()) {
        setSettings(prev => ({ ...prev, ...settingsSnap.data() }));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    setLoading(false);
  };

  const handleProfileUpdate = async () => {
    if (!currentUser) return;
    
    setSaving(true);
    try {
      // Update Firebase Auth profile
      await updateProfile(currentUser, {
        displayName: profileData.displayName,
      });

      // Save additional profile data to Firestore
      const profileRef = doc(db, 'userProfiles', currentUser.uid);
      await setDoc(profileRef, {
        bio: profileData.bio,
        location: profileData.location,
        favoriteGenre: profileData.favoriteGenre,
        updatedAt: new Date(),
      }, { merge: true });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
    setSaving(false);
  };

  const handleSettingsUpdate = async () => {
    if (!currentUser) return;
    
    setSaving(true);
    try {
      const settingsRef = doc(db, 'userSettings', currentUser.uid);
      await setDoc(settingsRef, {
        ...settings,
        updatedAt: new Date(),
      });

      // Apply theme immediately
      document.documentElement.setAttribute('data-theme', settings.theme);
      
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error saving settings. Please try again.');
    }
    setSaving(false);
  };

  const handleDietaryChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      dietary: {
        ...prev.dietary,
        [type]: prev.dietary[type].includes(value)
          ? prev.dietary[type].filter(item => item !== value)
          : [...prev.dietary[type], value]
      }
    }));
  };

  if (loading) {
    return <p className="text-center p-12">Loading Profile...</p>;
  }

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-gray-600">
            Please <Link to="/login" className="text-green-600 underline font-semibold">log in</Link> to access your profile and settings.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Dietary Preferences', icon: Heart },
    { id: 'settings', label: 'App Settings', icon: Settings },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <User size={32} className="text-green-500" />
        <div>
          <h1 className="text-3xl font-bold font-playfair">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <User size={32} className="text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{profileData.displayName || 'User'}</h2>
                    <p className="text-gray-600">{profileData.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    placeholder="Tell us about yourself and your cooking journey..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <button
                  onClick={handleProfileUpdate}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            )}

            {/* Dietary Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Dietary Preferences</h2>

                {/* Dietary Restrictions */}
                <div>
                  <h3 className="font-medium mb-3">Dietary Restrictions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {dietaryRestrictions.map(restriction => (
                      <label key={restriction} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.dietary.restrictions.includes(restriction)}
                          onChange={() => handleDietaryChange('restrictions', restriction)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm">{restriction}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <h3 className="font-medium mb-3">Allergies</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {commonAllergies.map(allergy => (
                      <label key={allergy} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.dietary.allergies.includes(allergy)}
                          onChange={() => handleDietaryChange('allergies', allergy)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm">{allergy}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferred Cuisines */}
                <div>
                  <h3 className="font-medium mb-3">Preferred Cuisines</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {cuisineTypes.map(cuisine => (
                      <label key={cuisine} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.dietary.preferredCuisines.includes(cuisine)}
                          onChange={() => handleDietaryChange('preferredCuisines', cuisine)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{cuisine}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Calorie Goal */}
                <div>
                  <h3 className="font-medium mb-3">Daily Calorie Goal</h3>
                  <input
                    type="number"
                    value={settings.dietary.calorieGoal}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      dietary: { ...prev.dietary, calorieGoal: parseInt(e.target.value) || 2000 }
                    }))}
                    className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                  <span className="ml-2 text-gray-600">calories</span>
                </div>

                <button
                  onClick={handleSettingsUpdate}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            )}

            {/* App Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">App Settings</h2>

                {/* Theme */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Palette size={18} />
                    Theme
                  </h3>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={settings.theme === 'light'}
                        onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <Sun size={16} />
                      Light
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={settings.theme === 'dark'}
                        onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <Moon size={16} />
                      Dark
                    </label>
                  </div>
                </div>

                {/* Language */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Globe size={18} />
                    Language
                  </h3>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>

                {/* Notifications */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Bell size={18} />
                    Notifications
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Email notifications</span>
                      <input
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Meal planning reminders</span>
                      <input
                        type="checkbox"
                        checked={settings.notifications.mealReminders}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, mealReminders: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Shopping list reminders</span>
                      <input
                        type="checkbox"
                        checked={settings.notifications.shoppingReminders}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, shoppingReminders: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSettingsUpdate}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-medium">Public Profile</div>
                        <div className="text-sm text-gray-600">Allow others to view your profile</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.privacy.profilePublic}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, profilePublic: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </label>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-medium">Share Recipes</div>
                        <div className="text-sm text-gray-600">Allow sharing of your favorite recipes</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.privacy.shareRecipes}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, shareRecipes: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </label>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-medium">Show Activity</div>
                        <div className="text-sm text-gray-600">Display your cooking activity to others</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.privacy.showActivity}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, showActivity: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSettingsUpdate}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Privacy Settings'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
