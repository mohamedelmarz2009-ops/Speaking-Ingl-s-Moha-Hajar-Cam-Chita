export enum SlideType {
  TITLE,
  INTRODUCTION,
  CHART_BAR,
  CHART_PIE,
  PROGRESS_BARS,
  COMPARISON,
  CONCLUSION,
  FINAL
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  question?: string;
  description?: string;
  data?: any[]; // Flexible data structure for different charts
  config?: {
    colors?: string[];
    labels?: string[];
    highlight?: string; // Key to highlight
  };
}

export interface ChartDataItem {
  name: string;
  value: number;
  color?: string;
}
