import type { ReactNode } from "react";

/** Decorative grey app skeleton; the ad slot sits at the exact vertical centre. */
export function WireframeBackground({ children }: { children: ReactNode }) {
  return (
    <div className="wf-page">
      <div className="wf-column">
        <div className="wf-top" aria-hidden="true">
          <div className="wf-bar">
            <div className="wf-burger"><i /><i /><i /></div>
            <div className="wf-bar-pills"><span className="wf-pill wf-dark wf-w-lg" /><span className="wf-pill wf-light wf-w-sm" /></div>
          </div>
          <div className="wf-search" />
        </div>
        <div className="wf-slot">{children}</div>
        <div className="wf-bottom" aria-hidden="true">
          <div className="wf-row">
            <div className="wf-thumb"><span className="wf-badge" /></div>
            <div className="wf-lines"><span style={{ width: "100%" }} /><span style={{ width: "78%" }} /><span style={{ width: "60%" }} /></div>
          </div>
          <div className="wf-chips"><span className="wf-dark" /><span /><span /><span /></div>
          <div className="wf-row wf-center">
            <span className="wf-avatar" />
            <div className="wf-lines"><span style={{ width: "90%" }} /><span style={{ width: "45%" }} /></div>
          </div>
          <div className="wf-input"><b>+</b><span /></div>
          <div className="wf-cards">{[0, 1, 2].map((i) => <div key={i}><span className="wf-img" /><span style={{ width: "85%" }} /><span style={{ width: "55%" }} /></div>)}</div>
          <div className="wf-tall" />
        </div>
      </div>
    </div>
  );
}
