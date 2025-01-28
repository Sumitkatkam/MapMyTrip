import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateTrip from './create-trip/CreateTrip';
import Header from './components/custom/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]/ViewTrip';
import MyTrip from './my-trips/MyTrip';

const router = createBrowserRouter([
 {
  path: '/',
  element: <App />,
 },
 {
  path: '/create-trip',
  element: <CreateTrip />,
 },
 {
  path: '/view-trip/:tripId',
  element: <ViewTrip />,
 },
 {
  path: '/my-trips',
  element: <MyTrip />
 }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)
