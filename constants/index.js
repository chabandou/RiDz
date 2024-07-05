import { Flame, Sparkles, TrendingUp } from "lucide-react";

export const tagThings = {
  featured: {
    icon: <Sparkles className="w-4 h-4 " />,
    color: "green",
    translation: "متميز",
  },
  new: {
    icon: <Flame className="w-4 h-4" />,
    color: "gold",
    translation: "جديد",
  },
  popular: {
    icon: <TrendingUp className="w-4 h-4" />,
    color: "orange",
    translation: "مشهور",
  },
  cars: {
    icon: "",
    color: "",
    translation: "سيارات",
  },
  market: {
    icon: "",
    color: "",
    translation: "السوق",
  },
  manufacturing: {
    icon: "",
    color: "",
    translation: "الصناعة",
  },
};
