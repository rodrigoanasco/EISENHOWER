"use client";

import React, { useEffect, useState } from "react";
import { isTauri } from "@tauri-apps/api/core";

const AUTOSTART_PREFERENCE_KEY = "eisenhower-autostart-enabled";

async function getAutostartApi() {
  return import("@tauri-apps/plugin-autostart");
}

const DesktopSettings = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [autostartEnabled, setAutostartEnabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isTauri()) {
      return;
    }

    let isCancelled = false;
    setIsDesktop(true);

    async function loadAutostartPreference() {
      try {
        const { disable, enable, isEnabled } = await getAutostartApi();
        const savedPreference = window.localStorage.getItem(
          AUTOSTART_PREFERENCE_KEY,
        );
        const shouldAutostart = savedPreference !== "false";
        let currentlyEnabled = await isEnabled();

        if (shouldAutostart && !currentlyEnabled) {
          await enable();
          currentlyEnabled = true;
        } else if (!shouldAutostart && currentlyEnabled) {
          await disable();
          currentlyEnabled = false;
        }

        window.localStorage.setItem(
          AUTOSTART_PREFERENCE_KEY,
          String(currentlyEnabled),
        );

        if (!isCancelled) {
          setAutostartEnabled(currentlyEnabled);
        }
      } catch (error) {
        console.error("Could not read the startup preference.", error);

        if (!isCancelled) {
          setErrorMessage("The startup setting could not be loaded.");
        }
      } finally {
        if (!isCancelled) {
          setIsUpdating(false);
        }
      }
    }

    loadAutostartPreference();

    return () => {
      isCancelled = true;
    };
  }, []);

  async function handleAutostartChange(event) {
    const shouldEnable = event.target.checked;
    setIsUpdating(true);
    setErrorMessage("");

    try {
      const { disable, enable } = await getAutostartApi();

      if (shouldEnable) {
        await enable();
      } else {
        await disable();
      }

      setAutostartEnabled(shouldEnable);
      window.localStorage.setItem(
        AUTOSTART_PREFERENCE_KEY,
        String(shouldEnable),
      );
    } catch (error) {
      console.error("Could not update the startup preference.", error);
      setErrorMessage("The startup setting could not be changed.");
    } finally {
      setIsUpdating(false);
    }
  }

  if (!isDesktop) {
    return null;
  }

  return (
    <section className="desktop-settings" aria-labelledby="desktop-settings-title">
      <div>
        <h2 id="desktop-settings-title">Desktop Settings</h2>
        <p>Open Eisenhower Matrix automatically when you sign in to Windows.</p>
      </div>

      <label className="autostart-control">
        <input
          type="checkbox"
          checked={autostartEnabled}
          disabled={isUpdating}
          onChange={handleAutostartChange}
        />
        <span className="autostart-switch" aria-hidden="true" />
        <span>Launch at startup</span>
      </label>

      {errorMessage && <p className="desktop-settings-error">{errorMessage}</p>}
    </section>
  );
};

export default DesktopSettings;
