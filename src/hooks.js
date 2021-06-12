import React from 'react';
import { generateRandomColor } from "./utils/common";

export const useCopyToClipboard = (timeout = 2500) => {
    const [copied, setCopied] = React.useState(false);
    const copyToClipboard = React.useCallback((value) => {
        if (typeof value === 'string') {
            navigator.clipboard.writeText(value);
            setCopied(true);
        }
    }, [setCopied]);

    React.useEffect(() => {
        let timeoutId;

        if (copied) {
            timeoutId = setTimeout(() => setCopied(false), timeout);
        }

        return () => {
            clearTimeout(timeoutId);
        }
    }, [copied, timeout]);

    return [copyToClipboard, copied];
}

export const useMobileDeviceDetector = () => {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent);
}

export const useRandomColor = (interval = 5000) => {
    const [color, setColor] = React.useState('#fff');

    React.useEffect(() => {
        const intervalId = setInterval(() => setColor(generateRandomColor()), interval);

        return () => {
            clearInterval(intervalId);
        }
    }, [interval]);

    return color;
}
