'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const LandingCtaContext = createContext(null);

function normalizeLocations(siteSettings = {}) {
  const locations = siteSettings?.locations || [];

  return locations.map((loc) => ({
    id: loc.id,
    label: loc.label || loc.name || loc.title || '',
    address: loc.address || '',
    tel: loc.tel || loc.phone || '',
    telLink: loc.telLink || '',
    wa: loc.wa || loc.whatsapp || '',
    maps: loc.maps || loc.mapUrl || '',
    destination: loc.destination || '',
    email: loc.email || '',
    hours: loc.hours || [],
    hoursOverride: loc.hoursOverride || null,
    specialNotice: loc.specialNotice || '',
    lat: loc.lat || loc.geo?.lat || null,
    lng: loc.lng || loc.geo?.lng || null,
    geo: loc.geo || null,
    waze: loc.waze || '',
  }));
}

function normalizeCompany(siteSettings = {}) {
  const company = siteSettings?.company || {};

  return {
    name: company.name || 'iLab',
    legalName: company.legalName || company.name || 'SIA “iLab”',
    regNo: company.regNo || company.registrationNumber || '40203288307',
    url: company.url || 'https://ilab.lv',
    logo: company.logo || '',
    email: company.email || '',
  };
}

export default function LandingCtaProvider({
  siteSettings,
  children,
}) {
  const [branchSheet, setBranchSheet] = useState({
    open: false,
    action: null,
  });

  const [leadSheet, setLeadSheet] = useState({
    open: false,
    mode: 'price',
  });

  const locations = useMemo(
    () => normalizeLocations(siteSettings),
    [siteSettings]
  );

  const company = useMemo(
    () => normalizeCompany(siteSettings),
    [siteSettings]
  );

  const openBranchSheet = useCallback((action) => {
    setBranchSheet({
      open: true,
      action,
    });
  }, []);

  const closeBranchSheet = useCallback(() => {
    setBranchSheet({
      open: false,
      action: null,
    });
  }, []);

  const openLeadSheet = useCallback((mode = 'price') => {
    setLeadSheet({
      open: true,
      mode,
    });
  }, []);

  const closeLeadSheet = useCallback(() => {
    setLeadSheet((current) => ({
      ...current,
      open: false,
    }));
  }, []);

  const openPriceForm = useCallback(() => {
    openLeadSheet('price');
  }, [openLeadSheet]);

  const openBookingForm = useCallback(() => {
    openLeadSheet('booking');
  }, [openLeadSheet]);

  const value = useMemo(
    () => ({
      company,
      locations,

      branchSheet,
      openBranchSheet,
      closeBranchSheet,

      leadSheet,
      openLeadSheet,
      closeLeadSheet,

      openPriceForm,
      openBookingForm,
    }),
    [
      company,
      locations,

      branchSheet,
      openBranchSheet,
      closeBranchSheet,

      leadSheet,
      openLeadSheet,
      closeLeadSheet,

      openPriceForm,
      openBookingForm,
    ]
  );

  return (
    <LandingCtaContext.Provider value={value}>
      {children}
    </LandingCtaContext.Provider>
  );
}

export function useLandingCta() {
  const context = useContext(LandingCtaContext);

  if (!context) {
    throw new Error(
      'useLandingCta must be used inside LandingCtaProvider'
    );
  }

  return context;
}