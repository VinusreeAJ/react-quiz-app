import { config } from "@/config";
import { useEffect } from "react";

export const usePageTitle = (title: string): void => {
  useEffect(() => {
    document.title = `${title} | ${config.site.name}`;
  }, [title]);
};
