import React, { useState } from "react";
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";

export const CookiePopup = () => {
  const [showCustomize, setShowCustomize] = useState(false);
  const [customConsent, setCustomConsent] = useState({
    functionality: false,
    analytics: false,
  });

  const saveConsent = () => {
    Cookies.set("cookies", JSON.stringify(customConsent), { expires: 150 });
  };

  const handleAcceptAll = () => {
    setCustomConsent({ functionality: true, analytics: true });
    saveConsent();
  };

  const handleDecline = () => {
    setCustomConsent({ functionality: false, analytics: false });
    saveConsent();
  };

  const handleSavePreferences = () => {
    setShowCustomize(false);
    setCustomConsent(customConsent);
    saveConsent();
  };
  return (
    <>
      {!showCustomize && (
        <CookieConsent
          location="bottom"
          buttonText="Accept All"
          declineButtonText="Decline Unnecessary"
          enableDeclineButton
          onAccept={handleAcceptAll}
          onDecline={handleDecline}
          cookieName="cookies"
          expires={150}
          style={{ background: "#2B373B" }}
          buttonStyle={{
            backgroundColor: "#fff",
            color: "#2B373B",
            fontSize: "16px",
          }}
          declineButtonStyle={{
            backgroundColor: "#fff",
            color: "#2B373B",
            fontSize: "16px",
          }}
        >
          We use cookies to enhance your website experience
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCustomize(true);
            }}
            className="ml-2 underline text-white hover:cursor-pointer hover:text-gray-200 focus:outline-none"
          >
            Settings
          </button>
        </CookieConsent>
      )}

      {showCustomize && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative min-w-[300px] max-w-5xl">
            <h2 className="text-xl font-semibold mb-4">Cookies settings</h2>
            <form>
              <div className="mb-3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    disabled
                    className="mr-2"
                  />
                  Necessary
                </label>
                <p className="text-gray-600 text-sm mt-1">
                  These Cookies are essential to provide You with services
                  available through the Website and to enable You to use some of
                  its features. They help to authenticate users and prevent
                  fraudulent use of user accounts. Without these Cookies, the
                  services that You have asked for cannot be provided, and We
                  only use these Cookies to provide You with those services.
                </p>
              </div>
              <div className="mb-3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={customConsent.functional}
                    onChange={(e) =>
                      setCustomConsent({
                        ...customConsent,
                        functionality: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  Functionality
                </label>
                <p className="text-gray-600 text-sm mt-1">
                  These Cookies allow us to remember choices You make when You
                  use the Website, such as remembering your theme or language
                  preference. The purpose of these Cookies is to provide You
                  with a more personal experience and to avoid You having to
                  re-enter your preferences every time You use the Website.
                </p>
              </div>
              <div className="mb-3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={customConsent.analytic}
                    onChange={(e) =>
                      setCustomConsent({
                        ...customConsent,
                        analytics: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  Analytics
                </label>
                <p className="text-gray-600 text-sm mt-1">
                  Analytical cookies are used to understand how visitors
                  interact with the website. These cookies help provide
                  information on metrics such as the number of visitors, bounce
                  rate, traffic source, etc.
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 focus:outline-none"
                >
                  Accept Preferences
                </button>
              </div>
            </form>
            <button
              onClick={() => setShowCustomize(false)}
              className="absolute top-2 right-2 text-gray-600 hover:cursor-pointer hover:text-gray-800 focus:outline-none"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};
