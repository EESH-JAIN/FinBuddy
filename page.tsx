"use client";

import { useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardContent } from "@/components/dashboard-content";
import { IncomeTracker } from "@/components/income-tracker";
import { SmartBudgeting } from "@/components/smart-budgeting";
import { SchemeDecoder } from "@/components/scheme-decoder";
import { SipVisualizer, SipData } from "@/components/sip-visualizer";
import { TrendingInvestments } from "@/components/trending-investments";
import { GoalPlanner } from "@/components/goal-planner";
import { EligibilityChecker } from "@/components/eligibility-checker";
import { FinancialCoach } from "@/components/financial-coach";
import { FinancialLiteracyReels } from "@/components/financial-literacy-reels";
import { FinancialNews } from "@/components/financial-news";
import { Settings } from "@/components/settings";
import { Profile } from "@/components/profile";
import { FinancialsContext, useFinancialsState } from "@/hooks/use-financials";

const views: Record<string, { component: ComponentType<any>, label: string }> = {
  dashboard: { component: DashboardContent, label: "Dashboard" },
  income: { component: IncomeTracker, label: "Income & Expense Tracker" },
  budgeting: { component: SmartBudgeting, label: "Smart Budgeting" },
  schemes: { component: SchemeDecoder, label: "Scheme Decoder" },
  sip: { component: SipVisualizer, label: "SIP Visualizer" },
  trending: { component: TrendingInvestments, label: "Trending Investments" },
  goals: { component: GoalPlanner, label: "Goal Planner" },
  eligibility: { component: EligibilityChecker, label: "Scheme Eligibility" },
  coach: { component: FinancialCoach, label: "Financial Coach" },
  reels: { component: FinancialLiteracyReels, label: "Financial Reels" },
  news: { component: FinancialNews, label: "Financial News" },
  settings: { component: Settings, label: "Settings" },
  profile: { component: Profile, label: "Profile" },
};

const FinancialsProvider = ({ children }: { children: ReactNode }) => {
  const financialsState = useFinancialsState();
  return (
    <FinancialsContext.Provider value={financialsState}>
      {children}
    </FinancialsContext.Provider>
  )
}

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedSip, setSelectedSip] = useState<SipData | null>(null);

  const ActiveComponent = views[activeView]?.component || DashboardContent;
  const activeLabel = views[activeView]?.label || "Dashboard";
  
  const handleSelectSip = (sip: SipData) => {
    setSelectedSip(sip);
    setActiveView('sip');
  };

  return (
    <FinancialsProvider>
      <DashboardLayout activeView={activeView} setActiveView={setActiveView} activeLabel={activeLabel}>
        <ActiveComponent 
          setActiveView={setActiveView}
          // Pass props to components that need them
          {...(activeView === 'trending' && { onSelectSip: handleSelectSip })}
          {...(activeView === 'sip' && { selectedSip: selectedSip, setSelectedSip: setSelectedSip })}
        />
      </DashboardLayout>
    </FinancialsProvider>
  );
}
