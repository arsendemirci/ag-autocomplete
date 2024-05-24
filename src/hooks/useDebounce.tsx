import { useMemo, useRef, useEffect } from "react";
import debounce from "lodash/debounce";
const useDebounce = (callback: () => void) => {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 300);
  }, []);

  return debouncedCallback;
};

export default useDebounce;
