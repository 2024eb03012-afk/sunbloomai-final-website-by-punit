"use client";

import { useEffect } from "react";

export default function ElevenLabsConvAI() {
  useEffect(() => {
    // Ensure the script is loaded
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    
    // Check if script already exists
    if (!document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]')) {
      document.body.appendChild(script);
    }

    // Create the custom element
    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", "agent_8301k38gytbte73rf32b92jj9q6c");
    widget.setAttribute("position", "bottom-left");
    
    // Append to body
    document.body.appendChild(widget);

    return () => {
      // Cleanup on unmount
      const existingWidget = document.querySelector("elevenlabs-convai");
      if (existingWidget) {
        existingWidget.remove();
      }
    };
  }, []);

  return null;
}






