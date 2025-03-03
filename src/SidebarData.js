// SidebarData.js
import { FaHome, FaProjectDiagram, FaUserShield, FaServer, FaCogs } from "react-icons/fa";

export const SIDEBAR_ITEMS = [
  {
    key: "organization",
    label: "Organization",
    icon: FaHome,
    subItems: [
      { key: "orgDashboard", label: "Dashboard" },
      { key: "orgMyProject", label: "My Project" },
      { key: "orgSetup", label: "Setup" },
    ],
  },
  {
    key: "project360",
    label: "Project 360",
    icon: FaProjectDiagram,
    subItems: [
      { key: "p360Dashboard", label: "Dashboard" },
      { key: "p360Gantt", label: "Gantt Chart" },
      { key: "p360Tasks", label: "Tasks" },
      // Add additional unique subitems here if needed
    ],
  },
  {
    key: "complianceIQ",
    label: "ComplianceIQ",
    icon: FaUserShield,
    subItems: [
      { key: "ciqDashboard", label: "Dashboard" },
      { key: "ciqAudit", label: "Audit" },
      // Add additional unique subitems here if needed
    ],
  },
  {
    key: "nexGenQE",
    label: "NexGen QE",
    icon: FaCogs,
    subItems: [
      { key: "nqeDashboard", label: "Dashboard" },
      
      {key:"nqeTestCases",label:"Test Cases"},
      {key:"nqeVisualTest",label:"Visual Test"},
      {key:"nqeTestReports",label:"Test Reports"},
      {key:"nqeQEUserConfig",label:"QE User Config"},
      // Add additional unique subitems here if needed
    ],
  },
  {
    key: "platform",
    label: "Platform",
    icon: FaServer,
    subItems: [
      { key: "platGlobalConfig", label: "Global Config" },
      { key: "platWebConfig", label: "Web Config" },
      // Add additional unique subitems here if needed
    ],
  },
];
