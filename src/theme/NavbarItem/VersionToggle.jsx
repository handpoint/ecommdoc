import React from 'react';

export default function VersionToggle() {
  return (
    <div className="navbar-version-toggle" aria-label="Documentation version">
      <span
        className="navbar-version-toggle__option navbar-version-toggle__option--active"
        title="You are viewing the legacy eCommerce developer portal"
      >
        Legacy
      </span>
      {/* Full-page navigation to the new consolidated developer portal */}
      <a
        href="https://developer.handpoint.com/acquirers/smartboard"
        className="navbar-version-toggle__option"
        title="Open new developer portal"
      >
        New
      </a>
    </div>
  );
}
