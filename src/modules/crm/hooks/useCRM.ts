import { useState, useEffect } from "react";

export function useCRM() {
  const [loading, setLoading] = useState(false);
  const [crmData, setCrmData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch CRM data from an API here
    setLoading(false);
  }, []);

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const addContact = async (contactData: any) => {
    setLoading(true);
    // Simulate API call to add contact
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    return { success: true, id: Date.now() };
  };

  const addDeal = async (dealData: any) => {
    setLoading(true);
    // Simulate API call to add deal
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    return { success: true, id: Date.now() };
  };

  const addCampaign = async (campaignData: any) => {
    setLoading(true);
    // Simulate API call to add campaign
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    return { success: true, id: Date.now() };
  };

  const addActivity = async (activityData: any) => {
    setLoading(true);
    // Simulate API call to add activity
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    return { success: true, id: Date.now() };
  };

  const updateDealStage = async (dealId: string, newStage: string) => {
    setLoading(true);
    // Simulate API call to update deal stage
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
    return { success: true };
  };

  const getDealPipeline = async () => {
    setLoading(true);
    // Simulate API call to get deal pipeline data
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    return {
      totalValue: 478000,
      wonValue: 45000,
      lostValue: 25000,
      activeDeals: 30,
    };
  };

  return {
    loading,
    crmData,
    contacts,
    deals,
    campaigns,
    activities,
    refreshData,
    addContact,
    addDeal,
    addCampaign,
    addActivity,
    updateDealStage,
    getDealPipeline,
  };
}
