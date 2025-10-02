import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import SignUpForm from '../../components/sign-up'; 
import GoogleSignInButton from '../../components/googlesignin';
import { ChefHat, Utensils } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-green-100 opacity-20"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-blue-100 opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-yellow-100 opacity-10"></div>
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg mb-4">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipe Planner</h1>
          <p className="text-gray-600">Your culinary journey starts here</p>
        </div>

        {/* Auth Toggle Tabs */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex bg-gray-50">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                isLogin
                  ? 'bg-white text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                !isLogin
                  ? 'bg-white text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8">
            {/* Auth Forms */}
            <div className="transition-all duration-300">
              {isLogin ? (
                <LoginForm onToggleToSignup={() => setIsLogin(false)} />
              ) : (
                <SignUpForm onToggleToLogin={() => setIsLogin(true)} />
              )}
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <GoogleSignInButton />

            {/* Features Preview */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-center text-sm text-gray-600 mb-4">Join thousands of users who enjoy:</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  1M+ Recipes
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Meal Planning
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Smart Lists
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Nutrition Tracking
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-green-600 hover:text-green-500">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-green-600 hover:text-green-500">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 text-green-200 opacity-30 hidden lg:block">
        <Utensils size={48} />
      </div>
      <div className="fixed bottom-20 right-10 text-blue-200 opacity-30 hidden lg:block">
        <ChefHat size={48} />
      </div>
    </div>
  );
};

export default AuthPage;