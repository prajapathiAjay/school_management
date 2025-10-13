import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Loader2, School, User, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Signup API call
  const handleSignup = async (values, { setSubmitting, setFieldError }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          userType: values.userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard or verification page
        window.location.href = '/dashboard';
      } else {
        // Handle API errors
        if (data.errors) {
          data.errors.forEach(error => {
            setFieldError(error.field, error.message);
          });
        } else {
          setFieldError('email', data.message || 'Signup failed');
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      setFieldError('email', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .required('Full name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    userType: Yup.string()
      .oneOf(['student', 'teacher', 'parent', 'admin'], 'Please select a valid user type')
      .required('User type is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    terms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('Required'),
  });

  // Initial values
  const initialValues = {
    name: '',
    email: '',
    userType: '',
    password: '',
    confirmPassword: '',
    terms: false,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg">
              <School className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Join our school management system today
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({ errors, touched, isSubmitting, values }) => (
              <Form className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.name && touched.name
                          ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'
                      }`}
                    />
                    {errors.name && touched.name && (
                      <div className="absolute right-3 top-3 text-red-500">
                        ⚠️
                      </div>
                    )}
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-2 text-sm text-red-600 flex items-center space-x-1"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'
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

                {/* User Type Field */}
                <div>
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                    I am a
                  </label>
                  <div className="relative">
                    <Field
                      as="select"
                      id="userType"
                      name="userType"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 appearance-none ${
                        errors.userType && touched.userType
                          ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'
                      }`}
                    >
                      <option value="">Select your role</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="parent">Parent</option>
                      <option value="admin">Administrator</option>
                    </Field>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.userType && touched.userType && (
                      <div className="absolute right-8 top-3 text-red-500">
                        ⚠️
                      </div>
                    )}
                  </div>
                  <ErrorMessage
                    name="userType"
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
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Create a strong password"
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.password && touched.password
                          ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'
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
                  
                  {/* Password Strength Indicator */}
                  {values.password && (
                    <div className="mt-2">
                      <div className="flex space-x-1 mb-1">
                        {[
                          values.password.length >= 8,
                          /[a-z]/.test(values.password),
                          /[A-Z]/.test(values.password),
                          /\d/.test(values.password),
                          /[@$!%*?&]/.test(values.password)
                        ].map((condition, index) => (
                          <div
                            key={index}
                            className={`h-1 flex-1 rounded ${
                              condition ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        Must include: lowercase, uppercase, number, special character
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.confirmPassword && touched.confirmPassword
                          ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="mt-2 text-sm text-red-600 flex items-center space-x-1"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <Field
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="/terms" className="text-indigo-600 hover:text-indigo-500 font-medium">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-indigo-600 hover:text-indigo-500 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-sm text-red-600 flex items-center space-x-1"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
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
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup */}
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
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
              Sign in
            </Link>
          </p>
          <p className="mt-2">
            © 2024 School Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;