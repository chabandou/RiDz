import { Flame, Sparkles, TrendingUp } from "lucide-react";

export const tagThings = {
  featured: {
    icon: <Sparkles className="w-4 h-4 " />,
    color: "gold",
  },
  new: {
    icon: <Flame className="w-4 h-4" />,
    color: "blue",
  },
  trending: {
    icon: <TrendingUp className="w-4 h-4" />,
    color: "orange",
  },
};
