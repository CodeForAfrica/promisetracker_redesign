import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { sx } from '../lib/sx';
import { ValsProvider } from '../lib/vals';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import Subscribe from '../components/Subscribe';
import StatusTooltip from '../components/StatusTooltip';
import Lightbox from '../components/Lightbox';
import ActionModals from '../components/ActionModals';

export default function RootLayout() {
  return (
    <ValsProvider>
      <div style={sx('min-height:100vh;display:flex;flex-direction:column')}>
        <SiteHeader />
        <main style={sx('flex:1')}>
          <Outlet />
          <Lightbox />
        </main>
        <Subscribe />
        <StatusTooltip />
        <SiteFooter />
      </div>
      <ActionModals />
    </ValsProvider>
  );
}
