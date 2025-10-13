import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Loader2, School } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login API call
  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful - handle token/session storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard or home page
        window.location.href = '/dashboard';
      } else {
        // Handle API errors
        setFieldError('email', data.message || 'Login failed');
        setFieldError('password', data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setFieldError('email', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Initial values
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
              <School className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your school management account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && touched.email && (
                      <div className="absolute right-3 top-3 text-red-500">
                        ⚠️
                      </div>
                    )}
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-2 text-sm text-red-600 flex items-center space-x-1"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.password && touched.password
                          ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-2 text-sm text-red-600 flex items-center space-x-1"
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              <span className="ml-2">Google</span>
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <img className="w-5 h-5" src="https://www.svgrepo.com/show/475647/microsoft-color.svg" alt="Microsoft" />
              <span className="ml-2">Microsoft</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
              Sign up
            </a>
          </p>
          <p className="mt-2">
            © 2024 School Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;