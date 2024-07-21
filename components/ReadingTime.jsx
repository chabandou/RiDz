import { Clock } from "lucide-react";

export default function ReadingTime({ readingTime, className }) {
  return (
    <div className={`text-sm text-muted-foreground ${className}`}>
                  {readingTime &&
                    (readingTime < 3 ? (
                      readingTime === 1 ? (
                        <span>دقيقة</span>
                      ) : (
                        <span>دقيقتان</span>
                      )
                    ) : (
                      <span>{readingTime} دقائق</span>
                    ))}  للقراءة <Clock className="w-4 h-4 inline-block" />
                </div>
  );
}