import { useEffect, useRef, useState } from "react";
import Streak from "../components/Streak";
import Sidebar from "../components/Sidebar";
import HamburgerButton from "../components/HamburgerButton";
import Breathe from "../feature/Breathe";
import Timer from "../feature/Timer";
import '../styles/main.css';
import SetGoal from "../feature/SetGoal";
import Activity from "../feature/Activity";
import Journal from "../feature/Journal";
import Soundscape from "../feature/SoundScape";
import Insight from "../feature/Insight";
import FeelingPage from "../feature/FeelingPage";

export default function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState("Feeling Page");
  const contentRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  const handleSelect = (page) => {
    setSelected(page);
    setSidebarOpen(false); // close the overlay menu on small screens
  };

  // Start each page at the top
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [selected]);

  const renderContent = () => {
    switch (selected) {
      case "Journal": return <Journal />;
      case "Breathe": return <Breathe />;
      case "Soundscape": return <Soundscape />;
      case "SetGoal": return <SetGoal />;
      case "Activity": return <Activity />;
      case "Timer": return <Timer />;
      case "Insight": return <Insight />;
      default: return <FeelingPage />;
    }
  };

  return (
    <div className="main-page">
      {/* Hamburger visible only on small screens */}
      <div className="hamburger-wrapper">
        <HamburgerButton onClick={toggleSidebar} open={sidebarOpen} />
      </div>

      {/* Sidebar */}
      <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
        <Sidebar selected={selected} onSelect={handleSelect} />
      </div>

      {/* Middle Content Area */}
      <main className="content-wrapper" ref={contentRef}>
        {renderContent()}
      </main>

      {/* Streak */}
      <div className="streak-wrapper">
        <Streak />
      </div>
    </div>
  );
}
