import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

export default function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null);
  const location = useLocation();

  useEffect(() => {
    ref.current?.continuousStart();

    const timeout = setTimeout(() => {
      ref.current?.complete();
    }, 300);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return <LoadingBar color="var(--ring)" ref={ref} height={2} shadow />;
}
