export const pageTitles = {
  ar: {
    "/": "GTS للاستثمار الزراعي | ري محوري وتنقيط وميكنة",
    "/energy": "الطاقة | GTS للاستثمار الزراعي",
    "/irrigation": "الري | GTS للاستثمار الزراعي",
    "/mechanization": "الميكنة | GTS للاستثمار الزراعي",
    "/supplies": "التوريدات العمومية | GTS للاستثمار الزراعي",
  },
  en: {
    "/": "GTS Agricultural Investment",
    "/energy": "Power | GTS Agricultural Investment",
    "/irrigation": "Irrigation | GTS Agricultural Investment",
    "/mechanization": "Mechanization | GTS Agricultural Investment",
    "/supplies": "General Supplies | GTS Agricultural Investment",
  },
} as const;

export type PagePath = keyof typeof pageTitles.ar;
