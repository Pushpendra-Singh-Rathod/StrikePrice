"use client";

import React, { useRef, memo } from "react";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import { Heading3 } from "lucide-react";

interface TradingViewWidgetProps {
  title?: string;
  ScriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

function TradingViewWidget({
  title,
  ScriptUrl,
  config,
  height = 600,
  className,
}: TradingViewWidgetProps) {
  const containerRef = useTradingViewWidget(ScriptUrl, config, height);

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>
      )}
      <div
        className={` tradingview-widget-container ${className || ""} `}
        ref={containerRef}
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget "
          style={{ height, width: "100%" }}
        ></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
