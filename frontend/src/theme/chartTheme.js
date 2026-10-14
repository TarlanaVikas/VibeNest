import { Chart } from "chart.js/auto";

// Dark-theme defaults shared by every chart. Importing this file once is enough.
Chart.defaults.color = "#C3A5B0";
Chart.defaults.font.family = "'Figtree Variable', system-ui, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.borderColor = "rgba(255, 214, 224, 0.08)";
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.boxWidth = 8;
Chart.defaults.plugins.legend.labels.boxHeight = 8;
Chart.defaults.plugins.legend.labels.padding = 14;
Chart.defaults.plugins.tooltip.backgroundColor = "#331C29";
Chart.defaults.plugins.tooltip.titleColor = "#F8EBEE";
Chart.defaults.plugins.tooltip.bodyColor = "#F8EBEE";
Chart.defaults.plugins.tooltip.borderColor = "rgba(255, 214, 224, 0.18)";
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 10;

export const CHART_COLORS = {
  high: "#FFC25A",
  zen: "#7FE0C3",
  low: "#FF5C8A",
  good: "#8BD99A",
  bad: "#FF5C8A",
  card: "#26141F",
};
