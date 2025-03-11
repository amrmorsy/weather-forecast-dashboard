import { CSSProperties } from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const buttonStyle: CSSProperties = {
    position: "relative" as const,
    width: "56px",
    height: "32px",
    backgroundColor: theme === 'dark' ? "#374151" : "#D1D5DB",
    borderRadius: "9999px",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s ease-in-out",
  };

  const sliderStyle: CSSProperties = {
    width: "24px",
    height: "24px",
    backgroundColor: theme === 'dark' ? "#111827" : "#FFFFFF",
    borderRadius: "50%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transform: theme === 'dark' ? "translateX(24px)" : "translateX(0)",
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="themeToggleBtn">
      <button
        onClick={toggleTheme}
        style={buttonStyle}
        aria-label="Toggle theme"
      >
        <div style={sliderStyle}>
          {theme === 'dark' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#FBBF24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="20"
              height="20"
              stroke="#FBBF24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="20"
              height="20"
              stroke="#1F2937"
            >
              <path d="M12 3v1m0 16v1m8-8h1M3 12H2m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;